var {bindElemet} = require('./utils')
const {teamOpenHandler} = require('./utils')
var randerScoreTeam = require('./score_team.art')
var randerScoreMatch = require('./score_match.art')
var randerScoreSeries = require('./score_series.art')

var Eles = {
  $team: '#team',
  $match: '#match',
  $series: '#series',
  $stage: '#stage'
}

class ScoreHandler {
  constructor (data) {
    bindElemet.call(this, Eles)
    this.data = data
    this.stageData = this.data.result.stage_list
    this.highlight = this.data.result.highlight
    this.init()
  }
  init () {
    // 渲染数据
    this.scoreSeriesRender()
    this.scoreMatchRender()
    this.scoreTeamRender()

    // 层级选择控制
    this.levelFilterClickHandler()
    // 展开收起队伍
    this.teamClickHandler()
    // 初始设置高亮
    this.setHighLight()
  }
  teamClickHandler () {
    teamOpenHandler(this.$team)
  }
  scoreTeamRender (dataPath) {
    if (!dataPath) {
      try {
        let data = this.stageData[0].series_list[0].rank_list ||  this.stageData[0].series_list[0].match_list[0] 
        this.$team.html(randerScoreTeam(data))
      } catch (err) {
        console.log(err)
      } finally {
        return 'default'
      }
    } else {
      try {
        dataPath = Object.assign([0, 0, 0], dataPath)
        let data = this.stageData[dataPath[0]].series_list[dataPath[1]].rank_list || this.stageData[dataPath[0]].series_list[dataPath[1]].match_list[[dataPath[2]]]
        // console.log(dataPath)
        // if (typeof data != 'undefined' && dataPath[0] != 2  && data.length  ==  0) {
        //   data = {
        //     is_solo: 0,
        //     rank_list: teamPromotion
        //   }
        // }
        
        if (dataPath[2] === 0 && data) {
          data.isTotal = 1
        }
        this.$team.html(randerScoreTeam(data))
      } catch (err) {
        console.log(err)
        let data = {rnak_list: []}
        this.$team.html(randerScoreTeam(data))
      }
    }
  }
  scoreMatchRender (dataPath) {
    if (!dataPath) {
      try {
        let data = this.stageData[0].series_list[0].match_list
        this.$match.html(randerScoreMatch(data))
      } catch (err) {
        console.log(err)
      } finally {
        return 'default'
      }
    } else {
      try {
        dataPath = Object.assign([0, 0, 0], dataPath)
        let data = this.stageData[dataPath[0]].series_list[dataPath[1]].match_list
        this.$match.html(randerScoreMatch(data))
      } catch (err) {
        console.log(err)
        let data = [{desc: '积分总榜'}]
        this.$match.html(randerScoreMatch(data))
      }
    }
  }
  scoreSeriesRender (dataPath) {
    if (!dataPath) {
      try {
        let data = this.stageData[0].series_list
        this.$series.html(randerScoreSeries(data))
      } catch (err) {
        console.log(err)
      } finally {
        return 'default'
      }
    }
    dataPath = Object.assign([0, 0, 0], dataPath)
    let data = this.stageData[dataPath[0]].series_list
    this.$series.html(randerScoreSeries(data))
  }
  levelFilterClickHandler () {
    var _this = this
    const _clickActiveHandler = ($ele, callback) => {
      $ele.on('click', function (e, childIndex) {
        if (typeof childIndex === 'undefined' && e.target.nodeName == 'DIV') {
          return false
        }
        var dataPath = []
        let $li = $(e.target)
        var index = $li.index()
        if (typeof (childIndex) !== 'undefined') {
          $li = $ele.find('li').eq(childIndex)
        }
        if (childIndex > -1) {
          index = childIndex
        }
        if ($(this).hasClass('match__group')) {
          dataPath = [index]
        } else if ($(this).hasClass('team__group')) {
          dataPath = [_getLevel()[0], index]
        } else {
          dataPath = [_getLevel()[0], _getLevel()[1], index]
        }
        $li.addClass('active').siblings().removeClass('active')
        if (callback) {
          callback(dataPath)
        }
      })
    }
    const _getLevel = () => {
      return [$('#stage li.active').index(), $('#series li.active').index()]
    }

    _clickActiveHandler(this.$stage, (dataPath) => {
      this.scoreSeriesRender(dataPath)
      this.scoreMatchRender(dataPath)
      this.scoreTeamRender(dataPath)

      this.activeSeries()
      this.activeMatch()
    })
    _clickActiveHandler(this.$series, (dataPath) => {
      this.scoreMatchRender(dataPath)
      this.scoreTeamRender(dataPath)

      this.activeMatch()
    })
    _clickActiveHandler(this.$match, (dataPath) => {
      this.scoreTeamRender(dataPath)
    })
  }
  activeSeries () {
    $('#series li').eq(0).addClass('active').siblings().removeClass('active')
  }
  activeMatch () {
    $('#match li').eq(0).addClass('active').siblings().removeClass('active')
  }
  setHighLight () {
    var highlight = {
      stage: this.highlight[0],
      series: this.highlight[1],
      match: this.highlight[2]
    }
    this.activeScoreLevelHandler(highlight)
  }
  activeScoreLevelHandler (highlight = {stage: 0, series: 0, match: 0}) {
    this.$stage.trigger('click', highlight.stage)
    this.$series.trigger('click', highlight.series)
    this.$match.trigger('click', highlight.match)
  }
}
module.exports = ScoreHandler
