import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Wallet } from "lucide-react";
import type { WalletBalance } from "../types";

interface WalletBalanceCardProps {
  balance: WalletBalance | null;
  isLoading?: boolean;
}

export function WalletBalanceCard({ balance, isLoading }: WalletBalanceCardProps) {
  return (
    <Card
      className={cn(
          "rounded-lg py-5 pl-8 pr-10 flex flex-col gap-2 w-full max-w-5xl h-64 shadow-lg",
        "border border-gbese-white bg-white"
      )}
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
              <span className="flex items-center justify-center rounded-full bg-primary-100 wallet-logo-bg-size">
                <Wallet className="w-6 h-6 text-primary-700 wallet-logo-icon-size" />
              </span>
          <h2 className="text-xl font-medium text-primary-900 tracking-wide">
            Available Wallet Balance
          </h2>
        </div>
        <div className="flex items-baseline gap-4">
          {isLoading ? (
            <span className="text-4xl font-semibold text-primary-400">Loading...</span>
          ) : (
            <>
              <span className="text-4xl font-semibold">
                {balance ? balance.amount.toLocaleString() : "—"}
              </span>
              <span className="text-sm font-medium text-primary-600">
                {balance?.currency}
              </span>
            </>
          )}
        </div>
        <div className="border-b border-gbese-black w-[71px]">
            <p className="text-xs">Fund Wallet</p>
        </div>
      </div>
    </Card>
  );
}
