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
  outputDir: '../for_production/scheduling-ui-master/dist/',
  devServer: {
      proxy: 'http://scheduling.test',
  },
}
