var artBus = require('./bus.art')
var Filter = require('./filter')

var Eles = {
  $btnPrev: '.calander__button--prev',
  $btnNext: '.calander__button--next',
  $scoreWrap: '.score__wrap',
  $calacderWrap: '.calander__wrap',
  $rankWrap: '.ranking'
}
class App extends Filter {
  constructor (res) {
    super(res)
    this.init()
  }
  init () {
    var _this = this
    // if (typeof document === 'object') {
    //   window.onload = function () {
        _this.appentMatch()
        _this.inBrowserInit()
        var href = window.location.href
        if (href.indexOf('score') > 0) {
          _this.$scoreWrap.show()
        }
        if (href.indexOf('calander') > 0) {
          _this.$calacderWrap.show()
        }
        if (href.indexOf('rank') > 0) {
          _this.$rankWrap.show()
        }
    //   }
    // }
  }
  inBrowserInit () {
    this.bindElemet()
  }
  bindElemet () {
    var eles = Eles
    for (var name in eles) {
      if (eles.hasOwnProperty(name)) {
        this[name] = $(eles[name])
      }
    }
  }
  appentMatch () {
    $('#app').append(artBus(this.res))
  }
}
module.exports = App
