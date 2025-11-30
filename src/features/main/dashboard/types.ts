import type { User } from "@/utils/types";

export interface GetUserResponse {
    success: boolean;
    data: User;
}

export interface AccountData{
    account_number?: string;
    current_balance?: string;
    credit_limit?: string;
    total_debt_obligation?: string;
    pending_transfers_out?: string;
    pending_transfers_in?: string;
    available_credit?: number;
    currency?: string;
    account_type?: string;
    daily_transfer_limit?: string;
    daily_transfers_used?: string;
    daily_transfers_remaining?: number;
}
export interface GetAccountResponse {
    success: boolean;
    data: AccountData;
}

export interface Transactions{
    transactions: TransactionData[]
}

export interface TransactionData{
    id: string;
    reference_number: string;
    type: string;
    amount: string;
    fee: string;
    status: string;
    description: string;
    sender: string;
    recipient: string[];
    initiated_at: string;
    completed_at: string;
}

export interface Debt {
  id: string;
  obligation_number: string;
  current_holder_id: string;
  original_creditor_id: string;
  original_borrower_id: string;
  principal_amount: string;
  remaining_balance: string;
  interest_rate: string;
  monthly_payment: string;
  status: 'active' | 'paid_off' | 'defaulted' | 'transferred';
  due_date: string;
  next_payment_date: string;
  is_transferable: boolean;
  transfer_count: number;
  max_transfer_count: number;
  days_overdue: number;
  created_at: string;
  updated_at: string;
  transferred_at: string | null;
  paid_off_at: string | null;
}

export interface Sender {
  first_name: string;
  last_name: string;
}

export interface Recipient{
  first_name: string;
  last_name: string;
}

export interface DebtRequest {
  id: string;
  sender_id: string;
  recipient_id: string;
  debt_id: string;
  request_number: string;
  incentive_amount: string | null;
  incentive_percentage: number | null;
  transfer_type: 'direct' | 'auction' | 'split';
  status: 'pending' | 'accepted' | 'rejected' | 'cancelled';
  notes: string | null;
  rejection_reason: string | null;
  created_at: string;
  accepted_at: string | null;
  rejected_at: string | null;
  cancelled_at: string | null;
  expires_at: string;
  sender: Sender;
  debt: Debt;
  recipient: Recipient;
}