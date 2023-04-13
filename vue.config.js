// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true,
//   publicPath: '/',
//   devServer: {
//       proxy: 'http://scheduling.test',
//   }
// })
module.exports = {
  // transpileDependencies: true,
  publicPath: '',
  outputDir: '../public_html/',
  devServer: {
      proxy: 'http://scheduling.test',
  },
}
