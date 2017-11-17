var Utils = function () {}
Utils.prototype = {
  construct: Utils,
  getQueryString: function (name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
    var r = window.location.search.substr(1).match(reg)
    if (r != null) {
      return unescape(r[2])
    }
    return null
  },
  formartDate: function (t, type) {
    if (!type) {
      type = 1
    }
    // filter type
    // 1 日期带时分秒
    // 2 距离现在过去多久
    // 3 24小时显示内距离现在过去多久,24小时以上显示日期不带时分秒

    var timeSpan = t * 1000
    var dateTime = new Date(parseInt(timeSpan))

    var year = dateTime.getFullYear()
    var month = dateTime.getMonth() + 1
    var day = dateTime.getDate()
    var hour = dateTime.getHours()
    var minute = dateTime.getMinutes()
    var second = dateTime.getSeconds()

    if (type == 1) {
      return year + '-' + month + '-' + day + ' ' + hour + ':' + minute
    } else {
      var now = new Date()
      var now_new = Date.parse(now)

      var ms = now_new - timeSpan
      var timeSpanStr

      if (ms <= 1000 * 60 * 1) {
        timeSpanStr = '刚刚'
      } else if (1000 * 60 * 1 < ms && ms <= 1000 * 60 * 60) {
        timeSpanStr = Math.round((ms / (1000 * 60))) + '分钟前'
      } else if (1000 * 60 * 60 * 1 < ms && ms <= 1000 * 60 * 60 * 24) {
        timeSpanStr = Math.round(ms / (1000 * 60 * 60)) + '小时前'
      } else {
        if (type == 2) {
          if (1000 * 60 * 60 * 24 < ms && ms <= 1000 * 60 * 60 * 24 * 30) {
            timeSpanStr = Math.round(ms / (1000 * 60 * 60 * 24)) + '天前'
          } else if (1000 * 60 * 60 * 24 * 30 < ms && ms <= 1000 * 60 * 60 * 24 * 365) {
            timeSpanStr = Math.round(ms / (1000 * 60 * 60 * 24 * 30)) + '月前'
          } else {
            timeSpanStr = Math.round(ms / (1000 * 60 * 60 * 24 * 365)) + '年前'
          }
        } else if (type == 3) {
          timeSpanStr = year + '-' + month + '-' + day
        }
      }
      return timeSpanStr
    }
  }
}
var utils = new Utils()
module.exports = utils
