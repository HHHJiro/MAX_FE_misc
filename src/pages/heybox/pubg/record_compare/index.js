require('../../../../static/pubg/record_compare/app.scss')
var fly = require('flyio')
var App = require('./app')
var {getRecords, getQueryString} = require('./utils')

if (typeof document === 'object') {
  window.onload = function () {
    var nickname = window.nickname
    var season = window.season
    var bind_nickname = window.bind_nickname
    var myInfo = {nickname: bind_nickname, season: season}
    
    var otherInfo = {nickname: nickname, season: season}
    fly.all([fly.get(getRecords(myInfo)), fly.get(getRecords(otherInfo))])
      .then(fly.spread(function (myRecordsResult, otherRecordsResult) {
        // 两个请求都完成
        var {data: {result: myRecordsData}} = myRecordsResult
        var {data: {result: otherRecordsData}} = otherRecordsResult

        var app = new App(myRecordsData, otherRecordsData)
        app.initApp()
      })).catch( e => {
        dataGetErrorHandler(e)
      })
  }
}
var dataGetErrorHandler = (e) => {
  console.log(e)
  $('.loading').hide()
  $('.tip').attr('data-msg', '没有数据或错误，请重新选择赛季查看').show()
}
