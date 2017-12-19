
var fly = require('flyio')
var render = require('./content.art')
var utils = require('vendorDir/utils.js')
var renderMore = require('./live_list.art')
var protocol = require('vendorDir/heybox_protocol.js')
class App {
  constructor () {
    this.liveUrl = '/activity/live_list/data/?'
    this.loadTime = 1
    this.limit = 30
    this.load = true
    this.live_type = ''
    this.config = this.getUrlQuery()
    this.init()
    console.log('hello')
  }
  async init (type) {
    await this.firstLoad(type)
    this.$liveList = $('.live-list')
    this.filterHandler()
    this.scrollHandler()
    this.activeFilter()
    this.linkToLiveHome()
    $('.loading').fadeOut(600)
  }
  linkToLiveHome () {
    $('.j-live-url').on('click', function () {
      var info = {}
      var ethis = $(this)
      info.title = ethis.data('title')
      info.url = ethis.data('link')
      window.location.href = protocol.openNewWindow(info)
    })
  }
  getUrlQuery () {
    return {
      game_type: utils.getQueryString('game_type') || 'pubg'
    }
  }
  firstLoad (live_type = '') {
    return fly.get(this.liveUrl, {game_type: this.config.game_type, limit: 30, offset: 0,live_type: live_type})
      .then(res => {
        var data = res.data.result
        console.log(data)
        $('#app').html(render(data))
      })
  }
  resetConfig () {
    this.loadTime = 1
    this.load = true
  }
  filterHandler () {
    var self = this
    $('.filter li').on('click', function () {
      var ethis = $(this)
      if (ethis.hasClass('active')) {
        return false
      }
      ethis.addClass('active').siblings().removeClass('active')
      var type = ethis.data('type')
      self.live_type = type
      self.resetConfig()
      self.init(type)
      $('.loading').show()
    })
  }
  activeFilter () {
    var type = this.live_type
    $('.filter li').each(function () {
      var ethis = $(this)
      if (ethis.data('type') === type) {
        ethis.addClass('active').siblings().removeClass('active')
      }
    })
  }
  loadMore (data) {
    this.$liveList.append(renderMore(data))
    this.loadTime++
    if (data.video_list.length > 0) {
      this.load = true
    } else {
      this.load = false
    }
  }
  async scrollHandler () {
    var isBottom = false
    var self = this
    $(window).scroll(function () {
      if (self.load) {
        if ($(document).height() - $(this).scrollTop() - $(this).height() < 200) {
          isBottom = true 
          self.load = false
          var params = {
            game_type: self.config.game_type,
            limit: self.limit,
            offset: self.loadTime * self.limit,
            live_type: self.live_type
          }
          self.loadData(params)
            .then(res => {
              var data = res.data.result
              self.loadMore(data)
            })
        } else {
          isBottom = false
        }
      }
    })
  }
  loadData (params) {
    this.load = false
    return fly.get(this.liveUrl, {game_type: params.game_type, limit: params.limit, offset: params.offset, live_type: params.live_type})
  }
}

module.exports = App
