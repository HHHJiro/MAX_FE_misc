var pxtoviewport = require('postcss-px-to-viewport')
var pxtoviewportConf = {
  viewportWidth: 750,
  viewportHeight: 1334,
  unitPrecision: 5,
  viewportUnit: 'vmin',
  selectorBlackList: [/^\.max-screen$/, /^\.pc__view$/],
  minPixelValue: 1,
  mediaQuery: false
}
var pxtorem = require('postcss-pxtorem')
var pxtoremConf = {
  rootValue: 75,
  unitPrecision: 5,
  propList: ['*'],
  selectorBlackList: [],
  replace: true,
  mediaQuery: false,
  minPixelValue: 0
}
module.exports = {
  plugins: [
    require('autoprefixer'),
    require('postcss-write-svg'),
    pxtorem(pxtoremConf)
  ]
}
