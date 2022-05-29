const { opendirSync, accessSync, constants } = require('fs');
const path = require('path'); // 路径模块
const moment = require('moment');
const { mkdirSync } = require('fs');
const { writeFileSync } = require('fs');
const docsRoot = path.join(__dirname, '..', 'docs'); // docs文件路径
const catalogueName = '00.目录页'

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

/**
 * 实现方法：
 * 1.   获取yaml头部

/**
 * 生成导航栏
 *  1. 读取00.目录页， 文件夹名作为text，文件名作为items，读取文件获取Link
 *  2. 读取FileMap对象，如果没有第三级目录 
 *      1. 用第二级目录名查找导航栏对象text，若有，push。若无，新建。
 *      2. 父级文件夹名作为text ，文件名作为items，读取文件获取link。 
 */

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

    getListWithDepth = (depth) => {
        let list = []

        /**
         * 
         * @param {*} dictionary Map字典 
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
        // this.name = 'Catalogue'
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
            const list = fileMap.getListWithDepth(3)

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

    getNavConfig() {

    }
}

const nav = new Nav(docsRoot, catalogueName)
// nav.generateCatalogueFile()
