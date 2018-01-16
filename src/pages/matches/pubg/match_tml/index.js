require('staticDir/pubg/pubg_cooperation/app.scss')

var App = require('./app')
var fly = require('flyio')

// 通过matchId 判断是哪场比赛
// /live_stats/json/pubg_match.json
// //192.168.1.153:18080/page/pubg_match.json
// https://heybox.tt.maxjia.com/game/pubg_league/data/?league_id=3
var pubgDataUrl = PRODUCTION ? '/live_stats/json/pubg_match.json?=3' : '//192.168.1.153:18080/page/pubg_match.json?heybox=1'
var scoreRankDataUrl = PRODUCTION ? '//dotamax.net/static/pubg_league.json?heybox=1' : 'https://heybox.tt.maxjia.com/game/pubg_league/data/?league_id=3'
if (typeof document === 'object') {
  window.onload = function () {
    var time = new Date().getTime()
    $.get(pubgDataUrl + '&time=' + time, function (res) {
      $.get(scoreRankDataUrl + '&time=' + time, function (data) {
        res.result = data.result
        var app = new App(res)
      })
    })
  }
}
