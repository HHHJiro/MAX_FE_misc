
var HeyboxProtocol = function () {
  this.baseStart = 'heybox://'
  this.isNoEncode = this.isNoEncodeVerson()
}
HeyboxProtocol.prototype = {
  constructor: HeyboxProtocol,
  isNoEncodeVerson: function () {
    var href = window.location.href
    if (href.indexOf('os_type=iOS') < 0 && href.indexOf('version=1.1.14') > 0) {
      return true
    } else {
      return false
    }
  },
  openUserPage: function (heyboxId) {
    var PROTOCOL = {
      'protocol_type': 'openUser',
      'user_id': heyboxId.id
    }
    if (this.isNoEncode) {
      return this.baseStart + JSON.stringify(PROTOCOL)
    }
    return this.baseStart + encodeURI(JSON.stringify(PROTOCOL))
  },
  openTopic: function (topic) {
    var PROTOCOL = {
      'protocol_type': 'openTopic',
      'topic_id': topic.id,
      'topic_name': topic.name,
      'app_id': topic.appid
    }
    if (this.isNoEncode) {
      return this.baseStart + JSON.stringify(PROTOCOL)
    }
    return this.baseStart + encodeURI(JSON.stringify(PROTOCOL))
  },
  openImg: function (imgInfo) {
    var imgsUrlsString = null
    if (!imgsUrlsString) {
      var imgsUrls = []
      var eImgs = imgInfo.imgs
      for (var i = 0; i < eImgs.length; i++) {
        imgsUrls.push(eImgs[i].src)
      }
      imgsUrlsString = imgsUrls.join(';')
    }
    return 'maxjia:///showPictureDetail' + '#/' + imgInfo.index + '#/' + imgsUrlsString
  },
  openDialog: function (info) {
    var PROTOCOL = {
      'protocol_type': 'alert', // 协议类型
      'desc': info.desc,
      'alert_type': 'state',
      'state': 'ok' // 状态 'failed' 提示内容为desc
    }
    if (this.isNoEncode) {
      return this.baseStart + JSON.stringify(PROTOCOL)
    }
    return this.baseStart + encodeURI(JSON.stringify(PROTOCOL))

    // return 'heybox://123'
  },
  failDialog: function (desc) {
    var info = desc || '操作失败'
    var PROTOCOL = {
      'protocol_type': 'alert', // 协议类型
      'desc': info,
      'alert_type': 'state',
      'state': 'failed' // 状态 'failed' 提示内容为desc
    }
    if (this.isNoEncode) {
      return this.baseStart + JSON.stringify(PROTOCOL)
    }
    return this.baseStart + encodeURI(JSON.stringify(PROTOCOL))

  },
  syncState: function (info) {
    var PROTOCOL = {
      'protocol_type': 'linkAction',
      'action': info.action,
      'state': info.state
    }
    if (this.isNoEncode) {
      return this.baseStart + JSON.stringify(PROTOCOL)
    }
    // console.log(this.baseStart + JSON.stringify(PROTOCOL))
    return this.baseStart + encodeURI(JSON.stringify(PROTOCOL))
  },
  openShare: function (oShare) {
    var PROTOCOL = {
      'protocol_type': 'share', // 协议类型
      'title': oShare.title, // 分享标题
      'desc': oShare.desc, // 分享描述
      'share_url': oShare.url, // 分享页面url
      'img_url': oShare.img // 分享缩略图url
    }
    if (this.isNoEncode) {
      return this.baseStart + JSON.stringify(PROTOCOL)
    }
    return this.baseStart + encodeURI(JSON.stringify(PROTOCOL))
  },
  showBadge: function (oBadge) {
    var PROTOCOL = {
      'protocol_type': 'showUserMedal',
      'user': oBadge.user,
      'touch_left': oBadge.left,
      'touch_bottom': oBadge.bottom
    }
    if (this.isNoEncode) {
      return this.baseStart + JSON.stringify(PROTOCOL)
    }
    var result = this.baseStart + encodeURI(JSON.stringify(PROTOCOL))
    return result
  },
  openNewWindow: function (oWindow) {
    var PROTOCOL = {
      'protocol_type': 'openWindow',
      'full_screen': false,
      'status_bar': {
        'style': 'default'
      },
      'navigation_bar': {
        'title': oWindow.title,
        'color': '222222',
        'transparent': false,
      },
      'webview': {
        'url': oWindow.url, // web页面url
        'bg': 'FFFFFF', // 背景色
        'loading': true, // 是否添加原生loading动画
        'pull': false, // 是否允许下拉
        'refresh': false // 是否允许下拉刷新
      },
      'network': false // 是否返回网络状态
    }
    if (oWindow.hasShare) {
      PROTOCOL.navigation_bar.right_icon = {
        'enabled': true,
        'file': 'navi_share_black', // 本地图标文件名
        'protocol': { // 图标执行协议
          'protocol_type': 'share',
          'title': oWindow.title, // 分享标题
          'desc': oWindow.desc, // 分享描述
          'share_url': oWindow.url, // 分享页面url
          'img_url': oWindow.img // 分享缩略图url
        }
      }
    } else {
      PROTOCOL.navigation_bar.right_icon = {
        'enabled': false
      }
    }
    if (this.isNoEncode) {
      return this.baseStart + JSON.stringify(PROTOCOL)
    }
    return this.baseStart + encodeURI(JSON.stringify(PROTOCOL))
  },
  openGameDetail: function (addId) {
    var PROTOCOL = {
      protocol_type: 'openGameDetail',
      app_id: addId
    }
    return this.baseStart + encodeURI(JSON.stringify(PROTOCOL))
  }
}

var heyboxProtocol = new HeyboxProtocol()
module.exports = heyboxProtocol
