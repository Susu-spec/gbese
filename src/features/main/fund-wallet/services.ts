import api from "@/lib/axios";
import type { AxiosResponse } from "axios";
import type { FundWalletPayload, FundWalletResponse } from "./types";

export interface SelectedDebt {
  obligation_id: string;
  amount: number;
}

export interface DebtRepaymentResponse {
  transaction_id: string;
  reference_number: string;
  amount: number;
  remaining_debt: number;
  status: string;
  message: string;
}

export async function depositFunds(payload: FundWalletPayload): Promise<AxiosResponse<FundWalletResponse>> {
  return api.post<FundWalletResponse>("/funding/deposit", payload);
}

export async function repayDebt(payload: SelectedDebt): Promise<AxiosResponse<{ success: boolean; data: DebtRepaymentResponse; message: string }>> {
  return api.post("/debt/repay", payload);
}

// fund wallet and pay debts in sequence
export async function fundAndPayDebts(
  fundingPayload: FundWalletPayload,
  debts: SelectedDebt[]
): Promise<{
  fundingResponse: AxiosResponse<FundWalletResponse>;
  debtResponses: AxiosResponse<{ success: boolean; data: DebtRepaymentResponse; message: string }>[];
}> {
  const fundingResponse = await depositFunds(fundingPayload);
  // pay each selected debt
  const debtResponses = await Promise.all(
    debts.map((debt) => repayDebt(debt))
  );
  
  return { fundingResponse, debtResponses };
}
