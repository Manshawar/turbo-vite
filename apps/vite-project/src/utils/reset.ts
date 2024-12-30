import { getUserStore } from "@/store/modules/user";
import { getRouterStore } from "@/store/modules/router";
export function reset () {
  const { loginOut } = getUserStore();
  loginOut()
}