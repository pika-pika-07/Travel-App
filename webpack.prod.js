//path: specifies the location of the module that needs to be loaded
const path = require('path')

const webpack = require('webpack')

// html-webpack-plugin: simplifies the creation of HTML files to serve the webpack bundles
const HtmlWebPackPlugin = require("html-webpack-plugin")

// workbox-webpack-plugin: generates service workers for web application
const WorkboxPlugin = require('workbox-webpack-plugin');

// clean-webpack-plugin: ensures that only the used files will be generated in the output directory
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

//mini-css-extract-plugin: extracts CSS into separate files
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

//  css-minimizer-webpack-plugin: minifies CSS files
//const CSSMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');


//const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

//  terser-webpack-plugin: minifies JS files
const TerserPlugin = require('terser-webpack-plugin');


module.exports = {
    entry: './src/client/index.js',
    mode: 'production',
    devtool: 'source-map',
    output: {
        // define the output location
        path: path.resolve(__dirname, 'dist'),
        // sets the output target type
        libraryTarget: 'var',
        // exports the built module as a variable to be used in the browser environment to ensure communication between files
        library: 'Client',
    },

    module: {
        rules: [
            {
                test: '/\.js$/',
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                // transforms SASS files into normal CSS files
                test: /\.scss$/,
                use: [ MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            }
        ]
    },
    optimization: {
        minimizer: [
            new TerserPlugin({}),
            //new CSSMinimizerWebpackPlugin({})
        ]
    },

    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/client/views/index.html",
            filename: "./index.html",
        }),
        new CleanWebpackPlugin({
            // Simulate the removal of files
            dry: true,
            // Write logs to console
            verbose: true,
            // Automatically remove all unused webpack assets on rebuild
            cleanStaleWebpackAssets: true,
            protectWebpackAssets: false
        }),

        new MiniCssExtractPlugin({
            filename: '[name].css'
        }),
        // new OptimizeCssAssetsPlugin({
        //     assetNameRegExp: /\.optimize\.css$/g,
        // }),

        new WorkboxPlugin.GenerateSW()
    ]
}
