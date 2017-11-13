var dirVars = require('./base/dir.vars.config.js')

const moduleConfig = require('./inherit/module.config.js')

/*
  由于ExtractTextPlugin不支持热更新，因此选择在开发环境下直接用style-loader加载样式。
  如有问题，可切换回ExtractTextPlugin，即使不能用热更新，也可实现LiveReload
*/
// moduleConfig.rules.push(
//   {
//     test: /\.css$/,
//     use: [
//       'style-loader',
//       'css-loader'
//     ]
//   },
//   {
//     test: /\.scss$/,
//     use: [
//       'style-loader',
//       {
//         loader: 'css-loader',
//         options: {
//           minimize: true // css压缩
//         }
//       },
//       'postcss-loader',
//       'sass-loader'
//     ]
//   },
//   {
//     test: /\.(png|svg|jpg|gif)$/,
//     use: [
//       'file-loader'
//     ]
//   },
//   {
//     test: /\.(woff|woff2|eot|ttf|otf)$/,
//     use: [
//       'file-loader'
//     ]
//   },
//   {
//     test: /\.art$/,
//     loader: 'art-template-loader',
//     options: {
//       // art-template options (if necessary)
//       // @see https://github.com/aui/art-template
//       htmlResourceRoot: dirVars.staticRootDir,
//       root: dirVars.staticRootDir
//     }
//   },
//   {
//     test: /\.js$/,
//     exclude: /(node_modules|bower_components)/,
//     use: {
//       loader: 'babel-loader',
//       options: {
//         presets: ['env'],
//         plugins: [require('babel-plugin-transform-object-rest-spread')]
//       }
//     }
//   }
// )
module.exports = moduleConfig
