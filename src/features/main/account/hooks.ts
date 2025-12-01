import { useEffect } from "react";
import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { useAppDispatch } from "@/store/store";
import { setAccount } from "@/features/main/dashboard/userSlice";
import { getAccountBalance } from "./services";
import type { AxiosError } from "axios";
import type { GetAccountResponse } from "@/features/main/dashboard/types";
import { handleApiError } from "@/lib/utils";

export function useAccountBalance(options?: Partial<UseQueryOptions<GetAccountResponse, AxiosError>>) {
  const dispatch = useAppDispatch();

  const query = useQuery<GetAccountResponse, AxiosError>({
    queryKey: ["account", "balance"],
    queryFn: getAccountBalance,
    staleTime: 1000 * 60 * 5,
    ...options,
  });

  useEffect(() => {
    if (query.data?.data) {
      dispatch(setAccount(query.data.data));
    }
  }, [query.data, dispatch]);

  useEffect(() => {
    if (query.error) {
      handleApiError(query.error);
    }
  }, [query.error]);

  return query;
}
