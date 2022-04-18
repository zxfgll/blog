const { exec } = require('child_process')
const path = require('path')

// exec("node -v", { cwd: __dirname }, (error, stdout, stderr) => {
//     console.log(stdout);
// })

exec("bash deploy.sh",(err)=>{
    if(!err){
        const distPath = path.join(__dirname , "docs/.vuepress/dist")
        const username = 'ubuntu'
        const ip = '101.35.18.131'
        const target = '/var/www/html'
        exec(`scp ${distPath} ${username}@${ip} ` )
    }
})
