import { useState } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Wallet, Eye, EyeOff } from "lucide-react";
import type { WalletBalance } from "../types";

interface WalletBalanceCardProps {
  balance: WalletBalance | null;
  isLoading?: boolean;
}

export function WalletBalanceCard({ balance, isLoading }: WalletBalanceCardProps) {
  const [showBalance, setShowBalance] = useState(true);
  return (
    <Card
      className={cn(
          "rounded-lg py-4 md:py-5 pl-6 md:pl-8 pr-6 md:pr-10 flex flex-col gap-2 w-full max-w-5xl h-52 md:h-64 shadow-lg",
        "border border-gbese-white bg-white"
      )}
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
              <span className="flex items-center justify-center rounded-full bg-primary-100 size-8 md:size-9 p-1">
                <Wallet className="w-4 h-4 md:w-5 md:h-5 text-primary-700" />
              </span>
          <div className="flex items-center justify-between">
            <h2 className="text-sm md:text-xl font-medium text-primary-900 tracking-wide leading-6 md:leading-7">
              Available Wallet Balance
            </h2>
            <button
              onClick={() => setShowBalance(!showBalance)}
              className="p-2 hover:bg-primary-50 rounded-full transition-colors"
              aria-label={showBalance ? "Hide balance" : "Show balance"}
            >
              {showBalance ? (
                <Eye className="w-4 h-4 md:w-5 md:h-5 text-primary-700" />
              ) : (
                <EyeOff className="w-4 h-4 md:w-5 md:h-5 text-primary-700" />
              )}
            </button>
          </div>
        </div>
        <div className="flex items-baseline gap-4">
          {isLoading ? (
            <span className="text-lg md:text-4xl font-semibold text-primary-400 leading-7 md:leading-tight">Loading...</span>
          ) : showBalance ? (
            <>
              <span className="text-lg md:text-4xl font-semibold leading-7 md:leading-tight">
                &#8358;{balance ? balance.amount.toLocaleString() : "—"}
              </span>
            </>
          ) : (
            <span className="text-lg md:text-4xl font-semibold leading-7 md:leading-tight">••••••</span>
          )}
        </div>
        <div className="border-b border-gbese-black w-16 md:w-20">
          <p className="text-xs leading-4 whitespace-nowrap">Fund Wallet</p>
        </div>
      </div>
    </Card>
  );
}
