import store from "@/store/store";
import axios from "axios";
import  type { AxiosInstance } from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL

export const api: AxiosInstance = axios.create({
    baseURL: API_BASE,
    timeout: 15000,
    headers: { "Content-Type": "application/json" },
    withCredentials: true
});


api.interceptors.request.use(
    (config) => {
        const state = store.getState();
        const token = state.auth.accessToken;
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`
        }

        return config;
    },
    (error) => Promise.reject(error)
)

// Set up refresh call here
export default api;