const path = require('path');

module.exports = {
	mode: 'production',
	entry: path.join(__dirname, './src/index.ts'),
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'build.js',
		libraryTarget: 'umd',
	},
	devtool: 'source-map',
	resolve: {
		extensions: ['.ts', '.js']
	},
	module: {
		rules: [
			{
				test: /\.(j|t)s?$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader'
					}
				]
			},
			{
				enforce: 'pre',
				test: /\.js$/,
				loader: 'source-map-loader'
			}
		]
	}
};
