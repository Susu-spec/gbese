import api from "@/lib/axios";
import { useAppDispatch } from "@/store/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { clearUser, setUser } from "../authSlice";
import { toast } from "sonner";
import { AxiosError } from "axios";
import type {  AxiosResponse } from "axios";
import type { User } from "@/utils/types";

interface SignUpInterface {
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    phone_number: string
}

interface SignUpResponse {
  user: User;
  token: string;
}

interface SignInInterface {
    email: string,
    password: string
}

interface SignInResponse {
    
}

export function useAuth() {
    const dispatch = useAppDispatch();
    const queryClient = useQueryClient();

    const signUp = useMutation<
        AxiosResponse<SignUpResponse>,
        AxiosError,
        SignUpInterface>
    ({
        mutationFn: (data) => api.post("/auth/register", data),
        onSuccess: (response) => {
            dispatch(setUser(response.data.user));
            localStorage.setItem("token", response.data.token)
            toast.info("You've successfully signed up! Welcome to Gbese")
        },
        onError: (error: AxiosError) => {
            if (error.message) {
                toast.error(error.message)
            }
        }
    });

    const signIn = useMutation({
        mutationFn: (data) => api.post("/auth/login", data),
        onSuccess: (response) => {
            dispatch(setUser(response.data.user));
            localStorage.setItem("token", response.data.token)
            toast.info(`Welcome back, ${response.data.user?.name}`)
        },
        onError: (error) => {
            if (error.message) {
                toast.error(error.message)
            }
        }
    })


    const signOut = useMutation({
        mutationFn: () => api.post("/auth/signout"),
        onSuccess: () => {
            dispatch(clearUser());
            localStorage.removeItem("token");
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