import { WalletBalanceCard } from "@/features/main/fund-wallet/components/WalletBalanceCard";
import { FundWalletForm } from "@/features/main/fund-wallet/components/FundWalletForm";
import { RecentTransactionsTable } from "@/features/main/fund-wallet/components/RecentTransactionsTable";
import { EmptyWalletState } from "@/features/main/fund-wallet/components/EmptyWalletState";
import { useAccountBalance } from "@/features/main/account/hooks";
import { useUser } from "@/features/main/dashboard/hooks/useUser";
import { useFundWallet } from "@/features/main/fund-wallet/hooks/useFundWallet";
import type { WalletBalance, WalletTransaction } from "@/features/main/fund-wallet/types";
import { parseBalance } from "@/lib/utils";

export default function FundWalletPage() {
    // Mutation (used inside the form component)
    useFundWallet();
    // Centralized balance
    const balance = useAccountBalance();
    // Centralized transactions
    const { transactionQuery } = useUser();

    const account = balance.data?.data;
    const walletBalance: WalletBalance | null = account
        ? { amount: parseBalance(account.current_balance), currency: account.currency ?? "NGN" }
        : null;

    type TxRaw = {
        id: string;
        initiated_at?: string;
        completed_at?: string;
        amount?: string | number;
        status?: string;
        type?: string;
    };
    const rawTx = (transactionQuery.data as unknown as { data?: { transactions?: TxRaw[] } })?.data?.transactions ?? [];
    // Filter to only show deposit transactions on fund wallet page
    const txList: WalletTransaction[] = Array.isArray(rawTx)
        ? rawTx
            .filter((t: TxRaw) => t.type?.toLowerCase() === "deposit")
            .map((t: TxRaw) => ({
                id: t.id,
                date: t.initiated_at ?? t.completed_at ?? new Date().toISOString(),
                amount: parseBalance(t.amount),
                status: t.status === "completed" ? "successful" : t.status === "failed" ? "rejected" : "pending",
                method: t.type || "Bank",
            }))
        : [];

    const isEmpty = !walletBalance || walletBalance.amount === 0;
    const hasTransactions = txList.length > 0;

    return (
        <div className="flex flex-col gap-8 pb-12">
            <header className="flex flex-col gap-2">
                <h1 className="font-sora font-semibold text-xl md:text-3xl leading-10 text-primary-800">
                    Fund Your Wallet
                </h1>
                <p className="text-sm md:text-base text-primary-900 max-w-2xl">
                    Add money to your wallet sharp sharp; make gbese no hold you!
                </p>
            </header>
            <div className="max-w-5xl">
                <WalletBalanceCard balance={walletBalance} isLoading={balance.isLoading} />
            </div>
            <FundWalletForm />
            <RecentTransactionsTable
                transactions={txList}
                currency={walletBalance?.currency}
            />
            <EmptyWalletState show={isEmpty && !hasTransactions} />
        </div>
    );
}