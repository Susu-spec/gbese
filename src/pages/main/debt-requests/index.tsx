import { useState } from "react";
import { useAccountBalance } from "@/features/main/account/hooks";
import { useDebtRequests } from "@/features/main/debt-requests/hooks";
import { BalanceCards } from "@/features/main/debt-requests/components/BalanceCards";
import { DebtRequestCard } from "@/features/main/debt-requests/components/DebtRequestCard";
import { DeclineModal } from "@/features/main/debt-requests/components/DeclineModal";
import { MakePaymentModal } from "@/features/main/debt-requests/components/MakePaymentModal";
import { EnterPinModal } from "@/features/main/debt-requests/components/EnterPinModal";
import { PaymentResultModal } from "@/features/main/debt-requests/components/PaymentResultModal";
import { EmptyDebtRequestsState } from "@/features/main/debt-requests/components/EmptyDebtRequestsState";
import { Skeleton } from "@/components/ui/skeleton";
import { parseBalance } from "@/lib/utils";
import type { DebtRequest, PaymentMethod } from "@/features/main/debt-requests/types";

export default function DebtRequestsPage() {
  const { data: accountData, isLoading: balanceLoading } = useAccountBalance();
  const { requestsQuery, acceptRequest, rejectRequest, payRequest } = useDebtRequests();

  const [declineModal, setDeclineModal] = useState<{ open: boolean; request: DebtRequest | null }>({
    open: false,
    request: null,
  });
  const [paymentModal, setPaymentModal] = useState<{ open: boolean; request: DebtRequest | null }>({
    open: false,
    request: null,
  });
  const [pinModal, setPinModal] = useState<{
    open: boolean;
    request: DebtRequest | null;
    method: PaymentMethod | null;
  }>({
    open: false,
    request: null,
    method: null,
  });
  const [resultModal, setResultModal] = useState<{ open: boolean; success: boolean; message?: string }>({
    open: false,
    success: false,
  });

  const account = accountData?.data;
  const walletBalance = parseBalance(account?.current_balance);
  const creditBalance = parseBalance(account?.available_credit);
  const requests = requestsQuery.data?.data || [];

  const handleAccept = (requestId: string) => {
    const request = requests.find((r) => r.id === requestId);
    if (request) {
      setPaymentModal({ open: true, request });
    }
  };

  const handleDecline = (requestId: string) => {
    const request = requests.find((r) => r.id === requestId);
    if (request) {
      setDeclineModal({ open: true, request });
    }
  };

  const handleConfirmDecline = (reason: string) => {
    if (declineModal.request) {
      rejectRequest.mutate(
        { request_id: declineModal.request.id, reason },
        {
          onSuccess: () => {
            setDeclineModal({ open: false, request: null });
            setResultModal({ open: true, success: true, message: "Request declined successfully." });
          },
        }
      );
    }
  };

  const handlePaymentMethodSelect = (method: PaymentMethod) => {
    if (paymentModal.request) {
      setPaymentModal({ open: false, request: null });
      setPinModal({ open: true, request: paymentModal.request, method });
    }
  };

  const handlePinConfirm = (pin: string) => {
    if (pinModal.request && pinModal.method) {
      payRequest.mutate(
        {
          recipientAccountNumber: pinModal.request.requester_id,
          amount: pinModal.request.amount,
          description: `Payment for: ${pinModal.request.narration}`,
          metadata: {
            request_id: pinModal.request.id,
            payment_method: pinModal.method,
            pin,
          },
        },
        {
          onSuccess: () => {
            setPinModal({ open: false, request: null, method: null });
            setResultModal({ open: true, success: true, message: "Payment processed successfully!" });
          },
          onError: () => {
            setPinModal({ open: false, request: null, method: null });
            setResultModal({ open: true, success: false, message: "Payment failed. Please try again." });
          },
        }
      );
    }
  };

  return (
    <div className="flex flex-col gap-8 pb-12">
      {/* Header */}
      <header className="flex flex-col gap-2">
        <h1 className="font-sora font-semibold text-[32px] leading-[42px] text-primary-800">
          Debt Requests
        </h1>
        <p className="font-poppins text-xl leading-[30px] text-primary-900">
          See debt for your friend hand? Help am throw am away!
        </p>
      </header>

      {/* Balance Cards */}
      <BalanceCards
        walletBalance={walletBalance}
        creditBalance={creditBalance}
        isLoading={balanceLoading}
      />

      {/* Debt Requests Section */}
      <section className="flex flex-col gap-6">
        <h2 className="font-sora font-semibold text-[26px] leading-[42px] text-primary-800">
          Incoming Requests
        </h2>

        {requestsQuery.isLoading ? (
          <div className="flex flex-col gap-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="w-full h-[196px]" />
            ))}
          </div>
        ) : requests.length === 0 ? (
          <EmptyDebtRequestsState />
        ) : (
          <div className="flex flex-col">
            {requests.map((request) => (
              <DebtRequestCard
                key={request.id}
                request={request}
                onAccept={handleAccept}
                onDecline={handleDecline}
                isAccepting={acceptRequest.isPending}
                isDeclining={rejectRequest.isPending}
              />
            ))}
          </div>
        )}
      </section>

      {/* Modals */}
      <DeclineModal
        open={declineModal.open}
        onClose={() => setDeclineModal({ open: false, request: null })}
        onConfirm={handleConfirmDecline}
        requesterName={declineModal.request?.requester_name || ""}
        isLoading={rejectRequest.isPending}
      />

      <MakePaymentModal
        open={paymentModal.open}
        onClose={() => setPaymentModal({ open: false, request: null })}
        onConfirm={handlePaymentMethodSelect}
        requesterName={paymentModal.request?.requester_name || ""}
        amount={paymentModal.request?.amount || 0}
        walletBalance={walletBalance}
        creditBalance={creditBalance}
      />

      <EnterPinModal
        open={pinModal.open}
        onClose={() => setPinModal({ open: false, request: null, method: null })}
        onConfirm={handlePinConfirm}
        paymentMethod={pinModal.method || "wallet"}
        amount={pinModal.request?.amount || 0}
        isLoading={payRequest.isPending}
      />

      <PaymentResultModal
        open={resultModal.open}
        onClose={() => setResultModal({ open: false, success: false })}
        success={resultModal.success}
        message={resultModal.message}
      />
    </div>
  );
}