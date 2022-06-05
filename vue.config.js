const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port:8070,
    proxy: "http://localhost:70", //api의 base url
  },
})
