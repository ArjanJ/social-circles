const path 								= require('path');
const webpack 						= require('webpack');
const htmlWebpackPlugin 	= require('html-webpack-plugin');
const autoprefixer 				= require('autoprefixer');

module.exports = {
	devtool: 'source-map',
	entry: [
		'./src/index'
	],
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
      },
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
		new htmlWebpackPlugin({
	    template: './src/index.html'
	  })
	],
	module: {
		preLoaders: [{
			test: /\.js$/,
			loaders: ['eslint-loader'],
			exclude: /node_modules/
		}],
		loaders: [{
			test: /\.scss$/,
			loaders: ['style', 'css', 'postcss', 'sass']
		}, {
			test: /\.js$/,
			loaders: ['babel'],
			include: path.join(__dirname, 'src')
		}, {
      test: /\.(jpe?g|png|gif|svg)$/i,
      loaders: [
        'url?limit=8192',
        'img'
      ],
      exclude: /node_modules/
	  }]
	},
	postcss: function() {
  	return [autoprefixer]
  }
};