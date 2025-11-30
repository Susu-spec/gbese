import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getActiveDebts, getDebtMatch, getTransferredDebts } from "./services";
import { toast } from "sonner";
import type { AxiosError } from "axios";
import api from "@/lib/axios";
import type { PayDebtPayLoad, TransferDebtPayload } from "../types";

export function useDebt(){

    const acticeDebtsQuery = useQuery({
        queryKey: ["activeDebts"],
        queryFn: getActiveDebts,
        staleTime: 1000 * 60 * 5,
    });

    const transferredDebtsQuery = useQuery({
        queryKey: ["transferredDebts"],
        queryFn: getTransferredDebts,
        staleTime: 1000 * 60 * 5,
    });

    const debtMatchQuery = useQuery({
        queryKey: ["debtMatch"],
        queryFn: getDebtMatch,
        staleTime: 1000 * 60 * 5,
    });

    return {acticeDebtsQuery, transferredDebtsQuery, debtMatchQuery};
}

export function useTransferDebt() {

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: TransferDebtPayload) => {
      const res = await api.post("/dtp/transfer", payload);
      return res.data;
    },

    onSuccess: () => {
      toast.success("Debt transferred successfully!");
      
      // Update all affected queries
      queryClient.invalidateQueries({ queryKey: ["debtMatch"] });
      queryClient.invalidateQueries({ queryKey: ["activeDebts"] });
      queryClient.invalidateQueries({ queryKey: ["transferredDebts"] });
      queryClient.invalidateQueries({ queryKey: ["account", "balance"] });
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      queryClient.invalidateQueries({ queryKey: ["userTransactions"] });
    },

    onError: (error: AxiosError<any>) => {
      const message =
        error.response?.data?.message || "Failed to transfer debt.";
      toast.error(message);
    }
  });
}

export function usePayDebt() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (payload: PayDebtPayLoad) => {
            const res = await api.post(`/debt/repay`, payload);
            return res.data;
        },
        onSuccess: () => {
            toast.success("Payment successful!");
            queryClient.invalidateQueries({ queryKey: ["activeDebts"] });
        }
        ,
        onError: (error: AxiosError<any>) => {
            const message = error.response?.data?.message || "Failed to make payment.";
            toast.error(message);
        }
    });
}