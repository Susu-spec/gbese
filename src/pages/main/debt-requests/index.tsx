import { useState, useEffect, useMemo } from "react";
import { useAccountBalance } from "@/features/main/account/hooks";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { AxiosError, type AxiosResponse } from "axios";
import { handleApiError, parseBalance } from "@/lib/utils";
import { BalanceCards } from "@/features/main/debt-requests/components/BalanceCards";
import { DebtRequestCard } from "@/features/main/debt-requests/components/DebtRequestCard";
import { DeclineModal } from "@/features/main/debt-requests/components/DeclineModal";
import { AcceptRequestModal } from "@/features/main/debt-requests/components/AcceptRequestModal";
import { PaymentResultModal } from "@/features/main/debt-requests/components/PaymentResultModal";
import { EmptyDebtRequestsState } from "@/features/main/debt-requests/components/EmptyDebtRequestsState";
import { Separator } from "@/components/ui/separator";
import { setIncomingDebtRequests } from "@/features/main/debt-requests/debtRequestsSlice";
import type { DebtRequest, RejectRequestPayload, PaymentResponse, IncomingDebtRequestsResponse } from "@/features/main/debt-requests/types";
import { acceptDebtRequest, rejectDebtRequest, getIncomingDebtRequests } from "@/features/main/debt-requests/services";

export default function DebtRequestsPage() {
  const { data: accountData, isLoading: balanceLoading } = useAccountBalance();
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const [declineModal, setDeclineModal] = useState<{ open: boolean; request: DebtRequest | null }>({
    open: false,
    request: null,
  });
  const [acceptModal, setAcceptModal] = useState<{ open: boolean; request: DebtRequest | null }>({
    open: false,
    request: null,
  });
  const [resultModal, setResultModal] = useState<{ open: boolean; success: boolean; message?: string }>({
    open: false,
    success: false,
  });

  const acceptRequest = useMutation<AxiosResponse<PaymentResponse>, AxiosError, string>({
    mutationFn: acceptDebtRequest,
    onSuccess: () => {
      toast.success("Debt transfer accepted! Your debt obligation has been updated.");
      queryClient.invalidateQueries({ queryKey: ["debtRequests", "incoming"] });
      queryClient.invalidateQueries({ queryKey: ["debtRequests"] });
      queryClient.invalidateQueries({ queryKey: ["account", "balance"] });
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      queryClient.invalidateQueries({ queryKey: ["userTransactions"] });
      queryClient.invalidateQueries({ queryKey: ["activeDebts"] });
      queryClient.invalidateQueries({ queryKey: ["transferredDebts"] });
    },
    onError: (error: AxiosError) => handleApiError(error),
  });

  const rejectRequest = useMutation<AxiosResponse<PaymentResponse>, AxiosError, RejectRequestPayload>({
    mutationFn: rejectDebtRequest,
    onSuccess: () => {
      toast.success("Request rejected successfully!");
      queryClient.invalidateQueries({ queryKey: ["debtRequests", "incoming"] });
      queryClient.invalidateQueries({ queryKey: ["debtRequests"] });
    },
    onError: (error: AxiosError) => handleApiError(error),
  });

  // Fetch incoming debt requests directly on this page
  const { data: requestsData, isLoading: requestsLoading } = useQuery<IncomingDebtRequestsResponse, AxiosError>({
    queryKey: ["debtRequests", "incoming"],
    queryFn: getIncomingDebtRequests,
    staleTime: 1000 * 60 * 5,
  });

  // Sync to Redux store for dashboard access
  useEffect(() => {
    if (requestsData?.data && Array.isArray(requestsData.data)) {
      dispatch(setIncomingDebtRequests(requestsData.data));
    }
  }, [requestsData, dispatch]);

  const account = accountData?.data;
  const walletBalance = parseBalance(account?.current_balance);
  const debtBalance = parseBalance(account?.total_debt_obligation);
  const requests = useMemo(() => requestsData?.data || [], [requestsData]);

  useEffect(() => {
    const acceptId = searchParams.get('accept');
    const declineId = searchParams.get('decline');
    
    if (requests.length > 0) {
      if (acceptId) {
        const request = requests.find((r) => r.id === acceptId);
        if (request) {
          setAcceptModal({ open: true, request });
          setSearchParams({});
        }
      } else if (declineId) {
        const request = requests.find((r) => r.id === declineId);
        if (request) {
          setDeclineModal({ open: true, request });
          setSearchParams({});
        }
      }
    }
  }, [searchParams, requests, setSearchParams]);

  const handleAccept = (requestId: string) => {
    const request = requests.find((r) => r.id === requestId);
    if (request) {
      setAcceptModal({ open: true, request });
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

  const handleConfirmAccept = () => {
    if (acceptModal.request) {
      acceptRequest.mutate(acceptModal.request.id, {
        onSuccess: () => {
          setAcceptModal({ open: false, request: null });
          setResultModal({ 
            open: true, 
            success: true, 
            message: "Debt transfer accepted successfully! The debt has been added to your obligations." 
          });
        },
        onError: () => {
          setAcceptModal({ open: false, request: null });
          setResultModal({ 
            open: true, 
            success: false, 
            message: "Failed to accept debt transfer. Please try again." 
          });
        },
      });
    }
  };

  return (
    <div className="flex flex-col gap-6 md:gap-8 pb-12 px-2 sm:px-3 md:px-0">
      <header className="flex flex-col gap-2">
        <h1 className="font-sora font-semibold text-2xl md:text-3xl leading-8 md:leading-10 text-primary-800">
          Debt Requests
        </h1>
        <p className="text-base md:text-xl leading-6 md:leading-8 text-primary-900">
          See debt for your friend hand? Help am throw am away!
        </p>
      </header>

      <BalanceCards
        walletBalance={walletBalance}
        debtBalance={debtBalance}
        isLoading={balanceLoading}
      />

      <section className="flex flex-col gap-4 md:gap-6">
        <div className="flex flex-col gap-3">
          <h2 className="font-sora font-semibold text-xl md:text-2xl leading-8 md:leading-10 text-primary-800">
            Incoming Requests
          </h2>
          <Separator className="bg-primary-200" />
        </div>

        {requestsLoading ? (
          <div className="flex justify-center py-8">
            <p className="text-primary-600">Loading requests...</p>
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

      <DeclineModal
        open={declineModal.open}
        onClose={() => setDeclineModal({ open: false, request: null })}
        onConfirm={handleConfirmDecline}
        requesterName={declineModal.request?.requester_name || ""}
        isLoading={rejectRequest.isPending}
      />

      <AcceptRequestModal
        open={acceptModal.open}
        onClose={() => setAcceptModal({ open: false, request: null })}
        onConfirm={handleConfirmAccept}
        request={acceptModal.request}
        isLoading={acceptRequest.isPending}
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