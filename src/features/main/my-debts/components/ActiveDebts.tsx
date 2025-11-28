import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { DebtObligation } from "../../types";
import { useDebt } from "../hook";

const ActiveDebts = () => {
  const { acticeDebtsQuery } = useDebt();
  const isLoading = acticeDebtsQuery.isPending;

  const debts = acticeDebtsQuery.data || [];

  return (
    <div className="w-full bg-white rounded-xl p-4">
      <h2 className="text-xl font-semibold mb-4">Active Debts</h2>

      {/* Loading State */}
      {isLoading && <p className="text-gray-500">Loading...</p>}

      {/* When debts exist */}
      {!isLoading && debts.length > 0 && (
        debts.map((debt: DebtObligation) => (
          <Card key={debt.id} className="mb-4 ">
            <CardContent className="p-4">
              <div className="space-y-1">

                <div className="flex justify-between">
                  <p className="text-lg font-medium">
                    {debt.lender} 
                  </p>
                  <p
                    className="px-3 py-1 rounded-full text-xs font-medium"
                    style={{
                      backgroundColor:
                        Number(debt.interest_rate) <= 5
                          ? "#E6F9F0"
                          : Number(debt.interest_rate) <= 12
                          ? "#FFF4E6"
                          : "#FFE6E6",
                      color:
                        Number(debt.interest_rate) <= 5
                          ? "#00A66A"
                          : Number(debt.interest_rate) <= 12
                          ? "#FF9500"
                          : "#FF4D4F",
                    }}
                  >
                    {debt.interest_rate}% 
                  </p>
                </div>
                <p className="text-2xl font-semibold text-black">
                    &#8358;{Number(debt.remaining_balance).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>


                <div className="flex justify-between items-center ">
                    <p className="text-sm text-gray-500 ">
                        Due date: {debt.due_date}
                    </p>

                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            className="rounded-lg px-4 py-2 text-sm"
                            >
                            Make Payment
                        </Button>

                        <Button className="rounded-lg px-4 py-2 text-sm bg-blue-700 hover:bg-blue-800">
                            Transfer Debt
                        </Button>
                    </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}

      {/* Empty State */}
      {!isLoading && debts.length === 0 && (
        <p className="text-gray-500">No active debts found.</p>
      )}
    </div>
  );
};

export default ActiveDebts;
