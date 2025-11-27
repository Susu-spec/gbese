import api from "@/lib/axios";
import type { GetAccountResponse } from "@/features/main/dashboard/types";

export async function getAccountBalance() {
  const { data } = await api.get<GetAccountResponse>("/account/balance");
  return data;
}
