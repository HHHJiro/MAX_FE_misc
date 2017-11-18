
var utils = require('../../../../vender/utils')
require('../../../../static/pubg/excellent_time/app.scss')
var runtime = require('art-template/lib/runtime')
var render = require('./content.art')
function downLoadApp () {
  window.location.href = 'http://xiaoheihe.cn/'
}
if (typeof document === 'object') {
  window.onload = function () {
    var heybox_id = utils.getQueryString('heybox_id')
    var id = utils.getQueryString('id')
    if (!heybox_id || !id) {
      downLoadApp()
    }
    $.get('/pc/media/share/data/', {heybox_id: heybox_id, id: id}, function (res) {
      var data = res.result
      if (!data) {
        downLoadApp()
      }
      $('#app').html(render(data))
      app.btnHandler()
    })
  }
}

var app = {
  btnHandler: function () {
    var btns = $('.btn')
    btns.on('click', function () {
      $(this).addClass('active').siblings().removeClass('active')
      var index = btns.index($(this))
      var uls = $('.tab-content ul')
      uls.addClass('hide').eq(index).removeClass('hide')
    })
  }
}

runtime.timeHandler = function (time) {
  time = ~~time
  return utils.formartDate(time, 3)
}

module.exports = render

