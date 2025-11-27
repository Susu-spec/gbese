import api from "@/lib/axios";
import type { AxiosResponse } from "axios";
import type { FundWalletPayload, FundWalletResponse } from "./types";

// Service: deposit funds into wallet
export async function depositFunds(payload: FundWalletPayload): Promise<AxiosResponse<FundWalletResponse>> {
  return api.post<FundWalletResponse>("/funding/deposit", payload);
}
