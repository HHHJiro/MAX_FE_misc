var Filter = require('./filter')
var renderGroup = require('./match_group.art')
// 模板
var renderKnockout82 = require('./match_knockout_8_2.art')
const knockoutTmls = {
  "renderKnockout82": renderKnockout82
}

class app extends Filter {
  constructor (imgData, matchData) {
    super(imgData, matchData)
    this.init()
  }
  init () {
    this.appentMatch()
  }
  inBrowserInit () {
    this.$eSelect = $('.select-bar li')
    this.$eImg = $('.img-box img')
    this.handlerTap()
    this.imgLoadHandler()
  }
  appentMatch () {
    var self = this
    if (typeof document === 'object') {
      window.onload = function () {
        if (self.nowPlay == 'k') {
          $('#app').append(self.knockoutTypeHandler().call(self, self.matchData))
          $('#app').append(renderGroup(self.matchData))
        } else if (self.nowPlay == 'g') {
          $('#app').append(self.knockoutTypeHandler().call(self, self.matchData))
          $('#app').append(renderKnockout82(self.matchData))
        }
        self.inBrowserInit.call(self)
      }
    }
  }
  handlerTap () {
    this.$eSelect.tap(function () {
      $(this).addClass('active').siblings().removeClass('active')
      $('.' + $(this).data('select')).removeClass('hide').siblings().addClass('hide')
    })
  }
  imgLoadHandler () {
    for (let i in this.$eImg) {
      let img = this.$eImg.eq(i)
      img.attr('src', img.data('src'))
    }
  }
  knockoutTypeHandler () {
    var knockoutTypes = {
      "8-2": "renderKnockout82"
    }
    var type = this.knockoutType
    return knockoutTmls[knockoutTypes[type]]
  }
}

module.exports = app
