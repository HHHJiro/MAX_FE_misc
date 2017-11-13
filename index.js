var glob = require('glob')
var path = require('path')
var options = {
  cwd: path.join(__dirname, 'src', 'pages'), // 在pages目录里找
  sync: true // 这里不能异步，只能同步
}
var globInstance = new glob.Glob('!(_)*/!(_)*/!(_)*', options) // 考虑到多个页面共用HTML等资源的情况，跳过以'_'开头的目录
console.log(globInstance.found)
