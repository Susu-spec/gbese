import { Card } from "@/components/ui/card";
import type { DebtRequest } from "../../dashboard/types";
import { useDebt } from "../hook"
import { formatDate } from "@/lib/utils";


const TransferredDebts = () => {
    const {transferredDebtsQuery} = useDebt();
    const isLoading = transferredDebtsQuery.isPending;

    const transferredDebts = transferredDebtsQuery.data?.data || [];
    console.log("Transferred Debts:", transferredDebts);
    return (
        <div>
            <h2 className="text-3xl text-primary-800">Transferred Debts</h2>
            {isLoading && <p className="text-gray-500">Loading...</p>}
            {!isLoading && transferredDebts.length === 0 && <p className="text-gray-500">No transferred debts found.</p>}
            {!isLoading && transferredDebts.length > 0 && (
                transferredDebts.map((debt: DebtRequest) => (
                    <Card key={debt.id} className="mb-4 p-4">
                        <div className="flex justify-between items-center">
                            <h2>{((debt.id) as string).substring(0, 10)}...</h2>
                            <p 
                            className="rounded-xl p-2 w-fit"
                            style={{
                                backgroundColor:
                                    (debt.status) === "pending"
                                    ? "#E6F9F0"
                                    : (debt.status) === "accepted"
                                    ? "#FFF4E6"
                                    : "#FFE6E6",
                                color:
                                    (debt.status) === "accepted"
                                    ? "#00A66A"
                                    : (debt.status) === "pending"
                                    ? "#FF9500"
                                    : "#FF4D4F",
                                }}
                            >{debt.status}</p>
                        </div>
                        <p className="text-2xl font-bold">{debt.debt.principal_amount}</p>
                        <p className="text-sm text-gray-400">{debt.recipient.first_name} {debt.recipient.last_name}</p>
                        <div>
                            <p className="text-sm text-gray-500">
                                Transferred on: {debt.debt.transferred_at ? formatDate(debt.debt.transferred_at) : 'N/A'}
                            </p>
                        </div>
                    </Card>
                ))
            )}
            <hr />
        </div>
    )
}

export default TransferredDebts;