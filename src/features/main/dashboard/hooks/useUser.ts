import api from "@/lib/axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { setAccount, setUser } from "../userSlice";
import type { GetUserResponse } from "../types";
import { handleApiError } from "@/lib/utils";
import { useEffect } from "react";
import { useAccountBalance } from "@/features/main/account/hooks";
import { useAppDispatch } from "@/store/store";
import { toast } from "sonner";
import type { AxiosError } from "axios";

export function useUser() {
    const dispatch = useAppDispatch();
  const userQuery = useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => {
      const { data } = await api.get<GetUserResponse>("/user/profile");
      return data;
    },
    staleTime: 1000 * 60 * 5,
  });

  // Account balance (centralized hook keeps Redux in sync)
  const accountQuery = useAccountBalance();

  const transactionQuery = useQuery({
    queryKey: ["userTransactions"],
    queryFn: async () => {
      const { data } = await api.get("/account/transactions");
      return data;
    },
    staleTime: 1000 * 60 * 5,
  });

  const debtReqQuery = useQuery({
    queryKey: ["debtRequests"],
    queryFn: async () => {
        const { data } = await api.get("/dtp/requests/incoming")
        return data ;
    },
    staleTime: 1000 * 60 * 5,
  })

  // Sync user data to Redux - INSIDE useEffect
  useEffect(() => {
    if (userQuery.isSuccess && userQuery.data) {
      dispatch(setUser(userQuery.data.data));
    }
    if (userQuery.isError && userQuery.error) {
      handleApiError(userQuery.error);
    }
  }, [userQuery.isSuccess, userQuery.data, userQuery.isError, userQuery.error, dispatch]);

  // Sync account data to Redux - INSIDE useEffect
  useEffect(() => {
    if (accountQuery.isSuccess && accountQuery.data) {
      dispatch(setAccount(accountQuery.data.data));
    }
    if (accountQuery.isError && accountQuery.error) {
      handleApiError(accountQuery.error);
    }
  }, [accountQuery.isSuccess, accountQuery.data, accountQuery.isError, accountQuery.error, dispatch]);

  return { userQuery, accountQuery, transactionQuery, debtReqQuery };
}


export function useDebtReq(){
  const rejectReq = useMutation({
    mutationFn: async (request_id: string) => {
      const { data } = await api.post(`/dtp/requests/${request_id}/reject`);
      return data;
    },
    onSuccess: () => {
      toast.success("Debt Request Rejected");
    },

    onError: (error: AxiosError<any>) => {
      const message =
        error.response?.data?.message || "Failed to apply for loan.";
      toast.error(message);
    }
  })

  const acceptReq = useMutation({
    mutationFn: async (request_id: string) => {
      const { data } = await api.post(`/dtp/requests/${request_id}/accept`);
      return data;
    },
    onSuccess: () => {
      toast.success("Debt Request Accepted");
    },
    onError: (error: AxiosError<any>) => {
      const message =
        error.response?.data?.message || "Failed to apply for loan.";
      toast.error(message);
    }

  })
  return {rejectReq, acceptReq}
}