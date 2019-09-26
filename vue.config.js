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
  //   externals: {
  //     'vue': 'Vue',
  //     'vue-router': 'VueRouter',
  //     // 'axios': 'axios',
  //     'element-ui': 'ELEMENT'
  //   }
  // }
}