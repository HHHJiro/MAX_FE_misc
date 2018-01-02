// var pxtoviewport = require('postcss-px-to-viewport')
var autoprefixer = require('autoprefixer')
// var pxtoviewportConf = {
//   viewportWidth: 750,
//   viewportHeight: 1334,
//   unitPrecision: 5,
//   viewportUnit: 'vw',
//   selectorBlackList: [],
//   minPixelValue: 1,
//   mediaQuery: false
// }
module.exports = {
  plugins: [
    autoprefixer({
      remove: false,
      browsers: ['ie >= 8', '> 1% in CN']
    })
  ]
}
