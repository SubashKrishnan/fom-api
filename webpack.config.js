const path = require('path');
const slsw = require('serverless-webpack');
// const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const { ESBuildMinifyPlugin } = require('esbuild-loader');
const esbuild = require('esbuild');
module.exports = {
	mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
	entry: slsw.lib.entries,
	externals: [
		'@types/aws-lambda',
		'@types/node',
		'@types/uuid',
		'aws-sdk',
		'aws-xray-sdk',
		'esbuild',
		'esbuild-loader',
		'fork-ts-checker-webpack-plugin',
		'lint-staged',
		'serverless',
		'serverless-api-gateway-caching',
		'serverless-dependson-plugin',
		'serverless-offline',
		'serverless-webpack',
		'ts-loader',
		'ts-node',
		'tslint',
		'typescript',
		'webpack',
		'webpack-node-externals',
	],
	resolve: {
		modules: ['node_modules', path.resolve(__dirname, 'src')],
		extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
	},
	output: {
		libraryTarget: 'commonjs',
		path: path.join(__dirname, '.webpack'),
		filename: '[name].js',
	},
	target: 'node',
	module: {
		rules: [
			{
				// test: /\.ts(x?)$/,
				// loader: 'ts-loader',
				// exclude: /node_modules/,
				// options: {
				// 	transpileOnly: true,
				// },
				test: /\.tsx?$/,
				loader: 'esbuild-loader',
				options: {
					loader: 'tsx', // Or 'ts' if you don't need tsx
					target: 'es2015',
					implementation: esbuild,
				},
			},
		],
	},
	// plugins: [new ForkTsCheckerWebpackPlugin()],
	// optimization: {
	// 	minimize: true,
	// },
	optimization: {
		minimizer: [
			new ESBuildMinifyPlugin({
				target: 'es2015', // Syntax to compile to (see options below for possible values)
			}),
		],
	},
};
