var path = require('path')
var moduleExports = {}

// 源文件目录
moduleExports.staticRootDir = path.resolve(__dirname, '../../') // 项目根目录
moduleExports.srcRootDir = path.resolve(moduleExports.staticRootDir, './src') // 项目业务代码根目录
moduleExports.pagesDir = path.resolve(moduleExports.srcRootDir, './pages') // 存放各个页面独有的部分，如入口文件、只有该页面使用到的css、模板文件等
moduleExports.publicDir = path.resolve(moduleExports.srcRootDir, './public') // 存放各个页面使用到的公共资源
moduleExports.configDir = path.resolve(moduleExports.publicDir, './config') // 存放各种配置文件
moduleExports.componentsDir = path.resolve(moduleExports.publicDir, './components') // 存放组件，可以是纯HTML，也可以包含js/css/image等，看自己需要
moduleExports.layoutDir = path.resolve(moduleExports.publicDir, './layout') // 存放UI布局，组织各个组件拼起来，因应需要可以有不同的布局套路
moduleExports.dllDir = path.resolve(moduleExports.srcRootDir, './dll') // 存放由各种不常改变的js/css打包而来的dll

// moduleExports.vendorDir = path.resolve(moduleExports.staticRootDir, './vendor') // 存放所有不能用npm管理的第三方库
// moduleExports.logicDir = path.resolve(moduleExports.publicDir, './logic') // 存放公用的业务逻辑
// moduleExports.libsDir = path.resolve(moduleExports.publbuildDiricDir, './libs') // 与业务逻辑无关的库都可以放到这里

module.exports = moduleExports
