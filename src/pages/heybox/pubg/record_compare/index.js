require('../../../../static/pubg/record_compare/app.scss')
var fly = require('flyio')
var App = require('./app')
var {getRecords, getQueryString} = require('./utils')

if (typeof document === 'object') {
  window.onload = function () {
    var nickname = window.nickname
    var season = window.season
    var bind_nickname = window.bind_nickname
    fly.get('/game/pubg/compare/web/?heybox_id=105091&version=1.0.2&os_type=iOS&season=2017pre-6&region=as&nickname=PDD7&return_json=1')
      .then( res => {
        var data = res.data.result
        var bind_nickname = data.bind_nickname
        var nickname = data.nickname
        var season = data.season
        getCompare(bind_nickname, nickname, season)
      })
    
    var getCompare = (bind_nickname, nickname, season) => {
      var myInfo = {nickname: bind_nickname, season: season}

      var otherInfo = {nickname: nickname, season: season}
      fly.all([fly.get(getRecords(myInfo)), fly.get(getRecords(otherInfo))])
        .then(fly.spread(function (myRecordsResult, otherRecordsResult) {
          // 两个请求都完成
          var {data: {result: myRecordsData}} = myRecordsResult
          var {data: {result: otherRecordsData}} = otherRecordsResult

          var app = new App(myRecordsData, otherRecordsData)
          app.initApp()
        }))
        .catch( e => {
          dataGetErrorHandler(e)
        })
    }
    // getCompare()
  }
}
var dataGetErrorHandler = (e) => {
  console.log(e)
  $('.loading').hide()
  $('.tip').attr('data-msg', '没有数据或错误，请重新选择赛季查看').show()
}
