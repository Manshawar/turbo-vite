import axios from "axios";
export function getAsyncRoute () {
  return axios.get("/menu/asyncRoutes.json")
}