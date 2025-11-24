import api from "@/lib/axios";
import { useAppDispatch } from "@/store/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { clearUser, setUser } from "../authSlice";
import { toast } from "sonner";
import { AxiosError } from "axios";
import type {  AxiosResponse } from "axios";
import { useNavigate } from "react-router";
import { handleApiError } from "@/lib/utils";
import type { SignInPayload, SignInResponse, SignUpPayload, SignUpResponse } from "../types";

export function useAuth() {
    const dispatch = useAppDispatch();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const signUp = useMutation<
        AxiosResponse<SignUpResponse>,
        AxiosError,
        SignUpPayload>
    ({
        mutationFn: (data) => api.post("/auth/register", data),
        onSuccess: (response) => {
            dispatch(setUser(response.data.user));
            localStorage.setItem("token", response.data.token)
            toast.info("You've successfully signed up! Welcome to Gbese")
            navigate("/dashboard");
        },
        onError: (error: AxiosError) => handleApiError(error)
    });

    const signIn = useMutation<
        AxiosResponse<SignInResponse>,
        AxiosError,
        SignInPayload
    >({
        mutationFn: (data) => api.post("/auth/login", data),
        onSuccess: (response) => {
            const { data } = response;
            dispatch(setUser(data.data.user));
            localStorage.setItem("access_token", data.data.access_token)
            localStorage.setItem("refresh_token", data.data.refresh_token)
            toast.info(`Welcome back, ${data.data.user?.full_name}`)
            navigate("/dashboard")
        },
        onError: (error: AxiosError) => handleApiError(error)
    })


    const signOut = useMutation({
        mutationFn: () => api.post("/auth/signout"),
        onSuccess: () => {
            dispatch(clearUser());
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            queryClient.invalidateQueries();
        },
        onError: (response) => {
            if (response.message) {
                toast.error(response.message)
            }
        }
    });


    return {
        signUp,
        signIn,
        signOut
    }
}