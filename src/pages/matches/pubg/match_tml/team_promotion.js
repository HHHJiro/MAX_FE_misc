const {teamImage} = require('./team_img')
var teams = ['VG', 'WE', 'CITR']

var team = teams.map( t => {
  let team = {}
  team["team_name"] = t
  team["team_image_url"] = teamImage[t]
  return team
})

module.exports.team = team
