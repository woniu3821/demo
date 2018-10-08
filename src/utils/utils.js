import axios from "@/utils/axios";
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

export const fetch = (url, params = {}, method = "get") => {
  return new Promise((resolve, reject) => {
    axios({ url, method, data: params })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const isArray = data => {
  Array.isArray(data) && data.length ? data : [];
};
