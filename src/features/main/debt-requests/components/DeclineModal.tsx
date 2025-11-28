import { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface DeclineModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
  requesterName: string;
  isLoading?: boolean;
}

export function DeclineModal({
  open,
  onClose,
  onConfirm,
  requesterName,
  isLoading,
}: DeclineModalProps) {
  const [reason, setReason] = useState("");

  const handleConfirm = () => {
    if (reason.trim()) {
      onConfirm(reason);
      setReason("");
    }
  };

  const handleClose = () => {
    setReason("");
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
          Decline Request
        </h2>
        <p className="text-primary-700">
          Are you sure you want to decline the debt request from <strong>{requesterName}</strong>?
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <Label htmlFor="reason">Reason for declining</Label>
        <textarea
          id="reason"
          value={reason}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setReason(e.target.value)}
          placeholder="Enter your reason for declining this request"
          className="min-h-[120px] w-full rounded-md border border-primary-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 disabled:opacity-50"
          disabled={isLoading}
        />
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
          disabled={!reason.trim() || isLoading}
          className="bg-red-600 hover:bg-red-700 text-white"
        >
          {isLoading ? "Declining..." : "Confirm Decline"}
        </Button>
      </div>
    </Modal>
  );
}
