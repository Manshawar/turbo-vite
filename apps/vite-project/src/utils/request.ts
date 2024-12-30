import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { getToken } from "./js-cookie";
import { ElMessage } from "element-plus";
const hidenMsg = ["/adminUser/profile", "/adminUser/login"]
class Request {
  axiosInstance: AxiosInstance;
  config: AxiosRequestConfig;
  constructor(config?: AxiosRequestConfig) {
    this.config = config;
    this.axiosInstance = axios.create(this.config);
    this.requestInterceptors();
    this.responseInterceptors();
  }
  requestInterceptors() {
    this.axiosInstance.interceptors.request.use(
      config => {
        const token = getToken("token");

        if (token) {
          config.headers.token = `${token}`; // 使用标准的 Bearer 认证方式
        }
        return config;
      },
      error => {
        console.error("请求错误：", error);
        return Promise.reject(error);
      }
    );
  }
  responseInterceptors() {
    this.axiosInstance.interceptors.response.use(
      response => {
        const { resultCode: code, message, hideMsg } = response.data;

        if (code !== 200) {
          ElMessage.error(message);
        } else {
          if (message && !hidenMsg.includes(response.config.url) && !hideMsg) {
            ElMessage.success(message)
          }
        }

        return response.data;
      },
      error => {
        if (error.response) {
          ElMessage.error(`请求错误：${error.response.status}`);
        } else {
          ElMessage.error("网络错误，请检查您的网络连接");
        }
        console.error("响应错误：", error);
        return Promise.reject(error);
      })

  }
}

export default Request



