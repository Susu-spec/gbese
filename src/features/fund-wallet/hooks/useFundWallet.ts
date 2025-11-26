import api from "@/lib/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { AxiosError, type AxiosResponse } from "axios";
import { handleApiError } from "@/lib/utils";
import type {
  WalletBalance,
  WalletTransaction,
  FundWalletPayload,
  FundWalletResponse,
} from "../types";

export function useFundWallet() {
  const queryClient = useQueryClient();

  // Fetch wallet balance
  const balance = useQuery<WalletBalance>({
    queryKey: ["wallet", "balance"],
    queryFn: async () => {
      const response = await api.get<WalletBalance>("/wallet/balance");
      return response.data;
    },
  });

  // Fetch wallet transactions
  const transactions = useQuery<WalletTransaction[]>({
    queryKey: ["wallet", "transactions"],
    queryFn: async () => {
      const response = await api.get<WalletTransaction[]>("/wallet/transactions");
      return response.data;
    },
  });

  // Fund wallet mutation
  const fundWallet = useMutation<
    AxiosResponse<FundWalletResponse>,
    AxiosError,
    FundWalletPayload
  >({
    mutationFn: (data) => api.post("/wallet/fund", data),
    onSuccess: () => {
      toast.success("Wallet funded successfully!");
      // Invalidate and refetch wallet data
      queryClient.invalidateQueries({ queryKey: ["wallet", "balance"] });
      queryClient.invalidateQueries({ queryKey: ["wallet", "transactions"] });
    },
    onError: (error: AxiosError) => handleApiError(error),
  });

  return {
    balance,
    transactions,
    fundWallet,
  };
}
