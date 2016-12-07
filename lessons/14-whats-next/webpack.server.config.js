var fs = require('fs')
var path = require('path')

module.exports = {

  entry: './server.js',

  output: {
    filename: 'server.bundle.js',
    libraryTarget: 'commonjs2'
  },

  target: 'node',

  // keep node_module paths out of the bundle
  externals: /^[^.]/,

  node: {
    __filename: false,
    __dirname: false
  },

  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader?presets[]=es2015&presets[]=react' }
    ]
  }

}
