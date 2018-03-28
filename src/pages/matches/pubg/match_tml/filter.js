var runtime = require('art-template/lib/runtime')

class Filter {
  constructor (res) {
    runtime.var = 'var'
    this.res = res
    this.initFilter()
    runtime.team = res.team
  }
  initFilter () {
    this.tmlHandler()
  }
  tmlHandler () {
    // tml 的this 指的是runtime
    this.FormatHandler()
  }
  FormatHandler () {
    var rules = [
      'calanderStatus',
      'calanderDesc',
      'avgKill',
      'dataDefault',
      'teamImg'
    ]
    for (let rule of rules) {
      if (this[rule]) {
        runtime[rule] = this[rule]
      }
    }
  }
  teamImg (teamName) {
    var img = runtime.team[teamName].team_image_url
    if(img) {
      return runtime.team[teamName].team_image_url
    } else {
      return ''
    }
  }
  tmlFormatDesc () {
    return 'formart'
  }
  calanderDesc (status = 2) {
    var statusDesc = ['已结束', '比赛中', '未开始']
    return statusDesc[status]
  }
  calanderStatus (status = 2) {
    var statusClass = ['end', 'gaming', 'unstart']
    return statusClass[status]
  }
  avgKill (kill) {
    return Number(kill).toFixed(2)
  }
  dataDefault (data) {
    if (data === '' || typeof data == 'undefined') {
      return '-'
    }
    return data
  }
}

module.exports = Filter