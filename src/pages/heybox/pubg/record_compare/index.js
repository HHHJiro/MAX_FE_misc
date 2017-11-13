require('../../../../static/pubg/record_compare/app.scss')
var fly = require('flyio')
var App = require('./app')
var {getRecords, getQueryString} = require('./utils')

if (typeof document === 'object') {
  window.onload = function () {
    var bind_nickname = getQueryString('bind_nickname')
    var myInfo = {nickname: bind_nickname}
    var nickname = getQueryString('nickname')
    var otherInfo = {nickname: nickname}
    fly.all([fly.get(getRecords(myInfo)), fly.get(getRecords(otherInfo))])
      .then(fly.spread(function (myRecordsResult, otherRecordsResult) {
        // 两个请求都完成
        var {data: {result: myRecordsData}} = myRecordsResult
        var {data: {result: otherRecordsData}} = otherRecordsResult

        var app = new App(myRecordsData, otherRecordsData)
        app.initApp()
      }))
  }
}
