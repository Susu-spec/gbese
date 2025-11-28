import TransactionHistoryTable from "@/features/main/transaction-history/components/TransactionHistoryTable";

export default function TransactionHistoryPage() {

    return (
        <div className="flex flex-col gap-6.5 lg:gap-10">
           <h1 className="font-sora text-primary-800 font-semibold text-xl md:text-[2rem]">
                Transaction History
            </h1>
            <TransactionHistoryTable />
        </div>
    )
}