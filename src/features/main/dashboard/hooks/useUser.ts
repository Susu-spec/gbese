import api from "@/lib/axios";
import { useAppDispatch } from "@/store/store";
import { useQuery } from "@tanstack/react-query";
import { setAccount, setUser } from "../userSlice";
import { AxiosError, type AxiosResponse } from "axios";
import type { GetAccountResponse, GetUserResponse } from "../types";
import { handleApiError } from "@/lib/utils";
import { useEffect } from "react";

export function useUser() {
  const dispatch = useAppDispatch();

  // User query
  const userQuery = useQuery<GetUserResponse, AxiosError>({
    queryKey: ["userProfile"],
    queryFn: async (): Promise<GetUserResponse> => {
      const { data } = await api.get<GetUserResponse>("/user/profile");
      return data;
    },
    staleTime: 1000 * 60 * 5,
  });

  // Account query
  const accountQuery = useQuery<GetAccountResponse, AxiosError>({
    queryKey: ["userAccount"],
    queryFn: async (): Promise<GetAccountResponse> => {
      const { data } = await api.get<GetAccountResponse>("/account/balance");
      return data;
    },
    staleTime: 1000 * 60 * 5,
  });

  const transactionQuery = useQuery<AxiosResponse, AxiosError>({
    queryKey: ["userTransactions"],
    queryFn: async (): Promise<AxiosResponse> => {
        const {data} = await api.get<AxiosResponse>("/account/transactions");
        return data;
    },
    staleTime: 1000 * 60 * 5,
  })

  // Handle side effects with useEffect
  useEffect(() => {
    if (userQuery.data) {
      dispatch(setUser(userQuery.data.data));
    }
  }, [userQuery.data, dispatch]);

  useEffect(() => {
    if (accountQuery.data) {
      dispatch(setAccount(accountQuery.data.data));
    }
  }, [accountQuery.data, dispatch]);

  // Handle errors
  useEffect(() => {
    if (userQuery.error) {
      handleApiError(userQuery.error);
    }
  }, [userQuery.error]);

  useEffect(() => {
    if (accountQuery.error) {
      handleApiError(accountQuery.error);
    }
  }, [accountQuery.error]);

  useEffect(() => {
    if (transactionQuery.error) {
        handleApiError(transactionQuery.error);
    }
  }, [transactionQuery.error])

  return { userQuery, accountQuery, transactionQuery };
}