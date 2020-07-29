'use strict'
const path = require('path')
const defaultSettings = require('./src/settings.js')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = defaultSettings.title || 'vue Admin Template' // 页标题

// 如果你的端口设置为80，
// 使用管理员权限执行命令行。
// 例如，Mac: sudo npm运行
// 你可以通过以下方法来改变端口:
// port = 9528 npm run dev OR npm run dev --port = 9528
const port = process.env.port || process.env.npm_config_port || 9528 // dev port

// 所有配置项说明 https://cli.vuejs.org/config/
module.exports = {
  /**
   * 如果您计划在子路径下部署您的站点，您将需要设置publicPath,
   * 例如GitHub页面。如果您计划将您的站点部署到https://foo.github.io/bar/,
   * 然后将publicPath设置为“/bar/”.
   * 在大多数情况下，请使用'/' !!
   * 细节:https://cli.vuejs.org/config/ publicpath
   */
  publicPath: '/', // 基本 URL
  outputDir: 'dist', // 生产环境构建文件的目录
  assetsDir: 'static', // 静态资源目录
  // lintOnSave: process.env.NODE_ENV === 'development', // 生产构建时禁用 eslint-loader
  lintOnSave: false, // 关闭 eslint
  productionSourceMap: false, // 生产环境的 source map
  devServer: { // 开发服务器
    port: port,
    open: false,
    overlay: { // 显示警告和错误
      warnings: false,
      errors: true
    }
  },
  configureWebpack: { // webpack 配置
    // 在webpack的name字段中提供应用程序的标题，以便可以在index.html中访问它来插入正确的标题。
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  chainWebpack(config) {
    //可以提高第一屏的速度，建议开启预加载
    config.plugin('preload').tap(() => [
      {
        rel: 'preload',
        // 忽略 runtime.js
        // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: 'initial'
      }
    ])

    // 当页面太多时，会产生太多无意义的请求
    config.plugins.delete('prefetch')

    // 设置 svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    // 设置 preserveWhitespace
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
              // `runtime` 必须与runtimeChunk名称相同。默认是 `runtime`
              inline: /runtime\..*\.js$/
            }])
            .end()
          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' //只打包最初依赖的第三方
                },
                elementUI: {
                  name: 'chunk-elementUI', // 将 elementUI 拆分成一个包
                  priority: 20, // 体积需要大于libs和app，否则会被打包成libs或app
                  test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // 适应cnpm
                },
                commons: {
                  name: 'chunk-commons',
                  test: resolve('src/components'), // 可以自定义规则
                  minChunks: 3, // 最低常见的数量
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            })
          // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
          config.optimization.runtimeChunk('single')
        }
      )
  }
}
