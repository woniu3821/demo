module.exports = {
  baseUrl: "./",
  outputDir: "../webapp",
  pages: {
    index: "src/main.js"
  },
  // assetsDir: 'assets',
  lintOnSave: false,
  productionSourceMap: false,
  css: {
    loaderOptions: {
      // less: {
      //   data: `
      //     import "~/less/variables.less";
      //     import "~/less/tools.less";
      //   `
      // }
    }
  },
  devServer: {
    proxy: {
      "wec-msg-mngt/": {
        target: "http://172.16.9.101:18080",
        // target: 'http://127.0.0.1:8081',
        changeOrigin: true
      }
    }
  }
  // configureWebpack: {
  //   externals: {
  //     vue: "Vue"
  //   }
  // }
};
