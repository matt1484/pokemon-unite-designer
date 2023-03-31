module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? 'https://cdn.statically.io/gh/matt1484/pokemon-unite-designer/master/docs' : '/',
  devServer: {
    host: '127.0.0.1',
  }
}
