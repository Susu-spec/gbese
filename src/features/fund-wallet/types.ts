export interface WalletBalance {
  amount: number;
  currency: string;
}

export interface WalletTransaction {
  id: string;
  date: string; // ISO date string
  amount: number;
  status: "pending" | "successful" | "rejected";
  method: string; // Bank | Card | Gbese Pay
}

export interface FundWalletPayload {
  amount: number;
  method: string;
}

export interface FundWalletResponse {
  success: boolean;
  data: {
    transaction_id: string;
    new_balance: number;
  };
}
