import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { AxiosError, type AxiosResponse } from "axios";
import { handleApiError } from "@/lib/utils";
import type { FundWalletPayload, FundWalletResponse } from "../types";
import { depositFunds, fundAndPayDebts, type SelectedDebt } from "../services";
import { invalidateAfterPayment } from "@/lib/query-utils";

export interface FundWalletWithDebtsPayload extends FundWalletPayload {
  debts?: SelectedDebt[];
}

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

  // Combined fund wallet and pay debts mutation
  const fundWalletAndPayDebts = useMutation<
    { fundingResponse: AxiosResponse<FundWalletResponse>; debtResponses: any[] },
    AxiosError,
    FundWalletWithDebtsPayload
  >({
    mutationFn: async ({ debts, ...fundingPayload }) => {
      if (!debts || debts.length === 0) {
        const fundingResponse = await depositFunds(fundingPayload);
        return { fundingResponse, debtResponses: [] };
      }
      return fundAndPayDebts(fundingPayload, debts);
    },
    onSuccess: async (data) => {
      const debtCount = data.debtResponses.length;
      if (debtCount > 0) {
        toast.success(
          `Wallet funded and ${debtCount} debt${debtCount > 1 ? "s" : ""} paid successfully!`
        );
        await invalidateAfterPayment(queryClient);
      } else {
        toast.success("Wallet funded successfully!");
      }
      // Invalidate wallet and transaction data
      queryClient.invalidateQueries({ queryKey: ["account", "balance"] });
      queryClient.invalidateQueries({ queryKey: ["userTransactions"] });
    },
    onError: (error: AxiosError) => handleApiError(error),
  });

  return { fundWallet, fundWalletAndPayDebts };
}
