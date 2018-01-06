var {bindElemet} = require('./utils')
const {teamOpenHandler} = require('./utils')

var randerRankList = require('./rank_table.art')
var Eles = {
  $rank: '#rank',
  $filter: '.rank--filter',
  $team: '#rank'
}

class RankHandler {
  constructor (data) {
    bindElemet.call(this, Eles)
    this.data = data.result.rank
    this.init()
  }
  setRankListHTML (data) {
    this.$rank.html(randerRankList(data))
  }
  init () {
    console.log(this.data)
    this.setRankListHTML(this.data[0].list)
    this.filterClickHandler()
    this.teamClickHandler()
  }
  filterClickHandler () {
    var _this = this
    this.$filter.on('click', function (e) {
      let $ele = $(e.target)
      let index = $ele.index()
      $ele.addClass('active').siblings().removeClass('active')
      _this.setRankListHTML(_this.data[index].list)
    })
  }
  teamClickHandler () {
    teamOpenHandler(this.$team)
  }
}

module.exports = RankHandler
