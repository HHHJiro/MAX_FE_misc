require('staticDir/pubg/pubg_cooperation/app.scss')


var App = require('./app')
var fly = require('flyio')

// 通过matchId 判断是哪场比赛
// /live_stats/json/pubg_match.json
// http://192.168.1.153:18080/page/pubg_match.json?id=1
// https://heybox.tt.maxjia.com/game/pubg_league/data/?league_id=1
// 缓存文件 //dotamax.net/static/pubg_league_5.json
// 线上 api.xiaoheihe.cn/game/pubg_league/data/?league_id=5
var pubgDataUrl = PRODUCTION ? '/live_stats/json/pubg_match.json' : 'http://192.168.1.153:18080/page/pubg_match.json'
var scoreRankDataUrl = PRODUCTION ? '//dotamax.net/static/pubg_league_5.json?league_id=5' : 'https://heybox.tt.maxjia.com/game/pubg_league/data/?league_id=3'
if (typeof document === 'object') {
  window.onload = function () {
    var time = new Date().getTime()
    // $.get( pubgDataUrl + '?' + time, function (res) {
      $.get(scoreRankDataUrl + '&time=' + time, function (data) {
        var res = data.result
        var app = new App(res)
      })
    // })
  }
}
