import axios from "axios";
import { APP_CONFIG } from "@/shared/constants/appConfig";
import Cookies from "js-cookie";

import type {
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";
const apiClient = axios.create({
  baseURL: APP_CONFIG.API.BASE_URL,
  timeout: APP_CONFIG.API.TIMEOUT,
  headers: {
    "Content-Type": "application/json",
    'Accept':'application/json',
    "X-API-TOKEN" : APP_CONFIG.AUTH.APP_API_TOKEN
  },
});

apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = Cookies.get(APP_CONFIG.AUTH.TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
)
apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    config.headers["Accept-Language"] = Cookies.get("NEXT_LOCALE") || "fr";
    return config;
  }
);
/* 
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (!authService.checkAuthStatus()) {
      console.log("session expired");
      return Promise.reject("Session expired");
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
); */

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {

    }
    return Promise.reject(error);
  }
);

export default apiClient;
