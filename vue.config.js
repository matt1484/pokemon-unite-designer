module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '' : '/',
  devServer: {
    host: '127.0.0.1',
  }
}
