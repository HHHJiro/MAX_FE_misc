var path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
const Ex = require('extract-text-webpack-plugin')

module.exports = {
  entry: {
    match: './src/pages/matches/dota/match_tml/index.js',
    vender: './src/vender/zepto.min.js'
  },
  output: {
    filename: '[name].[hash].js',
    chunkFilename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, '../../max/max_net/douyu/view/json/dota_tml'),
    publicPath: '/live_stats/json/dota_tml'
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
        use: Ex.extract([
          {
            loader: 'css-loader',
            options: {
              minimize: true // css压缩
            }
          },
          'postcss-loader',
          'sass-loader'
        ])
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
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
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
    new ExtractTextPlugin('[name].styles.[contenthash].css'),
    new HtmlWebpackPlugin({
      filename: 'dota_match_tml.html',
      template: './src/pages/matches/dota/match_tml/index.art',
      xhtml: true, // 需要符合xhtml的标准
      chunks: ['match', 'vender'],
      minify: {
        removeComments: true,
        collapseWhitespace: true
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      warnings: false,
      compress: {
        warnings: false
      },
      toplevel: false,
      ie8: false
    })
  ]
}
