import path from 'path';
import { merge } from 'webpack-merge';
import Dotenv from 'dotenv-webpack';
import nodeExternals from 'webpack-node-externals';
import HtmlWebpackPlugin from 'html-webpack-plugin';

import common from './webpack.common.js';

const client = merge(common, {
  name: 'client',
  mode: 'development',
  entry: './src/index.tsx',
  target: 'web',
  devtool: 'inline-source-map',
  devServer: {
    port: 8080,
    historyApiFallback: true,
    hot: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve('src', 'index.html'),
      filename: 'index.html'
    }),
    new Dotenv({
      path: '.env.development'
    })
  ]
});

const server = merge(common, {
  name: 'server',
  target: 'node',
  node: {
    __dirname: false,
    __filename: false
  },
  entry: './src/server.ts',
  output: {
    path: path.resolve('./dist'),
    filename: 'server.cjs'
  },
  externals: [nodeExternals()],
  plugins: [
    new Dotenv({
      path: '.env.development'
    })
  ]
});

const config = [client, server];

export default config;
