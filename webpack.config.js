var path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: {
    // pubgState: './src/pages/heybox/pubg/server_state/index.js',
    excellen_time: './src/pages/heybox/pubg/excellent_time/index.js',
    // record_compare: './src/pages/heybox/pubg/record_compare/index.js',
    vender: './src/vender/zepto.min.js'
  },
  devtool: '#inline-source-map',
  output: {
    filename: '[name].[hash:8].js',
    chunkFilename: '[name].[chunkhash:8].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  devServer: {
    hot: true, // 告诉 dev-server 我们在使用 HMR
    host: '192.168.1.153',
    port: 4002,
    proxy: {
      '/tools/*': {
        target: 'http://heybox.test.maxjia.com:58888',
        changeOrigin: true
      },
      '/chat/*': {
        target: 'http://heybox.test.maxjia.com:58888',
        changeOrigin: true
      },
      '/game/*': {
        target: 'http://heybox.test.maxjia.com:58888',
        changeOrigin: true
      },
      '/pc/*': {
        target: 'http://heybox.test.maxjia.com:58888',
        changeOrigin: true
      }
    },
    contentBase: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              minimize: true // css压缩
            }
          },
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.art$/,
        loader: 'art-template-loader',
        options: {
          // art-template options (if necessary)
          // @see https://github.com/aui/art-template
          htmlResourceRoot: __dirname,
          root: path.resolve(__dirname)
        }
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env'],
            plugins: [require('babel-plugin-transform-object-rest-spread'), require('babel-plugin-transform-runtime')]
          }
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']), // 清理dist目录
    new webpack.HotModuleReplacementPlugin(), // 启用 HMR
    new ExtractTextPlugin('[name]/styles.[content:8].css'),
    new HtmlWebpackPlugin({
      filename: 'excellen_time.html',
      template: 'src/pages/heybox/pubg/excellent_time/index.art',
      xhtml: true, // 需要符合xhtml的标准
      chunks: ['excellen_time', 'vender'],
      minify: {
        removeComments: true,
        collapseWhitespace: true
      }
    })
  ]
}
