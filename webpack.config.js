const webpack = require('webpack');
const path = require('path');

/*
 * We've enabled UglifyJSPlugin for you! This minifies your app
 * in order to load faster and run less javascript.
 *
 * https://github.com/webpack-contrib/uglifyjs-webpack-plugin
 *
 */

module.exports = {
	mode: 'development',
	entry: [
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://localhost:3001',
        'webpack/hot/only-dev-server',
		path.resolve(__dirname, 'src/index.js')
	],
    devtool: 'inline-source-map',
    target: 'web',
    devServer: {
        host: 'localhost',
        port: 3001,
        historyApiFallback: true,
		hot: true
	},
	output: {
		filename: 'dist/[name].bundle.js',
		path: path.resolve(__dirname, ''),
        publicPath: "/"
    },

	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
			{
				test: /\.(less|css)$/,

				use: [
                    {
                    	loader: "style-loader"
					},
					{
						loader: 'css-loader',
						options: {
                            modules: true,
                            localIdentName: "[name]__[local]___[hash:base64:5]",
							sourceMap: true
						}
					},
					{
						loader: 'less-loader',

						options: {
							sourceMap: true
						}
					}
				]
			}
		]
	},

	plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            "process.env": {
                "BUILD_TARGET": JSON.stringify("client")
            }
        })
	]
};
