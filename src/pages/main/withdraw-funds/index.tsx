import { Card } from "@/components/ui/card";
import { useAccountBalance } from "@/features/main/account/hooks"
import { WalletBalanceCard } from "@/features/main/fund-wallet/components/WalletBalanceCard";
import type { WalletBalance } from "@/features/main/fund-wallet/types";
import WithdrawFundsForm from "@/features/main/withdraw-funds/components/WithdrawFundsForm";
import { parseBalance } from "@/lib/utils";

export default function WithdrawFundsPage() {
    const { data, isLoading } = useAccountBalance();
    const account = data?.data;
    const walletBalance: WalletBalance | null = account ? {
        amount: parseBalance(account.current_balance),
        currency: account.currency ?? "NGN",
    } : null;


    return (
         <div className="flex flex-col gap-4 md:gap-8 max-w-5xl">
            <div className="flex flex-col gap-1.5 md:gap-2">
                <h1 className="font-sora text-primary-800 font-semibold text-xl md:text-3xl">
                    Withdraw Your Funds
                </h1>
                <p className="text-sm md:text-base text-primary-950 leading-7.5">
                    Grab your cash; straight to your bank, no wahala.
                </p>
            </div>
            <WalletBalanceCard 
                balance={walletBalance} 
                isLoading={isLoading}
            />

            <Card className="md:rounded-md md:shadow-[0px_4px_10px_3px_#02134614] md:mx-auto p-4.5 md:py-10 md:px-10 w-full transition-all flex flex-col gap-8">
                <h1 className="text-[1.75rem] font-semibold">
                    Withdrawal Details
                </h1>
                <WithdrawFundsForm />
            </Card>
        </div>
    )
}