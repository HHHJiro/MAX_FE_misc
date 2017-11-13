var path = require('path')
var dirVars = require('./base/dir.vars.config.js')
module.exports = {
  hot: true, // 告诉 dev-server 我们在使用 HMR
  host: '192.168.0.159',
  port: 4001,
  proxy: {
    '/api/*': {
      target: 'http://apidota.test.maxjia.com:58888',
      changeOrigin: true
    },
    '/chat/*': {
      target: 'http://heybox.test.maxjia.com:58888',
      changeOrigin: true
    },
    '/game/*': {
      target: 'http://heybox.test.maxjia.com:58888',
      changeOrigin: true
    }
  },
  contentBase: path.resolve(dirVars.staticRootDir, 'dist'),
  publicPath: '/'
}
