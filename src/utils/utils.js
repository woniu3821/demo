import axios from "@/utils/axios";
import store from "@/store";
export const getBreadCrumbList = (route, homeRoute) => {
  let routeMetched = route.matched;
  let res = routeMetched
    .filter(item => {
      return item.meta === undefined || !item.meta.hide;
    })
    .map(item => {
      let meta = {
        ...item.meta
      };
      if (meta.title && typeof meta.title === "function")
        meta.title = meta.title(route);
      let obj = {
        icon: (item.meta && item.meta.icon) || "",
        name: item.name,
        meta: meta
      };
      return obj;
    });
  res = res.filter(item => {
    return !item.meta.hideInMenu;
  });
  return [
    Object.assign(homeRoute, {
      to: homeRoute.path
    }),
    ...res
  ];
};
export const getHomeRoute = routers => {
  let i = -1;
  let len = routers.length;
  let homeRoute = {};
  while (++i < len) {
    let item = routers[i];
    if (item.children && item.children.length) {
      let res = getHomeRoute(item.children);
      if (res.name) return res;
    } else {
      if (item.name === "home") homeRoute = item;
    }
  }
  return homeRoute;
};

export const fetch = (url, data = {}, method = "get", loading = true) => {
  return new Promise((resolve, reject) => {
    if (loading) store.commit("changeLoading", true);
    if (method == "get") {
      axios
        .get(url, {
          params: { ...data }
        })
        .then(res => {
          store.commit("changeLoading", false);
          if (res.status == 200 && res.data.code == 0) {
            resolve(res.data);
          } else {
            console.warn(res.statusText);
            reject(res.data.message);
          }
        })
        .catch(err => {
          store.commit("changeLoading", false);
          reject(err);
        });
    } else {
      axios({ method, url, data })
        .then(res => {
          store.commit("changeLoading", false);
          if (res.status == 200 && res.data.code == 0) {
            resolve(res.data);
          } else {
            console.warn(res.statusText);
            reject(res.data.message);
          }
        })
        .catch(err => {
          store.commit("changeLoading", false);
          reject(err);
        });
    }
  });
};

export const isArray = data => (Array.isArray(data) && data.length ? data : []);
export const jsonParse = json =>
  Object.keys(json)
    .map(function(key) {
      let value = json[key];
      if (typeof value == "object") {
        value = JSON.stringify(value);
      }
      return encodeURIComponent(key) + "=" + encodeURIComponent(value);
    })
    .join("&");

export const formatDateTime = inputTime => {
  var date = inputTime == undefined ? new Date() : new Date(inputTime);
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? "0" + m : m;
  var d = date.getDate();
  d = d < 10 ? "0" + d : d;
  var h = date.getHours();
  h = h < 10 ? "0" + h : h;
  var minute = date.getMinutes();
  var second = date.getSeconds();
  minute = minute < 10 ? "0" + minute : minute;
  second = second < 10 ? "0" + second : second;
  return y + "-" + m + "-" + d + " " + h + ":" + minute + ":" + second;
};
export const newWin = url => {
  let prefix =
    location.origin.indexOf("localhost") > 0
      ? "http://wectest3.wisedu.com"
      : "";
  window.location.href = prefix + url;
};
