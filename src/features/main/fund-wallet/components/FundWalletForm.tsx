import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useFundWallet } from "../hooks/useFundWallet";
import type { PaymentMethod } from "../types";
import { Spinner } from "@/components/ui/spinner";
import { CardPaymentModal } from "./CardPaymentModal";
import { DebtSelectionModal } from "./DebtSelectionModal";
import { useAppSelector } from "@/store/store";
import { depositFormSchema, DEPOSIT_LIMITS } from "../schemas";
import { AlertCircle } from "lucide-react";
import { useDebt } from "../../my-debts/hook";

interface SelectedDebt {
  obligation_id: string;
  amount: number;
}

export function FundWalletForm() {
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState<PaymentMethod | "">("");
  const [attachDebt, setAttachDebt] = useState(false);
  const [showCardModal, setShowCardModal] = useState(false);
  const [showDebtModal, setShowDebtModal] = useState(false);
  const [validationError, setValidationError] = useState<string>("");
  const [selectedDebts, setSelectedDebts] = useState<SelectedDebt[]>([]);
  
  const user = useAppSelector((state) => state.user.profile);
  const isKycVerified = user.kyc_status === "verified";
  const { fundWallet, fundWalletAndPayDebts } = useFundWallet();
  const { acticeDebtsQuery } = useDebt();
  
  const activeDebts = acticeDebtsQuery.data?.data || [];
  const isProcessing = fundWallet.isPending || fundWalletAndPayDebts.isPending;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setValidationError("");
    
    const schema = depositFormSchema(isKycVerified);
    const result = schema.safeParse({
      amount: Number(amount),
      payment_method: method,
    });

    if (!result.success) {
      const firstError = result.error.issues[0];
      setValidationError(firstError.message);
      return;
    }

    if (attachDebt && activeDebts.length > 0) {
      setShowDebtModal(true);
      return;
    }
  
    if (method === "card") {
      setShowCardModal(true);
      return;
    }

    fundWallet.mutate({
      amount: Number(amount),
      payment_method: method as PaymentMethod,
    });
    setAmount("");
  }

  function handleDebtSelection(debts: SelectedDebt[]) {
    setSelectedDebts(debts);
    setShowDebtModal(false);
    
    if (method === "card") {
      setShowCardModal(true);
    } else {
      fundWalletAndPayDebts.mutate({
        amount: Number(amount),
        payment_method: method as PaymentMethod,
        debts: debts,
      });
      setAmount("");
      setMethod("");
      setAttachDebt(false);
      setSelectedDebts([]);
    }
  }

  function handleCardPaymentSuccess() {
    if (selectedDebts.length > 0) {
      fundWalletAndPayDebts.mutate({
        amount: Number(amount),
        payment_method: "card",
        debts: selectedDebts,
      });
    } else {
      fundWallet.mutate({
        amount: Number(amount),
        payment_method: "card",
      });
    }
    setAmount("");
    setMethod("");
    setAttachDebt(false);
    setSelectedDebts([]);
  }

  const maxDeposit = isKycVerified
    ? DEPOSIT_LIMITS.KYC.MAX_PER_DEPOSIT
    : DEPOSIT_LIMITS.NON_KYC.MAX_PER_DEPOSIT;

  return (
    <Card
      className={cn(
        "rounded-b-xl pt-6 pb-8 px-4 md:px-20 w-full max-w-5xl flex flex-col gap-6 md:gap-10 shadow-lg",
        "border border-gbese-white bg-white"
      )}
    >
      <div className="flex flex-col gap-6">
        <h2 className="h4">Details</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-10">
          <div className="flex flex-col gap-10">
          
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="amount">Amount (₦)</Label>
                <span className="text-xs text-primary-600">
                  Max: ₦{maxDeposit.toLocaleString()}
                </span>
              </div>
              <Input
                id="amount"
                type="number"
                min={100}
                max={maxDeposit}
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                  setValidationError("");
                }}
                className={cn(
                  "h-12 md:h-14",
                  validationError && "border-red-500 focus:ring-red-500"
                )}
                required
                disabled={isProcessing}
              />
              {validationError && (
                <div className="flex items-start gap-2 text-sm text-red-600">
                  <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>{validationError}</span>
                </div>
              )}
              {!isKycVerified && !validationError && (
                <p className="text-xs text-primary-600">
                  Complete KYC verification to deposit up to ₦{DEPOSIT_LIMITS.KYC.MAX_PER_DEPOSIT.toLocaleString()} per transaction
                </p>
              )}
            </div>
            
            <div className="flex flex-col gap-2">
              <Label htmlFor="method">Payment Method</Label>
              <Select
                value={method}
                onValueChange={(value) => setMethod(value as PaymentMethod | "")}
                disabled={isProcessing}
              >
                <SelectTrigger 
                  className="w-full border border-input bg-transparent shadow-xs text-sm px-3"
                  style={{ height: '3.5rem' }}
                >
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                  <SelectItem value="card">Card</SelectItem>
                  <SelectItem value="ussd">USSD</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <label className="relative flex items-center cursor-pointer">
                <input
                  id="attachDebt"
                  type="checkbox"
                  checked={attachDebt}
                  onChange={(e) => setAttachDebt(e.target.checked)}
                  disabled={isProcessing}
                  className="peer size-5 md:size-6 appearance-none rounded border-2 border-primary-200 bg-white checked:border-primary-800 focus:ring-2 focus:ring-primary-400 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
                />
                <svg
                  className="absolute left-0 size-5 md:size-6 pointer-events-none hidden peer-checked:block text-black"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </label>
              <Label htmlFor="attachDebt" className="cursor-pointer">
                Attach debt obligations
              </Label>
            </div>
          </div>
          <div>
            <Button
              type="submit"
              className="min-w-36 md:min-w-40 h-11 md:h-12"
              disabled={isProcessing || !amount || !method}
            >
              {isProcessing ? (
                <>
                  <Spinner className="size-4" />
                  <span>Processing...</span>
                </>
              ) : (
                "Fund Wallet"
              )}
            </Button>
          </div>
        </form>
      </div>

      <DebtSelectionModal
        open={showDebtModal}
        onClose={() => setShowDebtModal(false)}
        debts={activeDebts}
        onConfirm={handleDebtSelection}
        isLoading={acticeDebtsQuery.isLoading}
      />

      <CardPaymentModal
        open={showCardModal}
        onClose={() => setShowCardModal(false)}
        amount={Number(amount)}
        onSuccess={handleCardPaymentSuccess}
      />
    </Card>
  );
}
