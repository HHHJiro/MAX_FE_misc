
require('../../../../static/dota/maxnet/app.scss')
var utils = require('../../../../vender/utils')

var App = require('./app')
var fly = require('flyio')
var hrefHandler = function () {
  var href = window.location.href
  var hrefarr = href.split('')
  if (!(href.indexOf('?') === href.lastIndexOf('?'))) {
    hrefarr.splice(href.lastIndexOf('?'), 1, '&')
    window.location.href = hrefarr.join('')
  }
}
hrefHandler()
var ajaxUrl = PRODUCTION ? '/live_stats/json/' : 'http://192.168.1.153:18080/page/'

if (typeof document === 'object') {
  window.onload = function () {
    // 通过matchId 判断是哪场比赛
    var matchId = utils.getQueryString('match_id')
    var pImgs = fly.get(ajaxUrl + 'team_imgs.json')
    var pmatch = fly.get(ajaxUrl + 'match.' + matchId + '.json')
    
    Promise.all([pImgs, pmatch]).then(([imgRes, matchRes]) => {
      var app = new App(imgRes.data, matchRes.data)
    }).catch(error => {
      console.log(error)
    })
    
  }  
}
