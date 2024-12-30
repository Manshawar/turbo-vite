import { defineStore } from 'pinia';
import { store } from "@/store"
import { getToken as getTokenCookie, setToken as setTokenCookie } from '@/utils/js-cookie';
import { login as loginApi, getInfo as getInfoApi } from "@/api/user";
import router, { resetRoutes } from '@/router';
interface UserStateType {
  token: string,
  currentRoute: string,
  userInfo: UserInfoType,
  online: boolean
}
interface UserInfoType {
  role: string[]
}
const defaultState = () => {
  return {
    token: "",
    currentRoute: "",
    userInfo: {},
    online: false
  }
}
export const userStore = defineStore('userStore', {
  state() {
    return defaultState() as UserStateType;
  },

  actions: {
    setRoute(path) {
      this.currentRoute = path
    },
    loginOut() {
      this.$state = defaultState();
      router.push("/login");
      resetRoutes();

    },
    async login(userInfo) {
      try {
        let res = await loginApi(userInfo);
        this.token = res.data;
        router.push("/dashboard/index");
        this.online = true;
      } catch (error) {
        console.error(error);
        this.loginOut()
      }
    },
    async getInfo() {
      try {
        let res = await getInfoApi();
        this.userInfo = res.data;

      } catch (error) {
        console.error(error);
      }
    },
  },
  persist: true,
})
export function getUserStore() {
  return userStore(store);
}