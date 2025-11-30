import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import type { AxiosError, AxiosResponse } from "axios";

export default function useTransactionDetail(transactionId: string) {
    return useQuery<AxiosResponse, AxiosError>({
        queryKey: ["transactionDetail", transactionId],
        queryFn: () => api.get(`/account/transactions/${transactionId}`),
        enabled: false,
    })
}