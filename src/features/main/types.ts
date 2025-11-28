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

export interface TransactionDataType {
  id: string,
  reference_number: string,
  recipient: {
    name: string,
    account_number: string
  },
  type: string,
  sender: {
    name: string,
    account_number: string
  },
  status: string,
  description: string,
  completed_at: string,
  amount: string,
  action: string
}