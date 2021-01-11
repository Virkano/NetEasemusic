const WorkboxPlugin = require("workbox-webpack-plugin");

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  // 部署应用时的根路径(默认'/'),也可用相对路径(存在使用限制)
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  // 运行时生成的生产环境构建文件的目录(默认''dist''，构建之前会被清除)
  outputDir: 'dist',
  //放置生成的静态资源(s、css、img、fonts)的(相对于 outputDir 的)目录(默认'')
  assetsDir: '',
  //指定生成的 index.html 的输出路径(相对于 outputDir)也可以是一个绝对路径。
  indexPath: 'index.html',
  configureWebpack: {
    devtool: isProd ? false: 'source-map',
    devServer: {
      open: true,
      proxy: {
        '/netease-api': {
          target: 'http://47.101.52.111:3000',
          pathRewrite: { '^/netease-api': '' },
          changeOrigin: true,
          secure: false,
        },
      },
      port: 8888,
    },
    externals: isProd ? {
      vue: 'Vue',
      'vue-router': 'VueRouter',
      vuex: 'Vuex',
      axios: 'axios',
    }: {},
    plugins: [
      new WorkboxPlugin.GenerateSW()
    ]
  },
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "~@/style/variables.scss";
          @import "~@/style/mixin.scss";
        `,
      },
    },
  },
}
