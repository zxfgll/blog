const essay = require('./essay')
const react = require('./React')
const vue = require('./Vue')
const tools = require('./tools')
const webpack = require('./webpack')

module.exports = [
    {text : '首页' , link : '/'},
    react,
    vue,
    webpack,
    tools,
    essay
]