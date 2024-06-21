const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: '/quiz/',
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
      },
    },
  },
});
