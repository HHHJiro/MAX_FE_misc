require('staticDir/pubg/pubg_cooperation/app.scss')


var App = require('./app')
var fly = require('flyio')

// 通过matchId 判断是哪场比赛
// /live_stats/json/pubg_match.json
// http://192.168.1.153:18080/page/pubg_match.json
if (typeof document === 'object') {
  window.onload = function () {
    var time = new Date().getTime()
    $.get('http://192.168.1.153:18080/page/pubg_match.json?' + time, function (res) {
      // console.log(res)
      var app = new App(res)
    })
  }
}