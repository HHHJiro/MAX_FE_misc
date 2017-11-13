var pxtoviewport = require('postcss-px-to-viewport')
var pxtoviewportConf = {
  viewportWidth: 750,
  viewportHeight: 1334,
  unitPrecision: 5,
  viewportUnit: 'vw',
  selectorBlackList: [],
  minPixelValue: 1,
  mediaQuery: false
}
module.exports = {
  plugins: [
    require('autoprefixer')
  ]
}
