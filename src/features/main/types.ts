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
