const render = require('./content.art')
var fly = require('flyio')
var procotol = require('../../../../vender/max_protocol')

if (typeof document === 'object') {
  window.onload = function () {
    fly.get('/api/league/circuit/team/data/')
      .then(function (res) {
        var data = res.data.result
        return data
      }).then(data => {
        var html = render(data)
        if (typeof document === 'object') {
          var $ = window.$
          document.getElementById('app').innerHTML = html
          var teams = $('.tal-body')
          var openTeams = $('.tal-body .team-avatar, .tal-body .team-name')

          teams.tap(function () {
            var playerBox = $(this).next('.players-wrap')
            var $arrow = $(this).find('.arrow')
            playerBox.fadeToggle(500, function () {
              $arrow.toggleClass('open')
            })
          })
          openTeams.tap(function (event) {
            event.preventDefault()
            var ethis = $(this).parent()
            var oTeam = {
              "team_id": ethis.data('temid') + '',
              "team_logo_url": ethis.data('logourl'),
              "team_name": ethis.data('teamname')
            }
            window.location.href = procotol.openDotaProfessionTeam(oTeam)
            return false
          })
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}
