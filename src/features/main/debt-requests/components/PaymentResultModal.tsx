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
      className="w-full max-w-2xl rounded-xl p-6 md:p-10 flex flex-col items-center justify-center gap-4 md:gap-6"
    >
      <div className="flex flex-col items-center gap-4 md:gap-6">
        {success ? (
          <CheckCircle2 className="w-16 h-16 md:w-20 md:h-20 text-gbese-success" />
        ) : (
          <XCircle className="w-16 h-16 md:w-20 md:h-20 text-primary-400" />
        )}
        
        <div className="text-center">
          <h2 className="font-sora font-semibold text-2xl md:text-3xl text-primary-900 mb-2">
            {message || (success ? "Debt Accepted!" : "Action Failed")}
          </h2>
          {!message && (
            <p className="text-sm md:text-base text-primary-700 px-4">
              {success
                ? "The debt has been transferred to your obligations."
                : "There was an issue processing your request. Please try again."}
            </p>
          )}
        </div>

        <Button
          onClick={onClose}
          className={
            success
              ? "bg-gbese-success hover:bg-gbese-success/90 text-white px-6 md:px-8 text-sm md:text-base w-full sm:w-auto"
              : "bg-blue-600 hover:bg-blue-700 text-white px-6 md:px-8 text-sm md:text-base w-full sm:w-auto"
          }
        >
          Close
        </Button>
      </div>
    </Modal>
  );
}
