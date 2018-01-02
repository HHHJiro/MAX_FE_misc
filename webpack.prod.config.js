var path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const Ex = require('extract-text-webpack-plugin')
const AutoDllPlugin = require('autodll-webpack-plugin')
var dirVars = require('./webpack-config/base/dir.vars.config')

module.exports = {
  entry: {
    // rankPlayer: './src/pages/maxplus/dota2/rank_official_list_player/index.js',
    // rankTeam: './src/pages/maxplus/dota2/rank_official_list_team/index.js',
    // rankGroup: './src/pages/heybox/pubg/rank_group/index.js',
    // pubgState: './src/pages/heybox/pubg/server_state/index.js',
    // record_compare: './src/pages/heybox/pubg/record_compare/index.js',
    // pubg_live: 'pagePubgDir/game_live/index.js',
    pubg_match: 'pageMatchPubgDir/match_tml/index.js',
    zepto: './src/vender/zepto.min.js'
    // vendor: ['./src/vender/zepto.min.js', './src/vender/utils.js', './src/vender/heybox_protocol.js', 'flyio']
  },
  resolve: require('./webpack-config/resolve.config'),
  output: {
    filename: '[name].[hash].js',
    chunkFilename: '[name].[chunkhash].js',
    // apidota
    // path: path.resolve(__dirname, '../../max/api_dota_test/static/build_assets/official_list'),
    // publicPath: '/static/build_assets/official_list'
    // heybox
    // path: path.resolve(__dirname, '../../max/heybox_test/static/build_assets/server_state'),
    // publicPath: '/static/build_assets/server_state/'
    // test server
    // ../../max/heybox_test/static/build_assets/record_compare
    path: path.resolve(__dirname, '../../max/max_net/douyu/view/json/pubg_tml'),
    publicPath: '/live_stats/json/pubg_tml/'
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
    new Ex('[name]_[contenthash:8]_styles.css'),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development', // 除非有定义 process.env.NODE_ENV，否则就使用 'development'
      DEBUG: false
    }),
    new HtmlWebpackPlugin({
      filename: 'pubg_match.html',
      inject: true,
      template: path.resolve(dirVars.pageMatchPubgDir, './match_tml/index.art'),
      xhtml: true,
      chunks: ['zepto', 'pubg_match'],
      minify: {
        removeComments: true,
        collapseWhitespace: true
      }
    }),
    // new AutoDllPlugin({
    //   inject: true,
    //   filename: '[name]_[hash].js',
    //   path: './dll',
    //   entry: {
    //     vendor: ['flyio']
    //   },
    //   plugins: [
    //     new webpack.optimize.UglifyJsPlugin()
    //   ]
    // }),
    new webpack.optimize.UglifyJsPlugin({
      warnings: false,
      compress: {
        join_vars: true,
        warnings: false
      },
      toplevel: false,
      ie8: true
    })
  ]
}
