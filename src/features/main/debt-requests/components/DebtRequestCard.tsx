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
    <div className="w-full max-w-5xl min-h-44 border-b border-primary-200 py-4 md:py-6 flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h3 className="font-sora font-semibold text-xl md:text-2xl leading-7 md:leading-10 text-primary-900">
          {request.requester_name}
        </h3>
        <p className="text-sm md:text-base text-primary-700 max-w-md line-clamp-2">
          {request.narration || "No description provided"}
        </p>
        <p className="font-sora font-semibold text-lg md:text-xl text-primary-900">
          &#8358;{request.amount?.toLocaleString() ?? "0"}
        </p>
      </div>

      <div className="flex flex-col gap-3 md:gap-4">
        <p className="text-xs md:text-sm text-primary-600">
          Due: {request.due_date ? new Date(request.due_date).toLocaleDateString() : "N/A"}
        </p>
        <div className="flex flex-row gap-2 md:gap-3">
          <Button
            onClick={() => onAccept(request.id)}
            disabled={isAccepting || isDeclining}
            className="bg-primary-700 hover:bg-primary-800 text-white text-sm md:text-base flex-1"
          >
            {isAccepting ? "Accepting..." : "Accept Request"}
          </Button>
          <Button
            onClick={() => onDecline(request.id)}
            disabled={isAccepting || isDeclining}
            className="bg-white text-primary-900 border border-primary-300 hover:bg-primary-50 text-sm md:text-base flex-1"
          >
            {isDeclining ? "Declining..." : "Decline Request"}
          </Button>
        </div>
      </div>
    </div>
  );
}
