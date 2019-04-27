const appConfig = require('./src/app.config')

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/hy/' : '/',
  configureWebpack: config => {
    config.name = appConfig.title
    config.devtool = 'source-map'
    config.resolve.alias = Object.assign(config.resolve.alias, require('./aliases.config').webpack)
    if (process.env.NODE_ENV === 'production') {
      config.optimization.minimizer[0].options.extractComments = true
      // config.optimization.minimizer[0].options.uglifyOptions.output.comments = false
      // config.optimization.minimizer[0].options.uglifyOptions.compress.warnings = true
      // config.optimization.minimizer[0].options.uglifyOptions.compress.drop_console = true
      // config.optimization.minimizer[0].options.uglifyOptions.compress.drop_debugger = true
    }
  },
  parallel: require('os').cpus().length > 1, // 构建时开启多进程处理babel编译
  productionSourceMap: true,
    devServer: {
    host: 'localhost',
    open: true,
    port: 8888,
    overlay: true

        // proxy: {
    //   '/api': {
    //     target: 'http://hdri.promace.uat.zklh.sinopec.com:9090',
    //     changeOrigin: true,
    //     ws: true,
    //     pathRewrite: {
    //       '^/api': ''
    //     }
    //   }
    // }
  }
}
