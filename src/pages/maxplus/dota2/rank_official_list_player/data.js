const render = require('./content.art')
var fly = require('flyio')
var procotol = require('../../../../vender/max_protocol')

if (typeof document === 'object') {
  window.onload = function () {
    var $ = window.$
    fly.get('/api/league/circuit/player/data/')
      .then(function (res) {
        var data = res.data.result
        return data
      }).then(data => {
        var html = render(data)
        if (typeof document === 'object') {
          document.getElementById('app').innerHTML = html
          var app = new App($)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}

class App {
  constructor ($) {
    this.init()
  }
  init () {
    this.handlerClickPlayer()
  }
  handlerClickPlayer () {
    var player = $('.tal-body')
    player.tap(function () {
      var steamId = $(this).data('steamid')
      window.location.href = procotol.openDotaPlayerInfo(steamId)
    })
  }
}
