require('../../../../static/pubg/excellent_time/app.scss')
var render = require('./content.art')

if (typeof document === 'object') {
  window.onload = function () {
    $.get('/tools/games/media/?heybox_id=105053', function (data) {
      
    })
    $('#app').html(render())
    app.btnHandler()
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

module.exports = render
