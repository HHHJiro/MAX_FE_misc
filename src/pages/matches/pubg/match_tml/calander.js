
var {bindElemet} = require('./utils')
var Eles = {
  $btnPrev: '.calander__button--prev',
  $btnNext: '.calander__button--next',
  $calanderCard: '.calander__card',
  $viewCardBox: '.view__box'
}
class CalanderHandler {
  constructor (data) {
    bindElemet.call(this, Eles)
    
    this.data = data
    this.CARD_OFFSET = data.cardOffset
    this.isNowCardSet = false
    this.MAX_VISIBLE_CARDS = 5
    this.isAnimation = false
    this.canPrevClick = false
    this.canNextClick = true
    this.cardsQuantity = this.$calanderCard.length
    this.normalClass = 'button--normal'
    this.disableClass = 'button--disable'
    this.cardWidth = 200
    this.nowtranslateX = 0
    this.compute()
    this.init()
  }
  init () {
    this.offsetCardHandler()
    this.calanderButtonHandler()
  }
  compute () {
    this.cardMarginRigth = ~~this.$calanderCard.css('margin-right').replace('px', '')
    this.unitMoveDistance = this.cardMarginRigth + this.cardWidth
    this.MOST_TRANSLATEX = Math.min(-(this.cardsQuantity - this.MAX_VISIBLE_CARDS) * this.unitMoveDistance, 0)
  }
  moveCard (type = 'left', num = 1) {
    let moveDirection = {
      left: 1,
      right: -1
    }
    // console.log(num * this.unitMoveDistance * moveDirection[type])
    let moveDistance = this.nowtranslateX + num * this.unitMoveDistance * moveDirection[type]
    this.nowtranslateX = moveDistance
    let translateXStr = moveDistance + 'px'
    if (!this.isAnimation) {
      this.isAnimation = true
      this.$viewCardBox.animate({translateX: translateXStr}, 'ease-out', () =>{this.isAnimation = false})
    } else {
      console.log('card is moving') 
    }
    let buttonStatus = this.canClickStatusHandler()
    this.setButtonClass(buttonStatus)
  }
  // 设置日立卡的offset
  offsetCardHandler () {
    if (!this.isNowCardSet) {
      this.moveCard('right', this.CARD_OFFSET)
      this.isNowCardSet = true
    }
  }
  // 设置button点击样式
  setButtonClass (status) {
    let normalClass = this.normalClass
    let disableClass = this.disableClass
    if (status.prev) {
      !this.$btnPrev.hasClass(normalClass) && this.$btnPrev.removeCalss(disableClass).addClass(normalClass)
    } else {
      this.$btnPrev.addClass(disableClass)
    }
    if (status.next) {
      !this.$btnNext.hasClass(normalClass) && this.$btnNext.removeCalss(disableClass).addClass(normalClass)
    } else {
      this.$btnNext.addClass(disableClass)
    }
  }
  // prev next => Boolean 判断是否可以滑动
  canClickStatusHandler () {
    if (this.cardsQuantity <= this.MAX_VISIBLE_CARDS) {
      return {
        prev: false,
        next: false
      }
    } else {
      if (this.nowtranslateX === 0) {
        return {
          prev: false,
          next: true
        }
      } else if (this.nowtranslateX !== 0 && this.nowtranslateX > this.MOST_TRANSLATEX) {
        return {
          prev: true,
          next: true
        }
      } else {
        return {
          prev: true,
          next: false
        }
      }
    }
  }
  // type [prev, next]
  calanderButtonHandler (ele, type = 'left') {
    var disableClass = this.disableClass
    var _this = this
    this.$btnPrev.on('click', function () {
      var $this = $(this)
      if ($this.hasClass(disableClass)) {
        return false
      }
      _this.moveCard(type)
    })
    this.$btnNext.on('click', function () {
      var $this = $(this)
      if ($this.hasClass(disableClass)) {
        return false
      }
      _this.moveCard('right')
    })
  }
}

module.exports = CalanderHandler
