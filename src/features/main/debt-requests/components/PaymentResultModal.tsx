import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle } from "lucide-react";

interface PaymentResultModalProps {
  open: boolean;
  onClose: () => void;
  success: boolean;
  message?: string;
}

export function PaymentResultModal({
  open,
  onClose,
  success,
  message,
}: PaymentResultModalProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      className="w-full max-w-2xl rounded-xl p-10 flex flex-col items-center justify-center gap-6"
    >
      <div className="flex flex-col items-center gap-6">
        {success ? (
          <CheckCircle2 className="w-20 h-20 text-gbese-success" />
        ) : (
          <XCircle className="w-20 h-20 text-red-600" />
        )}
        
        <div className="text-center">
          <h2 className="font-sora font-semibold text-3xl text-primary-900 mb-2">
            {success ? "Payment Successful!" : "Payment Failed"}
          </h2>
          <p className="text-primary-700">
            {message ||
              (success
                ? "Your payment has been processed successfully."
                : "There was an issue processing your payment. Please try again.")}
          </p>
        </div>

        <Button
          onClick={onClose}
          className={
            success
              ? "bg-primary-700 hover:bg-primary-800 text-white px-8"
              : "bg-red-600 hover:bg-red-700 text-white px-8"
          }
        >
          Close
        </Button>
      </div>
    </Modal>
  );
}
