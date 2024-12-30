import { createWebHistory, createMemoryHistory, createWebHashHistory, createRouter } from "vue-router";
import { getUserStore } from "@/store/modules/user";
import { getRouterStore } from "@/store/modules/router";
import remaining from "./modules/remaining";
import NProgress, { set } from "nprogress";
import "nprogress/nprogress.css";
import * as utils from "./utils";
import { ElMessage } from "element-plus";
import { RouteRecordRaw } from "vue-router"
const whiteList = ["/login", "/404"];

const module = import.meta.glob("@/views/**/*.vue", { eager: true });
const Layout = import.meta.glob("@/layout/index.vue");
NProgress.configure({
  // 动画方式
  easing: "ease",
  // 递增进度条的速度
  speed: 500,
  // 是否显示加载ico
  showSpinner: false,
  // 自动递增间隔
  trickleSpeed: 200,
  // 初始化时的最小百分比
  minimum: 0.3
});

export const router = createRouter({
  history: createWebHistory(),
  routes: [...remaining] as RouteRecordRaw[],
});

// router.addRoute(...notFound);
router.beforeEach(async (to, from, next) => {
  const { setWholeRoute, setAsyncRoute, tileRoutes, setTileRoutes, wholeRoute } = getRouterStore();
  NProgress.start();
  const { token, setRoute, currentRoute, getInfo, userInfo, loginOut } = getUserStore();
  setRoute(to.fullPath);
  let isWhite = whiteList.includes(to.path);

  if (token) {
    if (to.fullPath === "/login") {
      next(currentRoute == "/login" || currentRoute === "/404" ? "/" : currentRoute)
    } else {
      if (Object.keys(userInfo).length === 0) await getInfo();
      if (wholeRoute.length == 0) {

        initRouter().then(() => {

          if (!to.name) {
            router.push(to.fullPath);

          }

        }).catch(error => {
          loginOut();
          ElMessage.error("用户信息错误")
          next("/login")
        })

      }
      next();
    }

  } else {
    const { resetState } = getRouterStore();
    resetState();
    if (isWhite) {
      next()
    } else {
      if (to.fullPath === "/") {
        next("/login")
      } else {
        next("/404")
      }

    }
  }

})
router.afterEach(() => {
  NProgress.done()
})
export default router;

async function initRouter() {
  const { setWholeRoute, setAsyncRoute, setTileRoutes } = getRouterStore();
  const { userInfo } = getUserStore();

  try {
    let asyncRoutes = await setAsyncRoute();

    let formatRoutes = utils.formatRoute(utils.accessRoute(asyncRoutes));

    formatRoutes.forEach(item => { delete item.children });
    formatRoutes = formatRoutes.filter((item) => {
      if (item.meta.role) {
        return userInfo.role.includes(item.meta.role) && item
      } else {
        return item
      }

    })
    setTileRoutes(formatRoutes);
    let moduleRoutes = formatRoutes.map((item) => {
      if (item.component == "Layout") {
        return {
          ...item,
          component: Layout['/src/layout/index.vue']
        }
      }
      else if (module[item.component]) {
        return {
          ...item,
          //@ts-ignore
          component: module[item.component].default
        }
      } else {
        return item;
      }

    })
    let resolveRoutes = utils.treeRoute(moduleRoutes);

    resolveRoutes.forEach(item => {
      router.addRoute(item)
    })
    addNotfound();
    setWholeRoute(resolveRoutes);
  } catch (error) {
    throw error
  }





}
function addNotfound() {
  !router.hasRoute("notFound") && router.addRoute({
    path: "/:pathMatch(.*)*",
    name: "notFound",
    redirect: "/404"
  });
}

export function resetRoutes() {
  const { tileRoutes } = getRouterStore();
  tileRoutes.forEach(item => {
    let name = item.name
    router.hasRoute(name) && router.removeRoute(name);
  })
  router.hasRoute("notFound") && router.removeRoute("notFound");

}