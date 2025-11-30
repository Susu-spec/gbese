import { Button } from "@/components/ui/button";
import { KycProtectedButton } from "@/features/kyc/components/KycProtectedButton";
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
    <div className="w-full max-w-5xl h-49 border-b border-primary-200 py-6 flex flex-col gap-3">
      {/* Top row: Name (left) and Due date (right) */}
      <div className="flex justify-between items-start">
        <h3 className="font-sora font-semibold text-xl md:text-2xl leading-7 md:leading-10 text-primary-900">
          {request.requester_name}
        </h3>
        <p className="text-xs md:text-sm text-primary-600">
          Due: {request.due_date ? new Date(request.due_date).toLocaleDateString() : "N/A"}
        </p>
      </div>

      {/* Middle row: Reason/Narration */}
      <p className="text-sm md:text-base text-primary-700 line-clamp-2">
        {request.narration || "No description provided"}
      </p>

      {/* Bottom row: Amount (left) and Buttons (right) */}
      <div className="flex justify-between items-center">
        <p className="font-sora font-semibold text-lg md:text-2xl leading-7 md:leading-10 text-primary-900">
          &#8358;{request.amount?.toLocaleString() ?? "0"}
        </p>
        <div className="flex gap-4">
          <KycProtectedButton
            onAllowed={() => onAccept(request.id)}
            disabled={isAccepting || isDeclining}
            className="bg-primary-700 hover:bg-primary-800 text-white text-sm md:text-base h-13 w-48 rounded-lg px-6 py-3"
          >
            {isAccepting ? "Accepting..." : "Accept Request"}
          </KycProtectedButton>
          <Button
            onClick={() => onDecline(request.id)}
            disabled={isAccepting || isDeclining}
            className="bg-white text-primary-900 border border-primary-300 hover:bg-primary-50 text-sm md:text-base h-13 w-48 rounded-lg px-6 py-3"
          >
            {isDeclining ? "Declining..." : "Decline Request"}
          </Button>
        </div>
      </div>
    </div>
  );
}
