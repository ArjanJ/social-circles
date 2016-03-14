const path 								= require('path');
const Webpack 						= require('webpack');
const HtmlWebpackPlugin 	= require('html-webpack-plugin');

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
		new HtmlWebpackPlugin({
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
			loaders: ['style', 'css', 'sass']
		}, {
			test: /\.js$/,
			loaders: ['babel'],
			include: path.join(__dirname, 'src')
		}]
	}
};