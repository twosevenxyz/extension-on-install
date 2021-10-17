const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  configureWebpack: config => {
    if (config.type !== 'development') {
      config.plugins.push(...[
        new CopyWebpackPlugin([
          {
            from: resolve('public/static'),
            to: path.join(config.output.path, 'static')
          }
        ])
      ])
    }
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import \'~@/style/bulma-imports.scss\';'
      }
    }
  }
}
