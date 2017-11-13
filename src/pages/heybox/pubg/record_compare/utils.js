function getRecords (params) {
  var result = ''
  for (var k of Object.keys(params)) {
    result += k + '=' + params[k] + '&'
  }
  return '/game/pubg/compare/data/?' + result
}
module.exports.getRecords = getRecords

function getQueryString (name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  var r = window.location.search.substr(1).match(reg)
  if (r != null) {
    return unescape(r[2])
  }
  return null
}
module.exports.getQueryString = getQueryString
