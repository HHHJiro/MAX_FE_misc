
require('../../../../static/dota/maxnet/app.scss')
var utils = require('../../../../vender/utils')

var App = require('./app')
var fly = require('flyio')
if (typeof document === 'object') {
  window.onload = function () {
    // 通过matchId 判断是哪场比赛
    var matchId = utils.getQueryString('match_id')
    var pImgs = fly.get('/live_stats/json/team_imgs.json')
    var pmatch = fly.get('/live_stats/json/match.' + matchId + '.json')
    
    Promise.all([pImgs, pmatch]).then(([imgRes, matchRes]) => {
      var app = new App(imgRes.data, matchRes.data)
    }).catch(error => {
      console.log(error)
    })
    
  }  
}
