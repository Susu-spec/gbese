import { Button } from "@/components/ui/button";
import type { DebtRequest } from "../types";

interface DebtRequestCardProps {
  request: DebtRequest;
  onAccept: (id: string) => void;
  onDecline: (id: string) => void;
  isAccepting?: boolean;
  isDeclining?: boolean;
}

export function DebtRequestCard({
  request,
  onAccept,
  onDecline,
  isAccepting,
  isDeclining,
}: DebtRequestCardProps) {
  return (
    <div className="w-full max-w-5xl h-48 border-b border-primary-200 py-6 flex items-center justify-between">
      {/* Left Side - Request Info */}
      <div className="flex flex-col gap-2">
        <h3 className="font-sora font-semibold text-[26px] leading-[42px] text-primary-900">
          {request.requester_name}
        </h3>
        <p className="font-poppins text-base text-primary-700 max-w-md">
          {request.narration}
        </p>
        <p className="font-sora font-semibold text-xl text-primary-900">
          &#8358;{request.amount.toLocaleString()}
        </p>
      </div>

      {/* Right Side - Due Date & Actions */}
      <div className="flex flex-col items-end gap-4">
        <p className="text-sm text-primary-600">
          Due: {new Date(request.due_date).toLocaleDateString()}
        </p>
        <div className="flex gap-3">
          <Button
            onClick={() => onAccept(request.id)}
            disabled={isAccepting || isDeclining}
            className="bg-primary-700 hover:bg-primary-800 text-white"
          >
            {isAccepting ? "Accepting..." : "Accept Request"}
          </Button>
          <Button
            onClick={() => onDecline(request.id)}
            disabled={isAccepting || isDeclining}
            className="bg-white text-primary-900 border border-primary-300 hover:bg-primary-50"
          >
            {isDeclining ? "Declining..." : "Decline Request"}
          </Button>
        </div>
      </div>
    </div>
  );
}
