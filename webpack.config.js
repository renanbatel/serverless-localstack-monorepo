/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const slsw = require('serverless-webpack');
const ForkTsCheckerPlugin = require('fork-ts-checker-webpack-plugin');

const isLocal = slsw.lib.webpack.isLocal;

module.exports = {
  mode: isLocal ? 'development' : 'production',
  entry: slsw.lib.entries,
  externals: [nodeExternals(), 'aws-sdk'],
  devtool: isLocal ? 'source-map' : false,
  resolve: {
    extensions: ['.js', '.ts', '.json'],
    modules: [path.resolve(__dirname, 'node_modules'), 'node_modules'],
  },
  output: {
    libraryTarget: 'commonjs2',
    path: path.join(slsw.lib.serverless.config.servicePath, '.webpack'),
    filename: '[name].js',
  },
  target: 'node',
  optimization: {
    minimize: false,
  },
  module: {
    rules: [
      {
        // Include ts, tsx, js, and jsx files.
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'cache-loader',
            options: {
              cacheDirectory: path.resolve('.webpackCache'),
            },
          },
          {
            loader: 'babel-loader',
            options: {
              rootMode: 'upward',
            },
          },
          {
            loader: 'ts-loader',
            options: {
              configFile: path.join(__dirname, 'tsconfig.json'),
              transpileOnly: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new ForkTsCheckerPlugin({
      tsconfig: path.resolve(__dirname, 'tsconfig.json'),
    }),
  ],
};
