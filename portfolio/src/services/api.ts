import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useAuthStore } from "@/stores/auth";

const API_BASE_URL = import.meta.env.VITE_APP_BASE_API_URL;

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
});

api.interceptors.request.use(async (config: any) => {
    const authStore = useAuthStore();
    let token = localStorage.getItem("access_token");

    if (token) {
        const decoded: any = jwtDecode(token);
        if (decoded.exp && decoded.exp * 1000 < Date.now()) {
            try {
                const { data } = await axios.post(`${API_BASE_URL}/auth/refresh`, {}, { withCredentials: true });
                token = data.access_token;
                if (token) {
                localStorage.setItem("access_token", token);
                authStore.isAuthenticated = true;
                authStore.user = decoded.user;
                }
            } catch (error) {
                console.error("Erreur lors du rafraîchissement du token :", error);
                authStore.logout();
                return Promise.reject(error);
            }
        }
        config.headers.authorization = `${token}`;
    }

    return config;
}, (error) => Promise.reject(error));

api.interceptors.response.use(
  (response) => response,
  (error) => {
      if (error.response?.status === 401) {
          const authStore = useAuthStore();
          authStore.logout();
      }
      return Promise.reject(error);
  }
);

export default api;
