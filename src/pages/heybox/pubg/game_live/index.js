require('staticDir/pubg/game_live/app.scss')
require('staticDir/font/icon/iconfont.js')
var render = require('./content.art')


if (typeof document === 'object') {
  window.onload = function  () {
    $('#app').html(render())
  }
}
module.exports = render

