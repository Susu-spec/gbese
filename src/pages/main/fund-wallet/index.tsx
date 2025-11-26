import { WalletBalanceCard } from "@/features/main/fund-wallet/components/WalletBalanceCard";
import { FundWalletForm } from "@/features/main/fund-wallet/components/FundWalletForm";
import { RecentTransactionsTable } from "@/features/main/fund-wallet/components/RecentTransactionsTable";
import { EmptyWalletState } from "@/features/main/fund-wallet/components/EmptyWalletState";
import { useFundWallet } from "@/features/main/fund-wallet/hooks/useFundWallet";

export default function FundWalletPage() {
    const { balance, transactions } = useFundWallet();
    
    const isEmpty = !balance.data || balance.data.amount === 0;
    const hasTransactions = transactions.data && transactions.data.length > 0;

    return (
        <div className="flex flex-col gap-8 pb-12">
            {/* Title + Subtitle */}
            <header className="flex flex-col gap-2">
                <h1 className="font-sora font-semibold text-3xl leading-10 text-primary-800">
                    Fund Your Wallet
                </h1>
                <p className="text-sm md:text-base text-primary-900 max-w-2xl">
                    Add money to your wallet sharp sharp; make gbese no hold you!
                </p>
            </header>

            {/* Wallet Balance Card */}
            <WalletBalanceCard balance={balance.data ?? null} isLoading={balance.isLoading} />

            {/* Deposit Form */}
            <FundWalletForm />

            {/* Recent Transactions */}
            <RecentTransactionsTable
                transactions={transactions.data ?? []}
                currency={balance.data?.currency}
            />

            {/* Empty State */}
            <EmptyWalletState show={isEmpty && !hasTransactions} />
        </div>
    );
}