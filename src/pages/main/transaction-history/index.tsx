import TransactionHistoryTable from "@/features/main/transaction-history/components/TransactionHistoryTable";

export default function TransactionHistoryPage() {

    return (
        <div className="flex flex-col gap-4 md:gap-8">
          
            <div className="flex flex-col gap-2">
                <h1 className="font-sora text-primary-800 font-semibold text-xl md:text-3xl">
                    Transaction History
                </h1>
                <p className="text-sm md:text-base text-primary-900 max-w-2xl">
                    Track your transactions in one place!
                </p>
            </div>
            <TransactionHistoryTable />
        </div>
    )
}