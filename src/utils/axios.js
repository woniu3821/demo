import env from "./env";
import axios from "axios";
const instance = axios.create({
  baseURL: env.baseUrl,
  timeout: 300000,
  transformRequest: [
    function(data = {}) {
      return JSON.stringify(data);
    }
  ],
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest"
  }
  // ,
  // withCredentials: true
});

instance.interceptors.request.use(
  config => config,
  error => Promise.reject(error)
);

instance.interceptors.response.use(
  response => {
    // 直接返回html的情况处理
    if (response.headers["content-type"] === "text/htmlcharset=UTF-8") {
      const href = window.location.href;
      window.location.href =
        href.substring(0, href.lastIndexOf("/index.html")) + "/login.html";
      return;
    }
    // 正常请求的处理
    const LOGIN_FLAG = "WEC-HASLOGIN";
    const REDIRECT_KEY = "WEC-REDIRECTURL";
    if (
      response.data.datas &&
      response.data.datas[LOGIN_FLAG] === false &&
      response.data.datas[REDIRECT_KEY]
    ) {
      console.log("没有登录，跳转...");
      response.data["code"] = "0";
      const href = window.location.href;
      window.location.href =
        href.substring(0, href.lastIndexOf("/index.html")) + "/login.html";
      return;
    }
    // const data = response.data
    // if (data && data.code !== '0') {
    //   Vue.$showToast && Vue.$showToast(data.message)
    // }
    return response;
  },
  error => Promise.resolve(error.response)
);

export default instance;
