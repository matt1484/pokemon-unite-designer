module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? 'https://raw.githubusercontent.com/matt1484/pokemon-unite-designer/refs/heads/master/docs' : '/',
  devServer: {
    host: '127.0.0.1',
  }
}
