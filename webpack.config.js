var path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: {
    record_compare: './src/pages/heybox/pubg/record_compare/index.js',
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
    port: 4001,
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
          'file-loader'
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
      filename: 'state.html',
      template: 'src/pages/heybox/pubg/server_state/index.art',
      xhtml: true, // 需要符合xhtml的标准
      chunks: ['pubgState', 'vender'],
      minify: {
        removeComments: true,
        collapseWhitespace: true
      }
    }),
    new HtmlWebpackPlugin({
      filename: 'rank_group.html',
      template: 'src/pages/heybox/pubg/rank_group/index.art',
      xhtml: true, // 需要符合xhtml的标准
      chunks: ['rankGroup', 'vender'],
      minify: {
        removeComments: true,
        collapseWhitespace: true
      }
    }),
    new HtmlWebpackPlugin({
      filename: 'rank_player.html',
      template: 'src/pages/maxplus/dota2/rank_official_list_player/index.art',
      xhtml: true, // 需要符合xhtml的标准
      chunks: ['rankPlayer', 'vender'],
      minify: {
        removeComments: true,
        collapseWhitespace: true
      }
    }),
    new HtmlWebpackPlugin({
      filename: 'rank_team.html',
      template: 'src/pages/maxplus/dota2/rank_official_list_team/index.art',
      xhtml: true, // 需要符合xhtml的标准
      chunks: ['rankTeam', 'vender'],
      minify: {
        removeComments: true,
        collapseWhitespace: true
      }
    }),
    new HtmlWebpackPlugin({
      filename: 'excellen_time.html',
      template: 'src/pages/heybox/pubg/excellent_time/index.art',
      xhtml: true, // 需要符合xhtml的标准
      chunks: ['excellen_time', 'vender'],
      minify: {
        removeComments: true,
        collapseWhitespace: true
      }
    }),
    new HtmlWebpackPlugin({
      filename: 'record_compare.html',
      template: 'src/pages/heybox/pubg/record_compare/index.art',
      xhtml: true, // 需要符合xhtml的标准
      chunks: ['record_compare', 'vender'],
      minify: {
        removeComments: true,
        collapseWhitespace: true
      }
    })
  ]
}
