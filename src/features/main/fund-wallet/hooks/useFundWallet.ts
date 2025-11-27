import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { AxiosError, type AxiosResponse } from "axios";
import { handleApiError } from "@/lib/utils";
import type { FundWalletPayload, FundWalletResponse } from "../types";
import { depositFunds } from "../services";

export function useFundWallet() {
  const queryClient = useQueryClient();

  // Fund wallet mutation
  const fundWallet = useMutation<
    AxiosResponse<FundWalletResponse>,
    AxiosError,
    FundWalletPayload
  >({
    mutationFn: depositFunds,
    onSuccess: () => {
      toast.success("Wallet funded successfully!");
      // Invalidate and refetch centralized data
      queryClient.invalidateQueries({ queryKey: ["account", "balance"] });
      queryClient.invalidateQueries({ queryKey: ["userTransactions"] });
    },
    onError: (error: AxiosError) => handleApiError(error),
  });

  return { fundWallet };
}
