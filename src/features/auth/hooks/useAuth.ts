import api from "@/lib/axios";
import { resetStore, useAppDispatch } from "@/store/store";
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
            const payload = response?.data;
            dispatch(setUser({
                user: payload.user,
                accessToken: payload.token,
                refreshToken: ""
            }));
            toast.info("Account created! Please sign in.")
            navigate("/sign-in");
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
            const payload = response?.data.data ?? response?.data;
            dispatch(setUser({
                user: payload.user,
                accessToken: payload.access_token,
                refreshToken: payload.refresh_token
            }));
            toast.info(`Welcome back, ${payload.user?.full_name}`)
            navigate("/dashboard")
        },
        onError: (error: AxiosError) => handleApiError(error)
    })

    const signOut = () => {
        dispatch(clearUser());
        queryClient.invalidateQueries();
        toast.success("You have been logged out successfuly. Redirecting to Sign in Page...")
        resetStore();
        navigate("/sign-in")
    }


    return {
        signUp,
        signIn,
        signOut
    }
}