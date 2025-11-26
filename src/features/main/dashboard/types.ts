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