require('staticDir/pubg/game_live/app.scss')
require('staticDir/font/icon/iconfont.js')
var App = require('./app')

if (typeof document === 'object') {
  window.onload = function  () {
    var app = new App()
  }
}

