import api from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";

export function useWithdraw() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (payload: any) => {
            const res = await api.post("/funding/withdrawal", payload);
            return res.data;
        },

        onSuccess: async () => {
            toast.success("Funds withdrawn successfully!");
            queryClient.invalidateQueries({ queryKey: ["balance"] })
        },

        onError: (error: AxiosError<any>) => {
            const message =
                error.response?.data?.message || "Failed to apply for loan.";
            toast.error(message);
        }
    })
}