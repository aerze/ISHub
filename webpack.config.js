var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: path.join(__dirname, "client/src/main.js"),
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015'],
          cacheDirectory: true
        }
      },
      {
        test: /\.styl$/,
        loader: 'style-loader!css-loader!stylus-loader'
      }
    ]
  },

  externals: {
      //don't bundle the 'react' npm package with our bundle.js
      //but get it from a global 'React' variable
      'react': 'React',
      'react-dom': 'ReactDOM',
      'jquery': 'jQuery',
      'GUI': 'GUI',
      'WIN': 'WIN'
  },

  resolve: {
      extensions: ['', '.js', '.jsx']
  },

  output: {
    path: path.join(__dirname, "client/dist/js"),
    filename: "bundle.js"
  },

  plugins: [
      // new webpack.optimize.UglifyJsPlugin({minimize: true, sourceMap: true}),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.OccurenceOrderPlugin(true)
  ]
};