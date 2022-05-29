const { opendirSync, accessSync, constants, mkdirSync, writeFileSync, readFileSync } = require('fs');
const path = require('path'); // 路径模块
const moment = require('moment');
const matter = require('gray-matter'); // front matter解析器 https://github.com/jonschlinkert/gray-matter
const docsRoot = path.join(__dirname, '..', 'docs'); // docs文件路径
const catalogueName = '00.目录页'

function resolveMatter(path) {
    let dataStr = readFileSync(path, 'utf8');// 读取每个md文件的内容
    const fileMatterObj = matter(dataStr) // 解析md文件的front Matter。 fileMatterObj => {content:'剔除frontmatter后的文件内容字符串', data:{<frontmatter对象>}, ...}
    let matterData = fileMatterObj.data; // 得到md文件的front Matter
    return matterData
}

class File {
    /**
     * 
     * @param {*} dirent 文件实体 
     * @param {*} parent 父文件夹Map字典
     */
    constructor(dirent, parent) {
        this.name = dirent.name
        this.entity = dirent
        this.parent = parent ? parent.get('root') : null
        this.depth = parent ? parent.get('root').depth + 1 : 0

        // this.path = path.join(parent.path ? parent.path : docsRoot , this.name)
    }
}

class Directory {
    /**
     * 
     * @param {*} dir 文件夹实体 
     * @param {*} _Map 文件夹Map字典
     * @param {*} parent 父文件夹Map字典
     */
    constructor(dir, _Map, parent) {
        this.name = path.basename(dir.path)
        this.path = dir.path
        this.entity = dir
        this._Map = _Map
        this.parent = parent ? parent.get('root') : null
        this.depth = parent ? parent.get('root').depth + 1 : 0
    }
}

class FileMap {
    constructor(docsRoot) {
        const root = opendirSync(docsRoot)
        this.dictionary = new Map()
        const directory = new Directory(root, this.dictionary, null)

        this.dictionary.set('root', directory) // root保存着当前文件夹的信息
    }

    /**
     * 
     * @param {*} dir 父文件夹实体 
     * @param {*} _Map 父文件夹Map字典
     */
    readFileList = async (dir = this.dictionary.get('root').entity, _Map = this.dictionary) => {
        for await (const dirent of dir) {
            if (dirent.isDirectory()) {
                const dictory_path = path.join(dir.path, dirent.name)

                const root = opendirSync(dictory_path) // 子文件夹的实体
                const dictionary = new Map() // 子文件夹的map
                const directory = new Directory(root, dictionary, _Map) // 子文件夹的类
                dictionary.set('root', directory)

                _Map.set(dirent.name, dictionary) // 子文件夹信息的key值为文件名，类型为 Directory

                this.readFileList(root, dictionary)
            } else {
                const file = new File(dirent, _Map)
                _Map.set(dirent.name, file) // 子文件信息的key值为文件名，类型为File
            }
        }
    }

    getFileList = () => {
        let list = []
        const reg = /.+(?=.md)/

        const search = (dictionary = this.dictionary) => {
            if (dictionary.constructor === File) {
                if (!reg.test(dictionary.name)) return
                if (dictionary.parent.path.indexOf(catalogueName) !== -1) return
                list.push(dictionary)
            } else {
                for (let [key, value] of dictionary) {
                    if (key !== 'root') {
                        search(value)
                    }
                }
            }

        }

        search()

        return list
    }

    getDirListWithDepth = depth => {
        let list = []

        /**
         * @param {Map} dictionary 
         */
        const search = (dictionary = this.dictionary) => {
            if (dictionary.constructor === File) return
            for (let [key, value] of dictionary) {
                if (key === 'root') {
                    if (value.depth === depth) {
                        list.push(value)
                    }
                } else {
                    search(value)
                }
            }
        }

        search()

        return list
    }
}

class NavItem {
    constructor(path, fileName) {
        this.key = path
        this.description = fileName
        this.permalink = `/${fileName}/`
        this.title = fileName
        this.date = moment().format('YYYY-MM-DD HH:mm:ss')
    }
}

class Nav {
    constructor(rootPath, catalogueName) {
        this.rootPath = rootPath
        this.cataloguePath = path.join(rootPath, catalogueName)
    }

    async generateCatalogueFile() {
        const generateCatalogueMap = async () => {
            const fileMap = new FileMap(this.rootPath)
            await fileMap.readFileList()
            const list = fileMap.getDirListWithDepth(3)

            const dir = new Map()

            for (const item of list) {
                const reg = /\d+\.(.+)/
                const parentName = item.parent.name
                const fileName = item.name
                const filePath = item.path
                let dirPureName, filePureName, fileRelativePath

                if (!reg.test(parentName)) continue
                if (!reg.test(fileName)) continue

                dirPureName = reg.exec(parentName)[1]
                filePureName = reg.exec(fileName)[1]
                fileRelativePath = path.relative(this.rootPath, filePath)

                const navItem = new NavItem(fileRelativePath, filePureName)

                if (!dir.get(dirPureName)) {
                    dir.set(dirPureName, [navItem])
                } else {
                    dir.get(dirPureName).push(navItem)
                }
            }
            return dir
        }

        const fileExist = (path) => {
            try {
                accessSync(path, constants.F_OK);
            } catch (err) {
                return false
            }
            return true
        }

        const generateFile = (catalogueMap) => {
            for (const [dirname, files] of catalogueMap) {
                const dirPath = path.join(this.cataloguePath, dirname)
                if (fileExist(dirPath)) continue

                mkdirSync(dirPath)

                for (const file of files) {
                    const filePath = path.join(dirPath, `${file.title}.md`)

                    if (fileExist(filePath)) continue
                    const content = `---\npageComponent:\n\tname: Catalogue\n\tdata:\n\t\tkey:${file.key}\n\t\tdescription:${file.description}\ndate : ${file.date}\ntitle: ${file.title}\npermalink: ${file.permalink}\n---`
                    writeFileSync(filePath, content)
                }
            }
        }

        const catalogueMap = await generateCatalogueMap()
        generateFile(catalogueMap)
    }

    async getNavConfig() {
        const root = opendirSync(this.cataloguePath)
        let list = [
            { text: '首页', link: '/' },
        ]

        const mapCatelogueDir = async () => {
            for await (const dirent of root) {
                if (!dirent.isDirectory()) continue
                const direntPath = path.join(root.path, dirent.name)
                const config = {
                    text: dirent.name,
                    items: []
                }

                const fileRoot = opendirSync(direntPath)

                for await (const file of fileRoot) {
                    const reg = /.+(?=.md)/
                    config.items.push({
                        text: file.name,
                        link: `/${reg.exec(file.name)[0]}/`
                    })
                }
                list.push(config)
            }
        }

        const mapIndividualFile = async () => {
            const fileMap = new FileMap(this.rootPath)
            await fileMap.readFileList()
            const files = fileMap.getFileList()
            const dirMap = new Map()

            for (const file of files) {
                const reg = /\d+\.(.+)/
                const parentName = file.parent.name
                const fileName = file.name

                const filePath = path.join(file.parent.path, fileName)
                let dirPureName, filePureName

                if (!reg.test(parentName)) continue
                if (!reg.test(fileName)) continue

                dirPureName = reg.exec(parentName)[1]
                filePureName = reg.exec(fileName)[1]

                const mdData = resolveMatter(filePath)

                if (!dirMap.get(dirPureName)) {
                    dirMap.set(dirPureName, [{ text: filePureName, link: mdData.permalink }])
                } else {
                    dirMap.get(dirPureName).push({ text: filePureName, link: mdData.permalink })
                }
            }


            for(const [key , value] of dirMap){
                list.push({
                    text : key,
                    items : value
                })
            }
        }

        await mapCatelogueDir()
        await mapIndividualFile()

        return list
    }
}


const nav = new Nav(docsRoot, catalogueName)
nav.getNavConfig()




