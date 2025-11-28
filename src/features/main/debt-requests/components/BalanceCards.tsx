import { Card } from "@/components/ui/card";
import { Wallet, CreditCard } from "lucide-react";
import { parseBalance } from "@/lib/utils";

interface BalanceCardsProps {
  walletBalance: number;
  creditBalance: number;
  isLoading: boolean;
}

export function BalanceCards({ walletBalance, creditBalance, isLoading }: BalanceCardsProps) {
  return (
    <div className="flex gap-2 w-full max-w-3xl">
      {/* Wallet Balance Card */}
      <Card className="flex-1 max-w-sm h-48 rounded-xl p-5 md:px-8 md:py-5 flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
            <Wallet className="w-5 h-5 text-primary-800" />
          </div>
          <h3 className="text-base font-medium text-primary-800">Available Wallet Balance</h3>
        </div>
        {isLoading ? (
          <div className="text-2xl font-semibold text-primary-400">Loading...</div>
        ) : (
          <div className="text-3xl font-semibold text-primary-900">
            &#8358;{parseBalance(walletBalance).toLocaleString()}
          </div>
        )}
      </Card>

      {/* Credit Balance Card */}
      <Card className="flex-1 max-w-sm h-48 rounded-xl p-5 md:px-8 md:py-5 flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
            <CreditCard className="w-5 h-5 text-primary-800" />
          </div>
          <h3 className="text-base font-medium text-primary-800">Available Credit Balance</h3>
        </div>
        {isLoading ? (
          <div className="text-2xl font-semibold text-primary-400">Loading...</div>
        ) : (
          <div className="text-3xl font-semibold text-primary-900">
            &#8358;{parseBalance(creditBalance).toLocaleString()}
          </div>
        )}
      </Card>
    </div>
  );
}
