import { Message } from "iview";
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
    "X-Requested-With": "XMLHttpRequest",
    wecSchoolId: 1019429679435008
  }
  // ,
  // withCredentials: true
});

instance.interceptors.request.use(
  config => {
    return config;
  },
  error => Promise.reject(error)
);

instance.interceptors.response.use(
  response => {
    // 直接返回html的情况处理
    if (response.headers["content-type"] === "text/htmlcharset=UTF-8") {
      const href = window.location.href;
      // window.location.href =
      //   href.substring(0, href.lastIndexOf("/index.html")) + "/login.html";
      return;
    }
    // const data = response.data;
    // if (data && data.code !== '0') {
    //   Message
    // }
    return response;
  },
  error => Promise.resolve(error.response)
);

export default instance;
