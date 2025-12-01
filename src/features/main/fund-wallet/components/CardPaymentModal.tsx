import { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard, Lock } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

interface CardPaymentModalProps {
  open: boolean;
  onClose: () => void;
  amount: number;
  onSuccess: () => void;
}

export function CardPaymentModal({ open, onClose, amount, onSuccess }: CardPaymentModalProps) {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardName, setCardName] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const formatCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, "");
    const limited = digits.slice(0, 16);
    const formatted = limited.match(/.{1,4}/g)?.join(" ") || limited;
    return formatted;
  };

  const formatExpiry = (value: string) => {
    const digits = value.replace(/\D/g, "");
    if (digits.length >= 2) {
      return digits.slice(0, 2) + "/" + digits.slice(2, 4);
    }
    return digits;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardNumber(formatCardNumber(e.target.value));
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExpiryDate(formatExpiry(e.target.value));
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 3);
    setCvv(digits);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate card processing delay (2 seconds)
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsProcessing(false);
    onSuccess();
    handleClose();
  };

  const handleClose = () => {
    if (!isProcessing) {
      setCardNumber("");
      setExpiryDate("");
      setCvv("");
      setCardName("");
      onClose();
    }
  };

  const isFormValid = 
    cardNumber.replace(/\s/g, "").length === 16 &&
    expiryDate.length === 5 &&
    cvv.length === 3 &&
    cardName.trim().length > 0;

  return (
    <Modal
      open={open}
      onClose={handleClose}
      className="w-full max-w-lg p-6 md:p-8 flex flex-col gap-6"
    >
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary-100 rounded-lg">
          <CreditCard className="w-6 h-6 text-primary-700" />
        </div>
        <div>
          <h2 className="font-sora font-semibold text-xl md:text-2xl text-primary-900">
            Card Payment
          </h2>
          <p className="text-sm text-primary-600">
            Enter your card details to fund ₦{amount.toLocaleString()}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* Card Number */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="cardNumber">Card Number</Label>
          <Input
            id="cardNumber"
            type="text"
            placeholder="1234 5678 9012 3456"
            value={cardNumber}
            onChange={handleCardNumberChange}
            disabled={isProcessing}
            maxLength={19}
            required
            className="font-mono"
          />
        </div>

        {/* Card Name */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="cardName">Cardholder Name</Label>
          <Input
            id="cardName"
            type="text"
            placeholder="Name on card"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
            disabled={isProcessing}
            required
            className="uppercase"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="expiry">Expiry Date</Label>
            <Input
              id="expiry"
              type="text"
              placeholder="MM/YY"
              value={expiryDate}
              onChange={handleExpiryChange}
              disabled={isProcessing}
              maxLength={5}
              required
              className="font-mono"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="cvv">CVV</Label>
            <Input
              id="cvv"
              type="password"
              placeholder="123"
              value={cvv}
              onChange={handleCvvChange}
              disabled={isProcessing}
              maxLength={3}
              required
              className="font-mono"
            />
          </div>
        </div>

        <div className="flex items-start gap-2 p-3 bg-primary-50 rounded-lg border border-primary-200">
          <Lock className="w-4 h-4 text-primary-600 mt-0.5 shrink-0" />
          <p className="text-xs text-primary-700">
            Your payment information is secure and encrypted. This is a demo simulation.
          </p>
        </div>

        <div className="flex gap-3 justify-end pt-2">
          <Button
            type="button"
            onClick={handleClose}
            variant="outline"
            disabled={isProcessing}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={!isFormValid || isProcessing}
            className="min-w-32"
          >
            {isProcessing ? (
              <>
                <Spinner className="size-4" />
                <span>Processing...</span>
              </>
            ) : (
              `Pay ₦${amount.toLocaleString()}`
            )}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
