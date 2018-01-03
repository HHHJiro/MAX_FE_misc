
var {bindElemet} = require('./utils')
var Eles = {
  $btnPrev: '.calander__button--prev',
  $btnNext: '.calander__button--next',
  $calanderCard: '.calander__card'
}
class CalanderHandler {
  constructor (data) {
    this.init()
    this.data = data
    this.NOW_CARD = data.nowCard
    this.MAX_VISIBLE_CARDS = 5
    this.isAnimation = false
    this.canPrevClick = false
    this.canNextClick = true
    this.cardsQuantity = this.$calanderCard.length
    this.normalClass = 'button--normal'
    this.disableClass = 'button--disable'
    this.cardWidth = this.$calanderCard.width()
    this.cardMarginRigth = this.$calanderCard.css('margin-right').replace('px', '') + 0
    this.moveDistance = this.cardMarginRigth + this.cardWidth
  }
  init () {
    bindElemet.call(this, Eles)
  }
  //
  canClickStatusHandler () {

  }
  // type [prev, next]
  calanderButtonHandler (type) {
    var moveDirection = type === 'prev' ? 'left' : 'right'
    
  }
}

module.exports = CalanderHandler
