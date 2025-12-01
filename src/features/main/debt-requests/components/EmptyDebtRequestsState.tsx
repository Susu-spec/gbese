import { Inbox } from "lucide-react";

export function EmptyDebtRequestsState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
      <div className="w-20 h-20 rounded-full bg-primary-100 flex items-center justify-center">
        <Inbox className="w-10 h-10 text-primary-600" />
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="font-sora font-semibold text-xl text-primary-900">
          No Debt Requests
        </h3>
        <p className="text-primary-600 text-base max-w-md">
          You don't have any incoming debt requests at the moment. When someone sends you a debt payment request, it will appear here.
        </p>
      </div>
    </div>
  );
}
