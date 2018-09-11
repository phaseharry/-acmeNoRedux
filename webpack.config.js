module.exports = {
    mode: 'development',
    entry: ['babel-polyfill', './src/index.js'],
    output: {
      path: __dirname,
      filename: 'public/bundle.js',
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
        },
      ],
    },
  };
  