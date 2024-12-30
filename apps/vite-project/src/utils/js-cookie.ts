import Cookies from "js-cookie";

export function getToken(TokenKey) {
  return Cookies.get(TokenKey);
}
export function setToken(TokenKey, cookieString) {
  Cookies.set(TokenKey, cookieString, { expires: 30 });
}
