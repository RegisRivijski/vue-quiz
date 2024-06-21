const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: '/quiz/',
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3040',
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
      },
    },
  },
});
