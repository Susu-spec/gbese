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

export interface WithdrawFundsValue {
  amount: string,
  bankName: string,
  bankCode: string,
  accountNumber: string,
  reason?: string
} 


export interface NotificationProps {
  id?: string;
  type?: string;
  title?: string;
  message?: string;
  created_at?: string;
  is_read?: boolean;
}