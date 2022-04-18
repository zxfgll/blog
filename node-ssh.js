// const { NodeSSH } = require('node-ssh')
const { Client } = require('ssh2');

const username = 'ubuntu'
const host = '101.35.18.131'
const password = 'abc13507559595'


const connection = new Client();

connection.on('ready', function(){
    console.log("Connected!");
}).on('error', function(err){
    console.error(err);
}).on('keyboard-interactive', function (name, descr, lang, prompts, finish) {
    // For illustration purposes only! It's not safe to do this!
    // You can read it from process.stdin or whatever else...
    return finish([password]);

    // And remember, server may trigger this event multiple times
    // and for different purposes (not only auth)
}).connect({
    host,
    port: 22,
    username,
    tryKeyboard: true
})