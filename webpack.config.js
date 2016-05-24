module.exports = {
  entry: `${__dirname}/app/index.js`,

  output: {
    path: `${__dirname}/dist`,
    filename: 'index.js',
    publicPath: '/app/',
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
      },
    ],
  },
}
