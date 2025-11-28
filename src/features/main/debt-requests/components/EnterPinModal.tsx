import { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import type { PaymentMethod } from "../types";

interface EnterPinModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (pin: string) => void;
  paymentMethod: PaymentMethod;
  amount: number;
  isLoading?: boolean;
}

export function EnterPinModal({
  open,
  onClose,
  onConfirm,
  paymentMethod,
  amount,
  isLoading,
}: EnterPinModalProps) {
  const [pin, setPin] = useState("");

  const handleConfirm = () => {
    if (pin.length === 4) {
      onConfirm(pin);
    }
  };

  const handleClose = () => {
    setPin("");
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
          Enter PIN
        </h2>
        <p className="text-primary-700">
          Enter your 4-digit PIN to confirm payment of{" "}
          <strong>₦{amount.toLocaleString()}</strong> from your{" "}
          <strong>{paymentMethod === "wallet" ? "Wallet" : "Credit"}</strong>.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <Label htmlFor="pin">Transaction PIN</Label>
        <Input
          id="pin"
          type="password"
          inputMode="numeric"
          maxLength={4}
          value={pin}
          onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
          placeholder="Enter 4-digit PIN"
          className="text-center text-2xl tracking-widest"
          disabled={isLoading}
        />
        <p className="text-xs text-primary-600">
          Enter your secure 4-digit transaction PIN
        </p>
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
          disabled={pin.length !== 4 || isLoading}
          className="bg-primary-700 hover:bg-primary-800 text-white"
        >
          {isLoading ? "Processing..." : "Confirm Payment"}
        </Button>
      </div>
    </Modal>
  );
}
