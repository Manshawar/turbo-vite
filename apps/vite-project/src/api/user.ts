import { request, serve } from "./index";
export function login(data) {
  return request("/adminUser/login", {
    method: "post",
    data: data,
  });
}
export function getInfo() {
  return serve("/user/userInfo", {
    method: "get",
  });
}
