import axios from "axios";
import qs from "qs";
import { ElMessageBox } from 'element-plus';

// 默认的 axios 实例（用于非代理请求）
const defaultAxios = axios.create({
  baseURL: 'http://localhost:9091/', // 本地测试地址
  timeout: 10000,
  headers: {
    post: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
  },
});

// 代理专用的 axios 实例
const proxyAxios = axios.create({
  baseURL: '/api', // 代理前缀
  timeout: 10000,
  headers: {
    post: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
  },
});

// 请求拦截器
const setupInterceptors = (instance) => {
  instance.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => {
      if (response.status === 200) {
        return Promise.resolve(response);
      } else {
        return Promise.reject(response);
      }
    },
    (error) => {
      ElMessageBox(JSON.stringify(error), '请求异常', {
        confirmButtonText: '确定',
        callback: (action) => {},
      });
      return Promise.reject(error);
    }
  );
};

// 为两个实例设置拦截器
setupInterceptors(defaultAxios);
setupInterceptors(proxyAxios);

// 导出两个实例
export { defaultAxios, proxyAxios };