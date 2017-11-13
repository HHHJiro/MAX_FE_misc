var runtime = require('art-template/lib/runtime')

class Filter {
  constructor (myRecord, otherRecord) {
    // 挂载一些runtime需要的数据
    // runtime.weight = myRecord.desc
    this.myData = myRecord
    this.otherData = otherRecord
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
      'tmlFormatDesc',
      'tmlFormatNumber',
      'tmlFormatFloat',
      'tmlFormatCompare',
      'tmlFormatServer'
    ]
    for (let rule of rules) {
      if (this[rule]) {
        runtime[rule] = this[rule]
      }
    }
  }
  tmlFormatDesc (arr) {
    return 'fliter!'
  }
  tmlFormatNumber (val) {
    return ~~val
  }
  tmlFormatFloat (val) {
    return (val - 0).toFixed(1)
  }
  tmlFormatCompare (v1, v2, index) {
    var val1 = v1 - 0
    var val2 = v2 - 0
    if (val1 - val2 > 0) {
      if (index === 0) {
        return 'win'
      }
    } else {
      if (index !== 0) {
        return 'win'
      }
    }
  }
  tmlFormatServer (server) {
    var serverTrans = {
      'as': '亚洲',
      'oc': '澳洲',
      'sa': '南美',
      'eu': '欧洲',
      'na': '北美',
      'sea': '东南亚',
      'krjp': '日韩'
    }
    return serverTrans[server]
  }
}

module.exports = Filter
