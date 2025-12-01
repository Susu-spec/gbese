import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ApplyLoanPayload, CreditProvider } from "../types";
import { getCreditProviders } from "./services";
import api from "@/lib/axios";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import type { AxiosError } from "axios";
import { invalidateAfterCreditApplication } from "@/lib/query-utils";

export function useCreditProviders() {
    return useQuery<CreditProvider[]>({
        queryKey: ["credit-providers"],
        queryFn: getCreditProviders
    })
}


export function useApplyLoan() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: ApplyLoanPayload) => {
      const res = await api.post("/credit/apply", payload);
      return res.data;
    },

    onSuccess: async () => {
      toast.success("Loan applied successfully! Redirecting...");
      await invalidateAfterCreditApplication(queryClient);
      navigate("/credit-options");
    },

    onError: (error: AxiosError<any>) => {
      const message =
        error.response?.data?.message || "Failed to apply for loan.";
      toast.error(message);
    }
  });
}