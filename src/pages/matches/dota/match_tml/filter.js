var runtime = require('art-template/lib/runtime')

class Filter {
  constructor (imgData, matchData) {
    if (matchData.groupMatch) {
      runtime.weight = matchData.groupMatch.scoreWeight
    }
    runtime.imgs = imgData
    this.imgData = imgData
    this.matchData = matchData
    this.scoreWeight = runtime.weight
    this.nowPlay = matchData.nowPlay
    this.knockoutWinType = matchData.knockoutWinType
    this.knockoutLoseType = matchData.knockoutLoseType
    this.initFilter()
  }
  initFilter () {
    this.tmlHandler()
    this.sortTeamInit()
  }
  tmlHandler () {
    // tml 的this 指的是runtime
    this.FormatHandler()
  }
  FormatHandler () {
    var rules = [
      'tmlFormatDesc',
      'tmlFormatScore',
      'tmlFormatImgSrc'
    ]
    for (let rule of rules) {
      if (this[rule]) {
        runtime[rule] = this[rule]
      }
    }
  }
  tmlFormatDesc (arr) {
    if (arr.length > 2) {
      return `${arr[0]}胜${arr[2]}平${arr[1]}负`
    }
    return `${arr[0]}胜${arr[1]}负`
  }
  tmlFormatImgSrc (teamName) {
    return this.imgs[teamName]
  }
  tmlFormatScore (arr) {
    var weight = this.weight
    return arr.map((v, i) => {return v * weight[i]}).reduce((a, b) => {return a + b })
  }
  sortTeamInit () {
    if (this.matchData.groupMatch) {
      var {groupMatch: {groupA, groupB}} = this.matchData
      if (groupA) {
        this.sortGroup(groupA)
      }
      if (groupB) {
        this.sortGroup(groupB)
      }
    }
  }
  sortGroup (group) {
    var scoreWeight = this.scoreWeight
    return group.sort((tl, tr) => {
      let {score: tlScore} = tl
      let {score: trScore} = tr
      let countl = 0
      let countr = 0
      // 分数相同时候的权值
      let tlW = 0
      let trW = 0
      let eqW = [10000, 0, 1]
      for (let i = 0; i < tlScore.length; i++) {
        countl += tlScore[i] * scoreWeight[i]
        tlW += tlScore[i] * eqW[i]
        countr += trScore[i] * scoreWeight[i]
        trW += trScore[i] * eqW[i]
      }
      if (countr !== countl) {
        return countr - countl
      } else {
        return trW - tlW
      }
    })
  }
}

module.exports = Filter
