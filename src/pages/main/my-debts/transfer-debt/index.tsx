import { FieldGroup } from "@/components/ui/field";
import { useForm } from "@tanstack/react-form";
import { useNavigate, useParams } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { FormFieldWrapper } from "@/components/shared/form";
import { Card } from "@/components/ui/card";
import { Eye, EyeOff, ArrowLeftCircle } from "lucide-react";
import { useDebt, useTransferDebt } from "@/features/main/my-debts/hook";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import type { DebtMatch } from "@/features/main/types";
import { toast } from "sonner";
import { useState } from "react";

const defaultValues = {
    recipient_id: "",
    incentive_amount: "",
    transfer_type: "direct",
};

export default function TransferDebt() {
    const { obligation_id } = useParams();
    const [showBalance, setShowBalance] = useState(true);

    const { debtMatchQuery } = useDebt();
    const helpers = debtMatchQuery.data.data?.matches || [];
   
    const isLoadingHelpers = debtMatchQuery.isPending;

    const userAccount = useSelector((state: RootState) => state.user.account);

    const transferDebt = useTransferDebt();

    const navigate = useNavigate();

    const handleBack = () => {
        if (window.history.length > 2) {
        navigate(-1); 
        } else {
        navigate("/dashboard");
        }
    };

    const form = useForm({
        defaultValues,
        onSubmit: async ({ value }) => {
            if (!obligation_id) {
                toast.error("Missing obligation ID");
                return;
            }
            if (!value.recipient_id) {
                toast.error("Please select a helper");
                return;
            }

            transferDebt.mutate({
                obligation_id,
                recipient_id: value.recipient_id,
                incentive_amount: Number(value.incentive_amount),
                transfer_type: "direct",
            });
        },
    });

    return (
        <div className="bg-white border rounded-lg">
            <div className="flex items-center gap-2 py-5 px-4">
                <ArrowLeftCircle onClick={handleBack}/>
                <h1 className="font-semibold text-xl">Transfer Debt</h1>
            </div>

            <Card className="m-4 p-4">
                <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                        <p className="text-sm font-medium">Available Balance</p>
                        <button onClick={() => setShowBalance((p) => !p)}>
                            {showBalance ? <Eye /> : <EyeOff />}
                        </button>
                    </div>
                    <p className="text-sm font-medium">Outstanding Debt</p>
                </div>

                {showBalance && (
                    <div className="mt-1 flex justify-between items-center gap-1">
                        <p className="text-lg font-semibold">
                            ₦{Number(userAccount?.current_balance || 0).toLocaleString()}
                        </p>
                        <p className="text-lg font-semibold">
                         ₦
                            {Number(userAccount?.total_debt_obligation || 0).toLocaleString()}
                        </p>
                    </div>
                )}
            </Card>


            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    form.handleSubmit();
                }}
                className="px-4 pb-8 flex flex-col gap-6"
            >
                <FieldGroup className="flex flex-col gap-6">
                    <FormFieldWrapper
                        form={form}
                        label="Select Your Odogwu"
                        name="recipient_id"
                    >
                        {(field) => (
                            <div className="flex flex-col gap-3">
                                {isLoadingHelpers && (
                                    <p className="text-gray-500 text-sm">Loading helpers...</p>
                                )}

                                {!isLoadingHelpers && helpers.length === 0 && (
                                    <p className="text-gray-500 text-sm">
                                        No helpers available at the moment.
                                    </p>
                                )}

                                {!isLoadingHelpers &&
                                    helpers.length > 0 &&
                                    helpers.map((helper: DebtMatch) => (
                                        <Card
                                            key={helper.user_id}
                                            className={`p-4 cursor-pointer border ${
                                                field.state.value === helper.user_id
                                                    ? "border-blue-600"
                                                    : "border-gray-200"
                                            }`}
                                            onClick={() => field.handleChange(helper.user_id)}
                                        >
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <h2 className="font-medium text-base">
                                                        {helper.name}
                                                    </h2>
                                                    <p className="text-sm text-gray-400">
                                                        Available Credit: ₦
                                                        {Number(
                                                            helper.available_credit || 0
                                                        ).toLocaleString()}
                                                    </p>
                                                </div>
                                                <input
                                                    type="radio"
                                                    name="recipient_id"
                                                    checked={field.state.value === helper.user_id}
                                                    onChange={() =>
                                                        field.handleChange(helper.user_id)
                                                    }
                                                />
                                            </div>
                                        </Card>
                                    ))}
                            </div>
                        )}
                    </FormFieldWrapper>

                    <FormFieldWrapper
                        form={form}
                        label="Incentive Amount (₦)"
                        name="incentive_amount"
                    >
                        {(field, isInvalid) => (
                            <Input
                                id={field.name}
                                name={field.name}
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e) => field.handleChange(e.target.value)}
                                type="number"
                                placeholder="Enter incentive"
                                className={`${
                                    isInvalid ? "border-red-500" : ""
                                } text-sm py-3 px-3 rounded-md`}
                            />
                        )}
                    </FormFieldWrapper>
                </FieldGroup>

                <Button
                    type="submit"
                    variant={!form.state.isValid ? "secondary" : "default"}
                    disabled={!form.state.isValid || transferDebt.isPending}
                    className="w-full py-3 px-6"
                >
                    {transferDebt.isPending ? (
                        <span className="flex items-center gap-2">
                            <span>Processing transfer...</span>
                            <Spinner />
                        </span>
                    ) : (
                        "Proceed to Transfer"
                    )}
                </Button>
            </form>
        </div>
    );
}
