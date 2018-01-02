var runtime = require('art-template/lib/runtime')

class Filter {
  constructor (res) {
    runtime.var = 'var'
    this.res = res
    this.initFilter()
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
      'calanderDesc'
    ]
    for (let rule of rules) {
      if (this[rule]) {
        runtime[rule] = this[rule]
      }
    }
  }
  tmlFormatDesc () {
    return 'formart'
  }
  calanderDesc (status = 1) {
    var statusDesc = ['已结束', '比赛中', '未开始']
    return statusDesc[status]
  }
  calanderStatus (status = 1) {
    var statusClass = ['end', 'gaming', 'unstart']
    return statusClass[status]
  }
}

module.exports = Filter
