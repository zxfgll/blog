/**
 * 生成百度链接推送文件
 */
const fs = require('fs');
const matter = require('gray-matter'); // FrontMatter解析器 https://github.com/jonschlinkert/gray-matter
const axios = require('axios')
const readFileList = require('./modules/readFileList');
const DOMAIN = 'http://www.linyuchen.cloud'
const url = 'https://ssl.bing.com/webmaster/api.svc/json/SubmitUrlbatch?apikey=12bbeec408df472b94427b4903162b80'

let reqData = {
    siteUrl: 'http://www.linyuchen.cloud',
    urlList: []
}

main();

/**
 * 主体函数
 */
function main() {
    const files = readFileList(); // 读取所有md文件数据

    for(let i = 0 ; i < files.length && i < 100 ; i ++){
        const { data } = matter(fs.readFileSync(files[i].filePath, 'utf8'));

        if (data.permalink) {
            const link = `\r\n${DOMAIN}${data.permalink}`;
            // console.log(link)
            reqData.urlList.push(link)
        }
    }

}

axios.post(encodeURI(url), reqData)
    .catch(e => console.log(e))
