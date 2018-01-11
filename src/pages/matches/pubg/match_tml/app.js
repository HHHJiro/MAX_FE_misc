import { error } from 'util';

var artBus = require('./bus.art')
var Filter = require('./filter')
var {bindElemet} = require('./utils')
var CalanderHandler = require('./calander')
var ScoreHandler = require('./score')
var RankHandler = require('./rank')

var Eles = {
  $btnPrev: '.calander__button--prev',
  $btnNext: '.calander__button--next',
  $scoreWrap: '.score__wrap',
  $calacderWrap: '.calander__wrap',
  $rankWrap: '.ranking',
  $calanderCard: '.calander__card'
}
class App extends Filter {
  constructor (res) {
    super(res)
    this.init()
  }
  init () {
    this.appentMatch()
    this.inBrowserInit()
    var href = window.location.href
    if (href.indexOf('score') > 0) {
      this.scoreHandler()
      this.$scoreWrap.show()
    }
    if (href.indexOf('calander') > 0) {
      try {
        this.calanderHandler()
      } catch (err) {
        throw new Error(err)
      } finally {
        this.$calacderWrap.show()
      }
    }
    if (href.indexOf('rank') > 0) {
      this.rankHandler()
      this.$rankWrap.show()
    }
  }
  inBrowserInit () {
    bindElemet.call(this, Eles)
  }
  appentMatch () {
    $('#app').append(artBus(this.res))
  }
  calanderHandler () {
    var calanderHandler = new CalanderHandler(this.res.calander)
  }
  scoreHandler () {
    var scoreHandler = new ScoreHandler(this.res)
  }
  rankHandler () {
    var rankHandler = new RankHandler(this.res)
  }
}
module.exports = App
