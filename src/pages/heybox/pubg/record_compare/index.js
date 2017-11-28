require('../../../../static/pubg/record_compare/app.scss')
var fly = require('flyio')
var App = require('./app')
var {getRecords, getQueryString} = require('./utils')

if (typeof document === 'object') {
  window.onload = function () {
    var href = '/game/pubg/compare/web/'
    var nickname = getQueryString('nickname')
    var heyboxId = getQueryString('heybox_id')
    fly.get(href + '?nickname=' + nickname + ' &heybox_id=' + heyboxId + '&return_json=1')
      .then(res => {
        return res.data.result.bind_nickname
      })
      .then( bind_nickname => {
        var myInfo = {nickname: bind_nickname}
        
        var otherInfo = {nickname: nickname}
        fly.all([fly.get(getRecords(myInfo)), fly.get(getRecords(otherInfo))])
          .then(fly.spread(function (myRecordsResult, otherRecordsResult) {
            // 两个请求都完成
            var {data: {result: myRecordsData}} = myRecordsResult
            var {data: {result: otherRecordsData}} = otherRecordsResult
    
            var app = new App(myRecordsData, otherRecordsData)
            app.initApp()
          }))

      })
  }
}
