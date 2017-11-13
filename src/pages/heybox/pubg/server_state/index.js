const render = require('./content.art')
var timeHandler = require('./data.js')
var runtime = require('art-template/lib/runtime')
require('../../../../static/pubg/sever_state/app.scss')

runtime.stateFormat = function (state) {
  var serverState = {
    1: '正常',
    2: '滞后',
    3: '不可用',
    4: '异常'
  }
  return serverState[state]
}
runtime.stateDataFormat = function (state) {
  var serverState = {
    1: '正常',
    0: '暂停'
  }
  return serverState[state]
}
runtime.classFormat = function (state) {
  var serverState = {
    1: 'normal',
    2: 'delay',
    3: 'wrong',
    4: 'unusual'
  }
  return serverState[state]
}
runtime.stateDataClassFormat = function (state) {
  var classList = {
    0: 'stop',
    1: ''
  }
  return classList[state]
}
var server = [
  {
    name: '亚洲',
    ip: '//dynamodb.cn-north-1.amazonaws.com.cn/'
  },
  {
    name: '澳洲',
    ip: '//dynamodb.ap-southeast-2.amazonaws.com/'
  },
  {
    name: '南美',
    ip: '//dynamodb.sa-east-1.amazonaws.com/'
  },
  {
    name: '欧洲',
    ip: '//dynamodb.eu-west-1.amazonaws.com/'
  },
  {
    name: '北美',
    ip: '//dynamodb.us-east-1.amazonaws.com/'
  },
  {
    name: '东南亚',
    ip: '//dynamodb.ap-south-1.amazonaws.com/'
  },
  {
    name: '日韩',
    ip: '//dynamodb.ap-northeast-1.amazonaws.com/'
  }
]
var fly = require('flyio')
// 通过用户id获取信息,参数直接写在url中
if (typeof document === 'object') {
  window.onload = function () {
    fly.get('/game/pubg/server/stats/')
      .then(function (response) {
        var data = response.data.result
        var state = data.data_stats
        var states = data.server_stats
        var stateHour = timeHandler(states)
        var mainState = data.server_stats[0].state
        var restLen = []
        restLen.length = 24 - stateHour.length
        var renderData = {
          stateHour: stateHour,
          mainState: mainState,
          dataState: state,
          restLen: restLen,
          servers: server
        }
        const html = render(renderData)
        
        if (typeof document === 'object') {
          document.getElementById('app').innerHTML = html
          timeBoxHandler()
          pingSet(server)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}

var pingMs = function (ip, index) {
  
  var img = new Image()
  var start = new Date().getTime()
  img.src = `http://${ip}/?pingms=${start}`
  var timeOut = setTimeout(function () {
    img.onerror = null
    var pingClass = colorClassHandler(999)
    $('.tab-body li.ping').eq(index).text(999).addClass(pingClass)
  }, 999)
  img.onerror = function () {
    var end = new Date().getTime()
    clearTimeout(timeOut)
    var ms = end - start
    if (typeof document === 'object') {
      var pingClass = colorClassHandler(ms)
      $('.tab-body li.ping').eq(index).text(ms).addClass(pingClass)
    } 
  }
  var colorClassHandler = function (ms) {
    if (ms > 0 && ms <= 100) {
      return 'normal'
    } else if (ms > 100 && ms <= 250) {
      return 'delay'
    } else if (ms > 250 && ms <= 350) {
      return 'unusual'
    } else {
      return 'wrong'
    }
  }
}

var pingSet = function (server) {
  var flag = 0
  for (let {name, ip} of server) {
    pingMs(ip, flag++)
  }
}

var timeBoxHandler = function () {
  $('.tab-body').tap(function () {
    var timeBox = $(this).next('.state-time-box')
    if (timeBox.data('animate') && timeBox.data('animate') === 'animate') {
      return false
    }
    var $arrow = $(this).find('.arrow')
    timeBox.data('animate', 'animate')
    timeBox.fadeToggle(500, function () {
      $arrow.toggleClass('open')
      timeBox.data('animate', 'notAnimate')
    })
  })
}
module.exports = render