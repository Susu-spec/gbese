import { clearUser } from "@/features/auth/authSlice";
import { resetKyc } from "@/features/kyc/kycSlice";
import store, { resetStore } from "@/store/store";
import axios from "axios";
import  type { AxiosInstance } from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL

const api: AxiosInstance = axios.create({
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
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            sessionStorage.setItem("expired", "1");
            store.dispatch(resetKyc())
            store.dispatch(clearUser());
            resetStore();
            window.location.href = "/sign-in";
        }

        return Promise.reject(error);
    }
);


// TODO: Set up refresh call here
export default api;