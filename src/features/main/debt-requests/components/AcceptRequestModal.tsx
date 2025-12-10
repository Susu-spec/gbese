import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import type { DebtRequest } from "../types";

interface AcceptRequestModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  request: DebtRequest | null;
  isLoading?: boolean;
}

export function AcceptRequestModal({
  open,
  onClose,
  onConfirm,
  request,
  isLoading,
}: AcceptRequestModalProps) {
  if (!request) return null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      className="w-full max-w-lg p-6 md:p-10 flex flex-col gap-6 md:gap-8"
    >
      <div className="flex flex-col gap-2">
        <h2 className="font-sora font-semibold text-xl md:text-2xl text-primary-900">
          Accept Debt Request
        </h2>
        <p className="text-sm md:text-base text-primary-700">
          Review the request details before confirming
        </p>
      </div>

      <div className="flex flex-col gap-3 md:gap-4 bg-primary-50 p-4 md:p-6 rounded-lg">
        <div className="flex justify-between items-center">
          <span className="text-xs md:text-sm text-primary-600">From</span>
          <span className="font-semibold text-sm md:text-base text-primary-900">{request.requester_name}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-xs md:text-sm text-primary-600">Amount</span>
          <span className="font-semibold text-xl md:text-2xl text-primary-900">
            &#8358;{request.amount?.toLocaleString() ?? "0"}
          </span>
        </div>

        {request.narration && (
          <div className="flex flex-col gap-1 pt-2 border-t border-primary-200">
            <span className="text-xs md:text-sm text-primary-600">Description</span>
            <p className="text-sm md:text-base text-primary-900">{request.narration}</p>
          </div>
        )}

        <div className="flex justify-between items-center pt-2 border-t border-primary-200">
          <span className="text-xs md:text-sm text-primary-600">Due Date</span>
          <span className="text-sm md:text-base text-primary-900">
            {request.due_date ? new Date(request.due_date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            }) : "N/A"}
          </span>
        </div>
      </div>

      <div className="flex gap-3 justify-end">
        <Button
          onClick={onClose}
          variant="outline"
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          disabled={isLoading}
          className="bg-primary-700 hover:bg-primary-800 text-white"
        >
          {isLoading ? "Confirming..." : "Confirm & Continue"}
        </Button>
      </div>
    </Modal>
  );
}
