/* import { authService } from "@/features/auth/services/authService";
import apiClient  from "@/shared/utils/apiClient";
import type {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";
import { cookieManager } from "@/shared/utils/cookieManager";
import { APP_CONFIG } from "../constants/appConfig";

apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = await cookieManager.get(APP_CONFIG.AUTH.TOKEN_KEY);
    console.log("Token:", token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (!authService.checkAuthStatus()) {
      return Promise.reject("Session expired");
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      authService.handleSessionExpired();
    }
    return Promise.reject(error);
  }
);

/* // Response interceptor to handle auth errors
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      await cookieManager.remove(APP_CONFIG.AUTH.TOKEN_KEY);
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
); */
 