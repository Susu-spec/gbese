import { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { PaymentMethod } from "../types";

interface MakePaymentModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (method: PaymentMethod) => void;
  requesterName: string;
  amount: number;
  walletBalance: number;
  creditBalance: number;
  isLoading?: boolean;
}

export function MakePaymentModal({
  open,
  onClose,
  onConfirm,
  requesterName,
  amount,
  walletBalance,
  creditBalance,
  isLoading,
}: MakePaymentModalProps) {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | "">("");

  const handleConfirm = () => {
    if (paymentMethod) {
      onConfirm(paymentMethod as PaymentMethod);
    }
  };

  const handleClose = () => {
    setPaymentMethod("");
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      className="w-full max-w-lg p-10 flex flex-col gap-10"
    >
      <div className="flex flex-col gap-4">
        <h2 className="font-sora font-semibold text-2xl text-primary-900">
          Make Payment
        </h2>
        <p className="text-primary-700">
          Confirm payment of <strong>₦{amount.toLocaleString()}</strong> to{" "}
          <strong>{requesterName}</strong>
        </p>
      </div>

      {/* Payment Method Selection */}
      <div className="flex flex-col gap-4">
        <Label>Select Payment Method</Label>
        
        {/* Wallet Option */}
        <button
          onClick={() => setPaymentMethod("wallet")}
          disabled={walletBalance < amount || isLoading}
          className={cn(
            "w-full p-4 border-2 rounded-lg text-left transition-all",
            paymentMethod === "wallet"
              ? "border-primary-600 bg-primary-50"
              : "border-primary-200 hover:border-primary-400",
            walletBalance < amount && "opacity-50 cursor-not-allowed"
          )}
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="font-semibold text-primary-900">Wallet Balance</p>
              <p className="text-sm text-primary-600">
                Available: ₦{walletBalance.toLocaleString()}
              </p>
            </div>
            {walletBalance < amount && (
              <span className="text-xs text-red-600">Insufficient funds</span>
            )}
          </div>
        </button>

        {/* Credit Option */}
        <button
          onClick={() => setPaymentMethod("credit")}
          disabled={creditBalance < amount || isLoading}
          className={cn(
            "w-full p-4 border-2 rounded-lg text-left transition-all",
            paymentMethod === "credit"
              ? "border-primary-600 bg-primary-50"
              : "border-primary-200 hover:border-primary-400",
            creditBalance < amount && "opacity-50 cursor-not-allowed"
          )}
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="font-semibold text-primary-900">Credit Balance</p>
              <p className="text-sm text-primary-600">
                Available: ₦{creditBalance.toLocaleString()}
              </p>
            </div>
            {creditBalance < amount && (
              <span className="text-xs text-red-600">Insufficient credit</span>
            )}
          </div>
        </button>
      </div>

      <div className="flex gap-3 justify-end">
        <Button
          onClick={handleClose}
          variant="outline"
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button
          onClick={handleConfirm}
          disabled={!paymentMethod || isLoading}
          className="bg-primary-700 hover:bg-primary-800 text-white"
        >
          Continue
        </Button>
      </div>
    </Modal>
  );
}
