import { useState, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import type { DebtObligation } from "../../types";
import { AlertCircle } from "lucide-react";

interface SelectedDebt {
  obligation_id: string;
  amount: number;
}

interface DebtSelectionModalProps {
  open: boolean;
  onClose: () => void;
  debts: DebtObligation[];
  onConfirm: (selectedDebts: SelectedDebt[]) => void;
  isLoading?: boolean;
}

export function DebtSelectionModal({
  open,
  onClose,
  debts,
  onConfirm,
  isLoading = false,
}: DebtSelectionModalProps) {
  const [selectedDebts, setSelectedDebts] = useState<Map<string, number>>(new Map());
  const [errors, setErrors] = useState<Map<string, string>>(new Map());

  const activeDebts = useMemo(
    () => debts.filter((debt) => 
      debt.status === "active" && Number(debt.remaining_balance) > 0
    ),
    [debts]
  );

  const totalSelectedAmount = useMemo(() => {
    return Array.from(selectedDebts.values()).reduce((sum, amount) => sum + amount, 0);
  }, [selectedDebts]);

  function handleToggleDebt(debtId: string, maxAmount: number) {
    const newSelected = new Map(selectedDebts);
    const newErrors = new Map(errors);
    
    if (newSelected.has(debtId)) {
      newSelected.delete(debtId);
      newErrors.delete(debtId);
    } else {
      newSelected.set(debtId, maxAmount);
    }
    
    setSelectedDebts(newSelected);
    setErrors(newErrors);
  }

  function handleAmountChange(debtId: string, value: string, maxAmount: number) {
    const amount = Number(value);
    const newSelected = new Map(selectedDebts);
    const newErrors = new Map(errors);

    if (amount <= 0) {
      newErrors.set(debtId, "Amount must be greater than zero");
    } else if (amount > maxAmount) {
      newErrors.set(debtId, `Amount cannot exceed ₦${maxAmount.toLocaleString()}`);
    } else {
      newErrors.delete(debtId);
    }

    newSelected.set(debtId, amount);
    setSelectedDebts(newSelected);
    setErrors(newErrors);
  }

  function handleConfirm() {
    const hasErrors = errors.size > 0;
    const hasInvalidAmounts = Array.from(selectedDebts.values()).some(
      (amount) => amount <= 0
    );

    if (hasErrors || hasInvalidAmounts) {
      return;
    }

    const debtsToSubmit: SelectedDebt[] = Array.from(selectedDebts.entries()).map(
      ([obligation_id, amount]) => ({
        obligation_id,
        amount,
      })
    );

    onConfirm(debtsToSubmit);
  }

  function handleClose() {
    setSelectedDebts(new Map());
    setErrors(new Map());
    onClose();
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Select Debts to Pay</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {activeDebts.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <AlertCircle className="mx-auto size-12 mb-2 text-muted-foreground/50" />
              <p>No active debt obligations found</p>
            </div>
          ) : (
            <>
              {activeDebts.map((debt) => {
                const maxAmount = Number(debt.remaining_balance);
                const isSelected = selectedDebts.has(debt.id);
                const currentAmount = selectedDebts.get(debt.id) || maxAmount;
                const error = errors.get(debt.id);

                return (
                  <div
                    key={debt.id}
                    className="border rounded-lg p-4 space-y-3"
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleToggleDebt(debt.id, maxAmount)}
                        className="mt-1 size-5 rounded border-primary-200 text-primary-800 focus:ring-2 focus:ring-primary-400"
                      />
                      <div className="flex-1 space-y-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-medium">{debt.lender}</p>
                            <p className="text-sm text-muted-foreground">
                              Principal: ₦{Number(debt.principal_amount).toLocaleString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">
                              ₦{maxAmount.toLocaleString()}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Due: {new Date(debt.due_date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Interest Rate: {debt.interest_rate}%
                        </p>
                      </div>
                    </div>

                    {isSelected && (
                      <div className="ml-8 space-y-1">
                        <Label htmlFor={`amount-${debt.id}`} className="text-sm">
                          Payment Amount (₦)
                        </Label>
                        <Input
                          id={`amount-${debt.id}`}
                          type="number"
                          value={currentAmount}
                          onChange={(e) =>
                            handleAmountChange(debt.id, e.target.value, maxAmount)
                          }
                          max={maxAmount}
                          min={1}
                          step={100}
                          className="max-w-xs"
                        />
                        {error && (
                          <p className="text-sm text-destructive">{error}</p>
                        )}
                        <p className="text-xs text-muted-foreground">
                          Max: ₦{maxAmount.toLocaleString()}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}

              {selectedDebts.size > 0 && (
                <div className="border-t pt-4 space-y-2">
                  <div className="flex items-center justify-between font-semibold">
                    <span>Total Payment</span>
                    <span className="text-lg">
                      ₦{totalSelectedAmount.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {selectedDebts.size} debt{selectedDebts.size > 1 ? "s" : ""} selected
                  </p>
                </div>
              )}
            </>
          )}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={
              selectedDebts.size === 0 ||
              errors.size > 0 ||
              isLoading
            }
          >
            {isLoading ? (
              <>
                <Spinner className="size-4" />
                <span>Processing...</span>
              </>
            ) : (
              `Pay ₦${totalSelectedAmount.toLocaleString()}`
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
