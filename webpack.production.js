import webpack from 'webpack';
import { merge } from 'webpack-merge';
import Dotenv from 'dotenv-webpack';
import common from './webpack.common';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const client = merge(common, {
  plugins: [
    new Dotenv({
      path: '.env'
    }),
    new HtmlWebpackPlugin()
  ]
});

const server = merge(common, {
  // dev server configs
});

const config = { ...client, ...server };

export default config;
