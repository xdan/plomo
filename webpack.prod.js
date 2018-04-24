const webpack = require('webpack');
const path = require('path');

/*
 * We've enabled UglifyJSPlugin for you! This minifies your app
 * in order to load faster and run less javascript.
 *
 * https://github.com/webpack-contrib/uglifyjs-webpack-plugin
 *
 */

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

/*
 * We've enabled ExtractTextPlugin for you. This allows your app to
 * use css modules that will be moved into a separate CSS file instead of inside
 * one of your module entries!
 *
 * https://github.com/webpack-contrib/extract-text-webpack-plugin
 *
 */

const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    mode: 'production',
	entry: './src/index',

	output: {
		filename: 'dist/[name].bundle.js',
		path: path.resolve(__dirname, '')
	},

    devtool: false,

    target: 'web',
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
			{
				test: /\.(less|css)$/,
                exclude: /\.module\.(less|css)$/,
				use: ExtractTextPlugin.extract({
					use: [
						{
							loader: 'css-loader',
							options: {
								sourceMap: true,
								minimize: true
							}
						},
						{
							loader: 'less-loader',
							options: {
								sourceMap: true
							}
						}
					],
					fallback: 'style-loader'
				})
			},
            {
                test: /\.module\.(less|css)$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                                modules: true,
                                minimize: true
                            }
                        },
                        {
                            loader: 'less-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ],
                    fallback: 'style-loader'
                })
            }
		]
	},

	plugins: [
		new UglifyJSPlugin(),
		new ExtractTextPlugin('dist/style.css')
	]
};
