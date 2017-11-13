var dirVars = require('../base/dir.vars.config.js')
module.exports = {
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
        'css-loader',
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
        htmlResourceRoot: dirVars.staticRootDir,
        root: dirVars.staticRootDir
      }
    }

  ]
}
