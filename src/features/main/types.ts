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