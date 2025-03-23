const { defineConfig } = require('@vue/cli-service');
const AutoImport = require('unplugin-auto-import/webpack');
const Components = require('unplugin-vue-components/webpack');
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers');
const path = require('path');

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  configureWebpack: {
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('@', path.resolve(__dirname, 'src'));
  },
  devServer: {
    port: 8080, 
    proxy: {
      '/api': {
        target: 'http://10.69.1.121/hufu/api/v1/restData', 
        changeOrigin: true, 
        pathRewrite: {
          '^/api': '', 
        },
      },
    },
  },
});    