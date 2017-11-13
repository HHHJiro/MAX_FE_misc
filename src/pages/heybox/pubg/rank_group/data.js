var fly = require('flyio')
// 通过用户id获取信息,参数直接写在url中
const render = require('./content.art')
var {app, animate} = require('./app')
var utils = require('../../../../vender/utils')
if (typeof document === 'object') {
  window.onload = function () {
    var groupId = utils.getQueryString('group_id')
    var heyboxId = utils.getQueryString('heybox_id')
    fly.get('/chat/group/user_ranking_data/?group_id=' + groupId + '&heybox_id=' + heyboxId)
      .then(function (res) {
        var data = res.data.result
        window.typeData = {
          Rating: data
        }
        new app()
        const html = render(data)
        
        if (typeof document === 'object') {
          document.getElementById('app').innerHTML = html
          new animate(data)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}
