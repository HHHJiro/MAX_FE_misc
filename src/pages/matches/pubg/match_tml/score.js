var {bindElemet} = require('./utils')
var Eles = {
  $teamBox: '.team__box'
}

class ScoreHandler {
  constructor (data) {
    bindElemet.call(this, Eles)
    this.data = data
    this.init()
  }
  init () {
    console.log(this.data)
    this.teamClickHandler()
  }
  teamClickHandler () {
    console.log('123')
  }
}
module.exports = ScoreHandler
