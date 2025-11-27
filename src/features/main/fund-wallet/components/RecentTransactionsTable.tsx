import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import type { WalletTransaction } from "../types";

interface RecentTransactionsTableProps {
  transactions: WalletTransaction[];
  currency?: string;
}

export function RecentTransactionsTable({
  transactions,
  currency = "NGN",
}: RecentTransactionsTableProps) {
  if (transactions.length === 0) return null;

  return (
    <Card className="p-4 md:p-6 w-full max-w-5xl border border-primary-200 bg-white flex flex-col gap-4">
      <h2 className="text-sm md:text-base font-semibold">Recent Transactions</h2>
      <Separator />
      <div className="overflow-x-auto">
        <table className="w-full text-xs md:text-sm">
          <thead className="text-left text-primary-700">
            <tr className="border-b">
              <th className="py-2 pr-4 font-medium">Date</th>
              <th className="py-2 pr-4 font-medium">Amount</th>
              <th className="py-2 pr-4 font-medium">Status</th>
              <th className="py-2 pr-4 font-medium">Method</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.id} className="border-b last:border-0">
                <td className="py-2 pr-4">
                  {new Date(tx.date).toLocaleDateString()}
                </td>
                <td className="py-2 pr-4">
                  {tx.amount.toLocaleString()} {currency}
                </td>
                <td className="py-2 pr-4">
                  <StatusBadge status={tx.status} />
                </td>
                <td className="py-2 pr-4">{tx.method}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

function StatusBadge({ status }: { status: WalletTransaction["status"] }) {
  const color =
    status === "successful"
      ? "text-green-600"
      : status === "pending"
      ? "text-yellow-600"
      : "text-red-600";
  return (
    <span
      className={cn(
        "px-2 py-0.5 rounded-md text-[10px] md:text-xs font-medium capitalize",
        color
      )}
    >
      {status}
    </span>
  );
}
