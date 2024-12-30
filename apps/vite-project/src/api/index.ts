
import Request from "@/utils/request";
const request = new Request({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
}).axiosInstance;
const serve = new Request({ baseURL: "http://localhost:3000/" }).axiosInstance;
export { request, serve }