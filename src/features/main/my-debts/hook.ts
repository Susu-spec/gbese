import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getActiveDebts, getDebtMatch, getTransferredDebts } from "./services";
import { toast } from "sonner";
import type { AxiosError } from "axios";
import api from "@/lib/axios";
import type { PayDebtPayLoad, TransferDebtPayload } from "../types";
import { invalidateAfterTransferDebt, invalidateAfterPayment } from "@/lib/query-utils";

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

export function useTransferDebt(onSuccessCallback?: () => void) {

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: TransferDebtPayload) => {
      const res = await api.post("/dtp/transfer", payload);
      return res.data;
    },

    onSuccess: async () => {
      toast.success("Debt transferred successfully!");
      await invalidateAfterTransferDebt(queryClient);
      
      // Call the optional callback (for navigation)
      if (onSuccessCallback) {
        onSuccessCallback();
      }
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
        onSuccess: async () => {
            toast.success("Payment successful!");
            await invalidateAfterPayment(queryClient);
        }
        ,
        onError: (error: AxiosError<any>) => {
            const message = error.response?.data?.message || "Failed to make payment.";
            toast.error(message);
        }
    });
}