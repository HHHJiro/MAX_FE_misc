require('../../../../static/pubg/record_compare/app.scss')
var fly = require('flyio')
var App = require('./app')
var {getRecords, getQueryString} = require('./utils')

if (typeof document === 'object') {
  window.onload = function () {
    var href = '/game/pubg/compare/web/'
    var nickname = getQueryString('nickname')
    var heyboxId = getQueryString('heybox_id')
    var season = getQueryString('season')
    fly.get(href + '?nickname=' + nickname + ' &heybox_id=' + heyboxId + '&season=' + season + '&return_json=1')
      .then(res => {
        var {season, bind_nickname} = res.data.result
        return {season: season, bind_nickname: bind_nickname}
      })
      .then( data => {
        var myInfo = {nickname: data.bind_nickname, season: data.season}
        
        var otherInfo = {nickname: nickname, season: data.season}
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

      }).catch( e => {
        dataGetErrorHandler(e)
      })
  }
}
var dataGetErrorHandler = (e) => {
  console.log(e)
  $('.loading').hide()
  $('.tip').attr('data-msg', '没有数据或错误，请重新选择赛季查看').show()
}
