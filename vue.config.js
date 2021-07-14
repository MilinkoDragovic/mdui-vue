const path = require('path');

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  lintOnSave: false,
  filenameHashing: false,
  productionSourceMap: false,
  css: {
    sourceMap: true
  },
  chainWebpack: config => {
    config.resolve.alias
        .set('dist', resolve('../dist'))
  }
};