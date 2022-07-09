import path from 'path';
import Dotenv from 'dotenv-webpack';
import nodeExternals from 'webpack-node-externals';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { fileURLToPath } from 'url';
import { merge } from 'webpack-merge';

import common from './webpack.common.js';
import tsConfig from './tsconfig.json' assert { type: 'json' };

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const client = merge(common, {
  name: 'client',
  mode: 'production',
  entry: './src/index.tsx',
  target: 'web',
  output: {
    path: path.resolve('./dist'),
    filename: 'bundle.js',
    publicPath: '/mixologyapp'
  },
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: '/assets/images'
          }
        }
      }
    ]
  },
  resolve: {
    modules: [path.resolve(__dirname, 'node_modules'), path.resolve(__dirname, tsConfig.compilerOptions.baseUrl)]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve('src', 'index.html'),
      filename: 'index.html'
    }),
    new Dotenv({
      path: '.env.production'
    })
  ]
});

const server = merge(common, {
  name: 'server',
  target: 'node',
  entry: './src/server.ts',
  output: {
    path: path.resolve('./dist'),
    filename: 'server.cjs'
  },
  resolve: {
    modules: [path.resolve(__dirname, 'node_modules'), path.resolve(__dirname, tsConfig.compilerOptions.baseUrl)]
  },
  externals: [nodeExternals()],
  plugins: [
    new Dotenv({
      path: '.env.production'
    })
  ]
});

const config = [client, server];

export default config;
