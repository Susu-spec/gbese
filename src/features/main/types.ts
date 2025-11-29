export interface CreditProvider {
  id: string;
  name: string;
  defaultInterestRate: string;
  minLoanAmount: string;
  maxLoanAmount: string;
  maxTenureMonths: number;
  endpointUrl: string;
}

export interface ApplyLoanPayload {
  provider_id: string;
  amount: number;
  tenure_months: number;
  purpose: string;
}


export interface DebtObligation {
  id: string;
  lender: string;
  principal_amount: string;
  remaining_balance: string;
  due_date: string;
  status: "active" | "paid" | "defaulted";
  interest_rate: string;
}

export interface DebtMatch {
  user_id: string;
  name: string;
  available_credit: number;
}

export interface TransferDebtPayload {
  obligation_id: string;
  recipient_id: string;
  incentive_amount: number;
  transfer_type: string
}

export interface PayDebtPayLoad {
  obligation_id: string;
  amount: number;
}