const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  entry: ['webpack/hot/dev-server', '/src/ts/index.tsx'],
  // entry: '/src/ts/index.tsx',
  // entry: {
  //   index: '/src/ts/index.tsx',
  //   App: '/src/ts/App.tsx',
  // },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    path: path.join(process.cwd(), 'dist'),
    filename: 'index_bundle.js',
    publicPath: './',
  },
  // output: {
  //   path: path.join(process.cwd(), 'test'),
  //   filename: '[name].js',
  //   sourceMapFilename: '[name].js.map',
  //   // publicPath: '/dist',
  // },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader',
        },
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(process.cwd(), '/src/index.html'),
    }),
    new MiniCssExtractPlugin(),
  ],
  devServer: {
    port: 3000,
    historyApiFallback: true,
  },
}
