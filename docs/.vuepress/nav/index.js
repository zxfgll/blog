const essay = require('./essay')
const react = require('./React')
const vue = require('./Vue')
const tools = require('./tools')
const javaScript = require('./javaScript')
const daily = require('./daily')
const endPoint = require('./end-point')

module.exports = [
    {text : '首页' , link : '/'},
    react,
    vue,
    javaScript,
    endPoint,
    tools,
    essay,
    daily
]
