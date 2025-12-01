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

export interface RawIncomingDebtRequest {
  id: string;
  sender_id: string;
  status: string;
  notes: string | null;
  created_at: string;
  debt: {
    remaining_balance?: string; // numeric string
    principal_amount?: string; // numeric string
    due_date?: string; // ISO date
  };
  sender?: {
    first_name?: string;
    last_name?: string;
  };
}

export interface RawIncomingDebtRequestsResponse {
  success: boolean;
  data: RawIncomingDebtRequest[];
}

// Helper to convert raw API debt request into UI DebtRequest type
export function mapRawIncomingDebtRequest(raw: RawIncomingDebtRequest): DebtRequest {
  const requesterName = [raw.sender?.first_name, raw.sender?.last_name].filter(Boolean).join(" ") || "Unknown";
  const amountNumber = Number(raw.debt?.remaining_balance ?? raw.debt?.principal_amount ?? 0);
  return {
    id: raw.id,
    requester_name: requesterName,
    requester_id: raw.sender_id,
    requester_account_number: "", // Not supplied
    amount: isNaN(amountNumber) ? 0 : amountNumber,
    narration: (raw.notes && raw.notes.trim().length > 0) ? raw.notes : "",
    due_date: raw.debt?.due_date || "",
    status: (raw.status as DebtRequest["status"]) || "pending",
    created_at: raw.created_at,
  };
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
