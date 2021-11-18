import webpack from 'webpack';
import path from 'path';
import { merge } from 'webpack-merge';
import Dotenv from 'dotenv-webpack';
import nodeExternals from 'webpack-node-externals';
import HtmlWebpackPlugin from 'html-webpack-plugin';

import common from './webpack.common.js';

const client = merge(common, {
  name: 'client',
  entry: {
    main: [
      'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true', 
      './src/client/index.tsx'
    ]
  },
  devtool: 'inline-source-map',
  output: {
    path: path.resolve('./dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve('src/client', 'index.html'),
      filename: 'index.html',
      excludeChunks: ['server']
    }),
    new Dotenv({
      path: '.env.development'
    })
  ]
});

const server = merge(common, {
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
      path: '.env.development'
    })
  ]
});

const config = [client, server];

export default config;
