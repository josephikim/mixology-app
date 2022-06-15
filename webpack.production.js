import { merge } from 'webpack-merge';
import Dotenv from 'dotenv-webpack';
import common from './webpack.common';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const client = merge(common, {
  plugins: [
    new Dotenv({
      path: '.env.production'
    }),
    new HtmlWebpackPlugin()
  ]
});

const server = merge(common, {
  // prod server configs
});

const config = { ...client, ...server };

export default config;
