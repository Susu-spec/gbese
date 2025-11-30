import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { AxiosError, type AxiosResponse } from "axios";
import { handleApiError } from "@/lib/utils";
import type {
  IncomingDebtRequestsResponse,
  RejectRequestPayload,
  PaymentResponse,
} from "./types";
import {
  getIncomingDebtRequests,
  acceptDebtRequest,
  rejectDebtRequest,
  makePayment,
} from "./services";

export function useDebtRequests() {
  const queryClient = useQueryClient();

  // Fetch incoming debt requests
  const requestsQuery = useQuery<IncomingDebtRequestsResponse, AxiosError>({
    queryKey: ["debtRequests", "incoming"],
    queryFn: getIncomingDebtRequests,
    staleTime: 1000 * 60 * 5,
  });

  // Accept request mutation
  const acceptRequest = useMutation<
    AxiosResponse<PaymentResponse>,
    AxiosError,
    string
  >({
    mutationFn: acceptDebtRequest,
    onSuccess: () => {
      toast.success("Request accepted successfully!");
      queryClient.invalidateQueries({ queryKey: ["debtRequests", "incoming"] });
    },
    onError: (error: AxiosError) => handleApiError(error),
  });

  // Reject request mutation
  const rejectRequest = useMutation<
    AxiosResponse<PaymentResponse>,
    AxiosError,
    RejectRequestPayload
  >({
    mutationFn: rejectDebtRequest,
    onSuccess: () => {
      toast.success("Request rejected successfully!");
      queryClient.invalidateQueries({ queryKey: ["debtRequests", "incoming"] });
    },
    onError: (error: AxiosError) => handleApiError(error),
  });

  // Make payment mutation
  const payRequest = useMutation<
    AxiosResponse<PaymentResponse>,
    AxiosError,
    { recipientAccountNumber: string; amount: number; description: string; metadata?: Record<string, unknown> }
  >({
    mutationFn: ({ recipientAccountNumber, amount, description, metadata }) =>
      makePayment(recipientAccountNumber, amount, description, metadata),
    onSuccess: () => {
      toast.success("Payment successful!");
      queryClient.invalidateQueries({ queryKey: ["debtRequests", "incoming"] });
      queryClient.invalidateQueries({ queryKey: ["account", "balance"] });
      queryClient.invalidateQueries({ queryKey: ["userTransactions"] });
    },
    onError: (error: AxiosError) => handleApiError(error),
  });

  return {
    requestsQuery,
    acceptRequest,
    rejectRequest,
    payRequest,
  };
}
