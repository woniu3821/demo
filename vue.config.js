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
        target: "https://wectest3.wisedu.com/",
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
