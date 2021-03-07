const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtreactPlugin = require('mini-css-extract-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin');
//const MinifyPlugin = require('babel-minify-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require("path");

module.exports = {
    mode: 'production',
    optimization: {
        minimizer: [ 
            new CssMinimizerWebpackPlugin(), ]
    },
    output:{
        filename: 'main.[contenthash].js',
        path: path.resolve(__dirname, "dist"),

    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                      'babel-loader',
                ]
            },
            {
                test: /\.css$/,
                exclude: /styles\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /styles\.css$/,
                use:[
                    MiniCssExtreactPlugin.loader,
                    'css-loader'
                ]
            },
            {
                //anterior
                test: /\.html$/i,
                use:[
                    {
                        loader: 'html-loader',
                        options: { minimize: false}
                    }
                ]
                // actual 
                /*test: /\.html$/,
                loader: 'html-loader',
                options:  {
                    attributes: false,
                },*/
            },
            {
                test: /\.(png|svg|jpe?g|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            emitFile: true,
                            esModule: false,
                            name: 'assets/[name].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html'
        }),
        new MiniCssExtreactPlugin({
            filename: '[name].[contenthash].css',
            ignoreOrder: false
        }),
        new CopyPlugin({
            patterns: [
            { from:  'src/assets',  to: 'assets/' },
            ],
        }),
        //new MinifyPlugin(),
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [path.join(__dirname, "dist/**/*")],
        }),
    ],
};