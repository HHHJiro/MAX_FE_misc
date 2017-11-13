var runtime = require('art-template/lib/runtime')
const render = require('./filter_content.art')
var {app, animate} = require('./app')
var utils = require('../../../../vender/utils')
var fly = require('flyio')
var app = function () {
  this.init()
}
app.prototype = {
  construct: app,
  init: function () {
    this.tmlHandler()
  },
  tmlHandler: function () {
    this.FormatHandler()
  },
  tmlFormatValue: function (val, type) {
    if (type == 'WinRatio') {
      return (val - 0).toFixed(2) + '%'
    } else if (type == 'AvgKills' || type == 'AvgDamageDealt') {
      return (val - 0).toFixed(1)
    } else {
      return ~~(val - 0)
    }
  },
  tmlFormatColor: function (start, end) {
    return `background:linear-gradient(to bottom, ${start} 0%, ${end} 100%)`
  },
  tmlFormatScore: function (score) {
    return `width:${37.5 * score / 100 }vw`
  },
  FormatHandler: function () {
    var rules = [
      'tmlFormatValue',
      'tmlFormatColor',
      'tmlFormatScore'
    ]
    for (let rule of rules) {
      if (this[rule]) {
        runtime[rule] = this[rule]
      }
    }
  }
}

var animate = function (data) {
  this.typeData = {
    Rating: data
  }
  this.isAnimate = false
  this.init()
}
animate.Eles = {
  $fliterType: '.tab-title li.fliter-type p',
  $filterBox: 'div.filter-box',
  $loading: 'div.loading'
}
animate.prototype = {
  constructor: animate,
  init: function () {
    this.bindElemet()
    this.underLineHandler()
    this.firstContent()
  },
  firstContent: function () {
    this.renderHTML(this.typeData.Rating, 'Rating', 'Rating')
  },
  bindElemet: function () {
    var eles = animate.Eles
    for (var name in eles) {
      if (eles.hasOwnProperty(name)) {
        this[name] = $(eles[name])
      }
    }
  },
  underLineHandler: function () {
    var self = this
    $('.rank-select li').tap(function () {
      var $thisEle = $(this)
      var type = $thisEle.data('type')
      $thisEle.addClass('active').siblings().removeClass('active')
      var left = $thisEle.offset().left
      var width = $thisEle.width()
      var desc = $thisEle.data('desc')
      $('li.under-line').css('left', left + 'px').css('width', width + 'px')
      // 没有数据去请求数据
      if (!self.typeData[type]) {
        self.getData(type).then(res => {
          self.typeData[type] = res.data.result
          return self.typeData[type]
        })
        .then(res => {
          self.renderHTML(res, desc, type)
        })
      } else {
        // 有数据直接进行展示
        self.renderHTML(self.typeData[type], desc, type)
      }
    })
  },
  // 拿数据
  getData: async function (type, desc) {
    var groupId = utils.getQueryString('group_id')
    var heyboxId = utils.getQueryString('heybox_id')
    var self = this
    var baseUrl = '/chat/group/user_ranking_data/?group_id=' + groupId + '&heybox_id=' + heyboxId
    return fly.get(baseUrl + '&filter=' + type)
  },
  renderHTML: function (data, desc, type) {
    var self = this
    this.$fliterType.text(desc)
    data.filterType = type
    // 渲染html
    var html = render(data)
    // 页面中是否有相应type 的表 没有append进页面
    let hasTypeHTML = Boolean(this.$filterBox.find('div[data-flitertype=' + type + ']').length)
    if (hasTypeHTML) {
      this.fliterBoxHandler(type)
      return 
    } else {
      // 动画在进行， 不能添加filter表
      if (this.isAnimate) {
        return 
      } else {
        this.$filterBox.children('.filter-type').hide()
        this.isAnimate = true
        this.$loading.fadeIn(300, function () {
          self.$loading.fadeOut(300, function () {
            self.$filterBox.append(html)
            self.fliterBoxHandler(type)
            self.isAnimate = false
          })
        })
      }
    }
  },
  // 显示相应filter表
  fliterBoxHandler: function (type) {
    var self = this
    let thisEle = self.$filterBox.find('div[data-flitertype=' + type + ']')
    thisEle.siblings().hide()
    thisEle.show()
  }
}

exports.app = app
exports.animate = animate
