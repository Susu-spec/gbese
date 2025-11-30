export interface DebtRequest {
  id: string;
  requester_name: string;
  requester_id: string;
  requester_account_number: string;
  amount: number;
  narration: string;
  due_date: string;
  status: "pending" | "accepted" | "rejected" | "paid";
  created_at: string;
}

export interface IncomingDebtRequestsResponse {
  success: boolean;
  data: DebtRequest[];
}

export interface AcceptRequestPayload {
  request_id: string;
}

export interface RejectRequestPayload {
  request_id: string;
  reason: string;
}

export interface TransferPayload {
  recipient_account_number: string;
  amount: number;
  description: string;
  metadata?: Record<string, unknown>;
}

export interface PaymentResponse {
  success: boolean;
  message: string;
  data?: {
    transaction_id: string;
    new_balance: number;
  };
}

export type PaymentMethod = "wallet" | "credit";
