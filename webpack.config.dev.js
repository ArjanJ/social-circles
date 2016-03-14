const path 								= require('path');
const Webpack 						= require('webpack');
const HtmlWebpackPlugin 	= require('html-webpack-plugin');

module.exports = {
	devtool: 'cheap-eval-source-map',
	entry: [
		'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/dev-server',
		'./src/index'
	],
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	plugins: [
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
	},
	devServer: {
    contentBase: './dist',
    hot: true
  }
};