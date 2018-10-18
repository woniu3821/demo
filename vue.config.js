const BUILD = process.env.NODE_ENV == "production";

module.exports = {
  baseUrl: BUILD ? "/wec-user-mngt" : "",
  outputDir: "./webapp/newuser",
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
  configureWebpack: {
    devServer: {
      proxy: {
        "/wec-user-mngt": {
          target: "http://172.16.9.101:8082",
          // target: 'http://172.20.4.218:8080',
          // ws: true,
          changeOrigin: true
        }
      }
    }
  }
};
