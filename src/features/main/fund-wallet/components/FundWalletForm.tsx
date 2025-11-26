import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useFundWallet } from "../hooks/useFundWallet";
import { Spinner } from "@/components/ui/spinner";

export function FundWalletForm() {
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("");
  const [attachDebt, setAttachDebt] = useState(false);
  const { fundWallet } = useFundWallet();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    fundWallet.mutate({
      amount: Number(amount),
      method,
    });
    setAmount("");
  }

  return (
    <Card
      className={cn(
        "rounded-b-xl pt-8 pb-8 px-20 w-full max-w-5xl flex flex-col gap-10 shadow-lg",
        "border border-gbese-white bg-white"
      )}
    >
      <div className="flex flex-col gap-6">
        <h2 className="h4">Details</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-10">
          <div className="flex flex-col gap-10">
            {/* Amount Field */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="amount">Amount (₦)</Label>
              <Input
                id="amount"
                type="number"
                min={0}
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="h-14"
                required
                disabled={fundWallet.isPending}
              />
            </div>
            {/* Method Field */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="method">Payment Method</Label>
              <select
                id="method"
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                disabled={fundWallet.isPending}
                className={cn(
                  "h-14 rounded-md border border-primary-200 bg-white pr-12 pl-3 text-sm",
                  "focus:outline-none focus:ring-2 focus:ring-primary-300",
                  "disabled:opacity-50 disabled:cursor-not-allowed"
                )}
              >
                <option value="">Select payment method</option>
                <option>Bank</option>
                <option>Card</option>
                <option>Gbese Pay</option>
              </select>
            </div>
            {/* Attach Debt Checkbox */}
            <div className="flex items-center gap-2">
              <input
                id="attachDebt"
                type="checkbox"
                checked={attachDebt}
                onChange={(e) => setAttachDebt(e.target.checked)}
                disabled={fundWallet.isPending}
                className="size-6 rounded border-primary-200 text-primary-800 focus:ring-2 focus:ring-primary-400 bg-white"
              />
              <Label htmlFor="attachDebt" className="cursor-pointer">
                Attach debt obligations
              </Label>
            </div>
          </div>
          <div>
            <Button
              type="submit"
              className="min-w-40 h-12"
              disabled={fundWallet.isPending || !amount || !method}
            >
              {fundWallet.isPending ? (
                <>
                  <Spinner className="size-4" />
                  <span>Processing...</span>
                </>
              ) : (
                "Fund Wallet"
              )}
            </Button>
          </div>
        </form>
      </div>
    </Card>
  );
}
