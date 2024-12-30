import { defineStore } from 'pinia';
import { store } from "@/store"
import router from "@/router"
import { getAsyncRoute } from '../../mock/route';
const defaultState = () => {
  return {
    wholeRoute: [],
    tileRoutes: [],
    asyncRoutes: []
  }
}
export const routerStore = defineStore('routerStore', {
  state () {
    return defaultState()
  },

  actions: {
    setWholeRoute (dynamicRouter) {
      this.wholeRoute = [...dynamicRouter]
    },
    setOriginRoute (originRoute) {
      this.originRoute = [...originRoute]
    },
    setTileRoutes (tileRoutes) {
      this.tileRoutes = [...tileRoutes];
    },
    async setAsyncRoute () {
      const { data } = await getAsyncRoute();
      this.asyncRoutes = data;
      return data
    },
    resetState () {
      this.$state = defaultState()
    },
  },
  persist: {
    omit: ["wholeRoute"]//pick
  },
})
export function getRouterStore () {
  return routerStore(store);
}