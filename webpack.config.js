var webpack = require('webpack');
var path = require('path');

// Base configuration shared between both builds
const baseConfig = {
	resolve: {
		extensions: ['.js', '.jsx', '.css'],
		alias: {
			Utilities: path.resolve(__dirname, './../node_modules/')
		}
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {url: false}
					}
				]
			},
			{
				test: /\.(js|jsx)$/,
				exclude: /(node_modules|bower_components)/,
				use: ['babel-loader']
			},
		]
	},
	plugins: [
		new webpack.DefinePlugin({
			VERSION: JSON.stringify(require("./package.json").version)
		}),
	],
	devtool: "cheap-module-source-map",
	devServer: {
		static: {
			directory: path.resolve(__dirname, "./"),
		},
	}
};

// Original (vanilla JS) bundle configuration
const originalConfig = {
	...baseConfig,
	name: 'original',
	entry: [
		'./src/js/main.js',
	],
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
		publicPath: '/dist/'
	},
	plugins: [
		...baseConfig.plugins,
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery",
			"window.jQuery": "jquery"
		}),
	],
};

// React bundle configuration
const reactConfig = {
	...baseConfig,
	name: 'react',
	entry: [
		'./src/react/main.jsx',
	],
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle-react.js',
		publicPath: '/dist/'
	},
	plugins: [
		...baseConfig.plugins,
	],
};

// Export based on environment
module.exports = (env, argv) => {
	if (env && env.react) {
		return reactConfig;
	}
	if (env && env.all) {
		return [originalConfig, reactConfig];
	}
	return originalConfig;
};
