import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { DebtObligation } from "../../types";
import { useDebt, usePayDebt } from "../hook";
import { useNavigate } from "react-router";
import {
  Dialog,
  DialogContent,
  DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useForm } from "@tanstack/react-form";
import { payDebtSchema } from "../payDebtSchema";
import { toast } from "sonner";
import { FormFieldWrapper } from "@/components/shared/form";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";

export default function ActiveDebts() {
  const { acticeDebtsQuery } = useDebt();
  const navigate = useNavigate();
  const payDebt = usePayDebt();

  const [open, setOpen] = useState(false);
  const [selectedDebt, setSelectedDebt] = useState<DebtObligation | null>(null);
  const account = useSelector((state: RootState) => state.user?.account);

  const isLoading = acticeDebtsQuery.isPending;
  const debts = acticeDebtsQuery.data?.data || [];

  const form = useForm({
    defaultValues: {
      amount: "",
    },
    validators: {
        onChange: ({ value }) => {
            if (!selectedDebt) return;

            const schema = payDebtSchema(
                Number(account?.current_balance || 0),
                Number(selectedDebt.remaining_balance)
            );

            const result = schema.safeParse({
                amount: value.amount
            });

            if (!result.success) {
                return {
                    amount: result.error.message,
                };
            }
        },
        onSubmit: ({ value }) => {
            if (!selectedDebt) return;

            const schema = payDebtSchema(
                Number(account?.current_balance || 0),
                Number(selectedDebt.remaining_balance)
            );

            const result = schema.safeParse({
                amount: value.amount
            });

            if (!result.success) {
                return {
                    amount: result.error.message,
                };
            }
        },
    },

    onSubmit: async ({ value }) => {
        if (!selectedDebt) return;

        payDebt.mutate(
            {
            obligation_id: selectedDebt.id,
            amount: Number(value.amount),
            },
            {
            onSuccess: () => {
                toast.success("Payment successful");
                setOpen(false);
                form.reset();
            },
            }
        );
    },
  });

  const openPaymentModal = (debt: DebtObligation) => {
    setSelectedDebt(debt);
    setOpen(true);
  };

  return (
    <div className="">
      <h1 className="text-3xl font-semibold mb-4 text-primary-800">Active Debts</h1>

      {isLoading && <p className="text-gray-500">Loading debts...</p>}

      {!isLoading && debts.length === 0 && (
        <p className="text-gray-500">No active debts found.</p>
      )}

      {!isLoading &&
        debts.length > 0 &&
        debts.map((debt: DebtObligation) => (
          <Card key={debt.id} className="p-4 mb-4">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <h2 className="text-lg font-semibold">{debt.lender}</h2>

                <p className="text-2xl font-bold">
                  ₦{Number(debt.remaining_balance).toLocaleString()}
                </p>

                <p className="text-sm text-gray-500">Due date: {debt.due_date}</p>
              </div>

              <div
                className="px-3 py-1 rounded-lg text-xs font-medium"
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
              </div>
            </div>

            <div className="flex gap-3 mt-4">
              <Button
                variant="outline"
                className="py-2 text-sm"
                onClick={() => openPaymentModal(debt)}
              >
                Make Payment
              </Button>

              <Button
                className="py-2 text-sm bg-primary-800 hover:bg-primary-900"
                onClick={() => navigate(`/my-debts/transfer-debt/${debt.id}`)}
              >
                Transfer Debt
              </Button>
            </div>
          </Card>
        ))}

   
        <Dialog open={open} onOpenChange={setOpen}>
            
            <DialogContent className="p-0 overflow-hidden">
                <DialogTitle className="p-2 text-lg ">Make Payment</DialogTitle>
                <div className="p-1 border-b">
                    <p className="text-md text-gray-500">
                    Enter the amount you want to pay.
                    </p>
                </div>

                <form
                    onSubmit={(e) => {
                    e.preventDefault();
                    form.handleSubmit();
                    }}
                    className="flex flex-col gap-6 p-5"
                >
                    <FormFieldWrapper form={form} name="amount">
                    {(field, isInvalid ) => (
                        <div className="flex flex-col gap-3">
                            <Card className="p-2 flex flex-col gap-2">
                                <label
                                htmlFor="amount"
                                className="text-md font-medium text-gray-600"
                                >
                                Amount (₦)
                                </label>

                                <Input
                                    id={field.name}
                                    name={field.name}
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    type="number"
                                    placeholder="Enter amount"
                                    className={`${isInvalid ? "border-red-500" : ""} text-sm`}
                                />
                            </Card>

                        </div>
                    )}
                    </FormFieldWrapper>

                    <Button
                        type="submit"
                        disabled={payDebt.isPending}
                        className="w-full py-3"
                    >
                    {payDebt.isPending ? "Processing..." : "Pay"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    </div>
  );
}
