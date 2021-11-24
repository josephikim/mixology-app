import * as webpack from 'webpack';

const common = {
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(png|svg|jpg|gif|eot|otf|ttf|woff|woff2)$/,
        use: ['file-loader']
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-url-loader',
            options: {
              limit: 10 * 1024,
              noquotes: true
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
  }
};

export default common;
