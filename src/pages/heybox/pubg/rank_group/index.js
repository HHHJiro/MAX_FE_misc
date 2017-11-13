const render = require('./content.art')
require('./data.js')
require('../../../../static/pubg/rank_group/app.scss')

if (typeof document === 'object') {
  window.imgHandler = function (img) {
    img.src = 'https://cdn.max-c.com/app/heybox/icon_83.5@3x.png'
    img.onerror = null
  }
}

module.exports = render
