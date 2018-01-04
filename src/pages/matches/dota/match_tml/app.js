var Filter = require('./filter')
var renderGroup = require('./match_group.art')
var renderDiyGroup = require('./diy_group.art')
// 模板
// var knockoutWin82 = require('./tml_win_8_2.art')
// var knockoutLose82 = require('./tml_lose_8_2.art')
var knockoutWinTml = require('./tml_win_tml.art')
var knockoutLoseTml = require('./tml_lose_tml.art')
// const knockoutTmls = {
//   knockoutWin82: knockoutWin82,
//   knockoutLose82: knockoutLose82
// }

class app extends Filter {
  constructor (imgData, matchData) {
    super(imgData, matchData)
    this.init()
  }
  init () {
    this.appentMatch()
  }
  groupRenderGet (data) {
    console.log(data)
    if (data.groupMatch) {
      return renderGroup
    } else if (data.diyGroup) {
      return renderDiyGroup
    } else {
      return false
    }
  }
  inBrowserInit () {
    this.$eSelect = $('.select-bar li')
    this.$eImg = $('.img-box img')
    this.handlerTap()
    this.imgLoadHandler()
    this.arrowhandler()
  }
  arrowhandler () {
    if (this.matchData.noArrow) {
      $('.match div').removeClass('arrow-down').removeClass('arrow-up')
    }
  }
  appentMatch () {
    var self = this
    if (typeof document === 'object') {
      if (self.nowPlay == 'k') {
        $('#app').append(knockoutWinTml.call(self, self.matchData))
        console.log(self.matchData)
        // 第二三阶段反转
        if (self.matchData.reverseWinLose) {
          $('.knockout .title').before(knockoutLoseTml.call(self, self.matchData))
        } else {
          $('#knockout-box').append(knockoutLoseTml.call(self, self.matchData))
        }
        // 若没有小组赛 则不去渲染
        if (this.groupRenderGet(self.matchData)) {
          $('#app').append(this.groupRenderGet(self.matchData)(self.matchData))
        }
      } else if (self.nowPlay == 'g') {
        $('#app').append(this.groupRenderGet(self.matchData)(self.matchData))
        $('#app').append(knockoutWinTml.call(self, self.matchData))

        // 第二三阶段反转
        if (self.matchData.reverseWinLose) {
          $('.knockout .title').before(knockoutLoseTml.call(self, self.matchData))
        } else {
          $('#knockout-box').append(knockoutLoseTml.call(self, self.matchData))
        }
      }
      self.inBrowserInit.call(self)
    }
  }
  handlerTap () {
    this.$eSelect.tap(function () {
      var $this = $(this)
      $this.addClass('active').siblings().removeClass('active')
      // $this.closest('.knockout').find('.knockout-match').addClass('hide')
      // $this.closest('.knockout').find('.' + $this.data('select'))
      $('.' + $this.data('select')).removeClass('hide').siblings().addClass('hide')
    })
  }
  imgLoadHandler () {
    for (let i in this.$eImg) {
      let img = this.$eImg.eq(i)
      img.attr('src', img.data('src'))
    }
  }
  knockoutTypeHandler () {
    // 胜者组模板
    var knockoutWinTypes = {
      "8-2": "knockoutWin82",
    }
    // 败者组模板
    var knockoutLoseTypes = {
      "8-2": "knockoutLose82"
    }
    var winType = this.knockoutWinType
    var loseType = this.knockoutLoseType
    return {
      win: knockoutTmls[knockoutWinTypes[winType]],
      lose: knockoutTmls[knockoutLoseTypes[loseType]]
    }
  }
}

module.exports = app
