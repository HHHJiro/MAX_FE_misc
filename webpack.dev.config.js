
module.exports = {
  entry: require('./webpack-config/entry.config.js'),

  // devtool: '#inline-source-map',

  output: require('./webpack-config/output.config.js'),

  devServer: require('./webpack-config/devserver.config.js'),

  module: require('./webpack-config/module.dev.config.js'),

  resolve: require('./webpack-config/resolve.config.js'),

  plugins: require('./webpack-config/plugins.dev.config.js')

}
