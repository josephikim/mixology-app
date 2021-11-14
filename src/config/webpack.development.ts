import webpack from 'webpack';
import path from 'path';
import { merge } from 'webpack-merge';
import Dotenv from 'dotenv-webpack';
import nodeExternals from 'webpack-node-externals';
import HtmlWebpackPlugin from 'html-webpack-plugin';

import common from './webpack.common.js';

const client: webpack.Configuration = merge(common, {
  name: 'client',
  entry: './src/client/index.tsx',
  devtool: 'inline-source-map',
  output: {
    path: path.resolve('./dist'),
    filename: 'bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve('src/client', 'index.html'),
      filename: 'index.html',
      excludeChunks: ['server']
    }),
    new Dotenv({
      path: path.resolve('src/config', '.env.development')
    }) as any
  ]
});

const server: webpack.Configuration = merge(common, {
  name: 'server',
  entry: './src/server/server.ts',
  target: 'node',
  output: {
    path: path.resolve('./dist'),
    filename: 'server.js'
  },
  externals: [nodeExternals()],
  plugins: [
    new Dotenv({
      path: path.resolve('src/config', '.env.development')
    }) as any
  ]
});

const config: webpack.Configuration[] = [server, client];

export default config;
