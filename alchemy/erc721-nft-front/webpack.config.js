const path = require('path');

module.exports = {
  resolve: {
    fallback: {
      "http": false,
      "https": false,
      "stream": false,
      "zlib": false,
      "crypto": false
    }
  },
  entry: './src/index.js', // Adjust the entry point as needed
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    compress: true,
    port: 9000,
  },
};

