const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'development',
    optimization: {
      //  minimize: true,
        minimizer: [ new CssMinimizerWebpackPlugin(), ]
    },
    module: {
        rules: [
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
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                //anterior
                test: /\.html$/i,
                use:[
                    {
                        loader: 'html-loader',
                        options: { 
                            minimize: false
                        },
                    },
                    ]
                // actual 
            /*    test: /\.html$/,
                loader: 'html-loader',
                options:  {
                    attributes: false,
                    minimize: false
                },    */
            },
            {
                test: /\.(png|svg|jpe?g|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
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
        new MiniCssExtractPlugin({
            filename: '[name].css',
            ignoreOrder: false
        }),
        new CopyPlugin({
            patterns: [
            { from:  'src/assets',  to: 'assets/' },
            ],
        }),
    ],
};