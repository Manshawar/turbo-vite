
export const formatRoute = (originRoute, resRouter: any = [], father?: any) => {
  originRoute.forEach((item) => {
    if (item.children && item.children.length > 0) {
      if (!item.path.startsWith("/")) {
        if (father) {
          item.path = father.path + "/" + item.path
        }
      }
      resRouter.push(item);
      formatRoute(item.children, resRouter, item);
    } else {
      if (!item.path.startsWith("/")) {
        if (father) {
          item.path = father.path + "/" + item.path
        }
      }
      resRouter.push(item);
    }

  })
  return resRouter
}

export const treeRoute = (wholeRoute) => {
  let routerMap = new Map();
  wholeRoute.forEach(item => {
    routerMap.set(item.meta.id, item);
    item.children = []
  });
  wholeRoute.forEach((item) => {
    if (routerMap.get(item.meta.parentId)) {
      routerMap.get(item.meta.parentId).children.push(item)
    }
  })
  let res = Array.from(routerMap, (item) => { if (item[1].meta.level.length === 1) { return item[1] } }).filter(item => item)
  return res
}
export const accessRoute = (routes, level = []) => {
  let i = 0;
  for (const route of routes) {
    route.meta = route.meta || {};

    route.meta.level = level.length === 0 ? [i + ""] : level.concat(i + "");
    route.meta.id = route.meta.level.join("-");
    route.meta.parentId = level.join("-");
    i++;
    if (route.children && route.children.length > 0) {
      accessRoute(route.children, route.meta.level);
    }
  }
  return routes
};
