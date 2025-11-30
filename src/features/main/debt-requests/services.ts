import api from "@/lib/axios";
import type { AxiosResponse } from "axios";
import type {
  IncomingDebtRequestsResponse,
  RejectRequestPayload,
  PaymentResponse,
} from "./types";

export async function getIncomingDebtRequests() {
  const { data } = await api.get<IncomingDebtRequestsResponse>("/dtp/requests/incoming");
  return data;
}

export async function acceptDebtRequest(requestId: string): Promise<AxiosResponse<PaymentResponse>> {
  return await api.post<PaymentResponse>(`/dtp/request/${requestId}/accept`);
}

export async function rejectDebtRequest(payload: RejectRequestPayload): Promise<AxiosResponse<PaymentResponse>> {
  const { request_id, reason } = payload;
  return await api.post<PaymentResponse>(`/dtp/request/${request_id}/reject`, { reason });
}

export async function makePayment(
  recipientAccountNumber: string,
  amount: number,
  description: string,
  metadata?: Record<string, unknown>
): Promise<AxiosResponse<PaymentResponse>> {
  return await api.post<PaymentResponse>("/transfer/gbese", {
    recipient_account_number: recipientAccountNumber,
    amount,
    description,
    metadata: metadata || {},
  });
}
