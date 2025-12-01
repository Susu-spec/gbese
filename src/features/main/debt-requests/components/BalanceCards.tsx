import { Card } from "@/components/ui/card";
import { Wallet, AlertCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { parseBalance } from "@/lib/utils";

interface BalanceCardsProps {
  walletBalance: number;
  debtBalance: number;
  isLoading: boolean;
}

export function BalanceCards({ walletBalance, debtBalance, isLoading }: BalanceCardsProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-2 w-full max-w-3xl">
      <Card className="flex-1 max-w-full sm:max-w-sm h-40 sm:h-48 rounded-xl p-4 sm:p-5 md:px-8 md:py-5 flex flex-col gap-2 sm:gap-3">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary-100 flex items-center justify-center">
            <Wallet className="w-4 h-4 sm:w-5 sm:h-5 text-primary-800" />
          </div>
          <h3 className="text-sm sm:text-base font-medium text-primary-800">Wallet Balance</h3>
        </div>
        {isLoading ? (
          <Skeleton className="h-7 sm:h-9 md:h-10 w-28 sm:w-36 md:w-40" />
        ) : (
          <div className="text-xl sm:text-2xl md:text-3xl font-semibold text-primary-900">
            &#8358;{parseBalance(walletBalance).toLocaleString()}
          </div>
        )}
      </Card>

      <Card className="flex-1 max-w-full sm:max-w-sm h-40 sm:h-48 rounded-xl p-4 sm:p-5 md:px-8 md:py-5 flex flex-col gap-2 sm:gap-3">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-orange-100 flex items-center justify-center">
            <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />
          </div>
          <h3 className="text-sm sm:text-base font-medium text-primary-800">Current Debt</h3>
        </div>
        {isLoading ? (
          <Skeleton className="h-7 sm:h-9 md:h-10 w-28 sm:w-36 md:w-40" />
        ) : (
          <div className={`text-xl sm:text-2xl md:text-3xl font-semibold ${
            parseBalance(debtBalance) > 0 ? "text-orange-600" : "text-primary-900"
          }`}>
            &#8358;{parseBalance(debtBalance).toLocaleString()}
          </div>
        )}
      </Card>
    </div>
  );
}
