//axios

import axios from "axios";

//baseURL
axios.defaults.baseURL = "http://127.0.0.1:8086/";
//拦截器
// 添加请求拦截器
axios.interceptors.request.use(
  function(config) {
    // console.log(config);
    if (config.url !== "users/login" && config.url !== "homes/swipe") {
      // 在发送请求之前做些什么
      //发请求之前设置授权的头部的token
      const AUTH_TOKEN = localStorage.getItem("token");
      //统一设置所有的头部
      // axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
      config.headers["Authorization"] = AUTH_TOKEN;
      return config;
    } else {
      return config;
    }
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
axios.interceptors.response.use(
  function(response) {
    // 对响应数据做点什么
    return response.data;
  },
  function(error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export default axios;
