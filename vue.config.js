module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  // configureWebpack: {
  //   output: {
  //     chunkFilename: '[name].bundle.js',
  //   }

  // },
  chainWebpack: (config) => {
    // 移除 prefetch 插件
    config.plugins.delete('prefetch')
    /* 添加分析工具 */
    if (process.env.NODE_ENV === 'production') {
      if (process.env.npm_config_report) {
        config
          .plugin('webpack-bundle-analyzer')
          .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
          .end()
      }
    }
  }

}
