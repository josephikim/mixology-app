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
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
  }
};

export default common;
