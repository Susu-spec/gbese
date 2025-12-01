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
    <div className="w-full max-w-5xl border-b border-primary-200 py-4 md:py-6 flex flex-col gap-3 md:gap-4">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-4">
        <h3 className="font-sora font-semibold text-lg sm:text-xl md:text-2xl leading-6 sm:leading-7 md:leading-10 text-primary-900">
          {request.requester_name}
        </h3>
        <p className="text-xs md:text-sm text-primary-600">
          Due: {request.due_date ? new Date(request.due_date).toLocaleDateString() : "N/A"}
        </p>
      </div>

      <p className="text-sm md:text-base text-primary-700 line-clamp-2">
        {request.narration || "No description provided"}
      </p>

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <p className="font-sora font-semibold text-xl sm:text-2xl md:text-3xl leading-7 md:leading-10 text-primary-900">
          &#8358;{request.amount?.toLocaleString() ?? "0"}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <KycProtectedButton
            onAllowed={() => onAccept(request.id)}
            disabled={isAccepting || isDeclining}
            className="bg-primary-700 hover:bg-primary-800 text-white text-sm md:text-base h-12 md:h-13 w-full sm:w-44 md:w-48 rounded-lg px-4 md:px-6 py-3"
          >
            {isAccepting ? "Accepting..." : "Accept Request"}
          </KycProtectedButton>
          <Button
            onClick={() => onDecline(request.id)}
            disabled={isAccepting || isDeclining}
            className="bg-white text-primary-900 border border-primary-300 hover:bg-primary-50 text-sm md:text-base h-12 md:h-13 w-full sm:w-44 md:w-48 rounded-lg px-4 md:px-6 py-3"
          >
            {isDeclining ? "Declining..." : "Decline Request"}
          </Button>
        </div>
      </div>
    </div>
  );
}
