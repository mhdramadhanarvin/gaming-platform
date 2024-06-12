const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin');
const { join } = require('path');
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');

module.exports = {
  entry: './src/main.ts',
  target: 'node',
  externals: [nodeExternals()],
  output: {
    path: join(__dirname, '../../dist/apps/api'),
    filename: 'main.js'
  },
  mode: 'development',
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new NxAppWebpackPlugin({
      target: 'node',
      compiler: 'tsc',
      main: './src/main.ts',
      tsConfig: './tsconfig.app.json',
      assets: ['./src/assets'],
      optimization: true,
      outputHashing: 'none',
      watch: true
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
};
