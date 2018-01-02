var path = require('path')
var dirVars = require('./base/dir.vars.config.js')
module.exports = {
  // 模块别名的配置，为了使用方便，一般来说所有模块都是要配置一下别名的
  alias: {
    /* 各种目录 */
    pagesDir: dirVars.pagesDir,
    vendorDir: dirVars.vendorDir,
    staticDir: dirVars.staticDir,
    pagePubgDir: dirVars.pagePubgDir,
    pageMatchPubgDir: dirVars.pageMatchPubgDir,
    asstesDir: dirVars.asstesDir
    /* components */
  },

  // 当require的模块找不到时，尝试添加这些后缀后进行寻找
  extensions: ['.js', '.css', '.scss']
}
