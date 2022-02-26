/*
 * @Author: skaarf9
 * @LastEditors: skaarf9
 * @Date: 2022-02-25 01:00:20
 * @LastEditTime: 2022-02-25 16:10:41
 * @Description: file content
 * @FilePath: \vueblog-vue\vue.config.js
 */
const AutoImport = require("unplugin-auto-import/webpack");
const Components = require("unplugin-vue-components/webpack");
const { ElementPlusResolver } = require("unplugin-vue-components/resolvers");

const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
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
});
