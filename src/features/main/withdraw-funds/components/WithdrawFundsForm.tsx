import { useForm } from "@tanstack/react-form";
import { withdrawFundsSchema } from "../withdrawFundsSchemas";
import { FieldGroup } from "@/components/ui/field";
import { FormFieldWrapper } from "@/components/shared/form";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import SuccessfulWithdrawalPrompt from "./SuccessfulWithdrawalPrompt";
import type { WithdrawFundsValue } from "../../types";
import { useWithdraw } from "../hooks";

const defaultValues: WithdrawFundsValue = {
    amount: "",
    bankName: "",
    bankCode: "",
    accountNumber: "",
    reason: ""
}

export default function WithdrawFundsForm() {
    const [openSuccessful, setIsOpenSuccessful] = useState(false);
    const withdrawFunds = useWithdraw();
    
    const form = useForm({
        defaultValues: defaultValues,
        validators: {
            onChange: withdrawFundsSchema,
            onSubmit: withdrawFundsSchema
        },
        onSubmit: async ({ value }) => {
            withdrawFunds.mutate({
                amount: value.amount,
                account_number: value.accountNumber,
                bank_code: value.bankCode,
                narration: value.reason
            })
            setTimeout(() => {
                setIsOpenSuccessful(true);
            }, 3000)

        }
    })

    return (
        <>
            <form
                id="withdraw-funds-form"
                onSubmit={(e) => {
                    e.preventDefault();
                    form.handleSubmit();
                }}
                className="flex flex-col gap-8 items-end"
            >
                <FieldGroup className="flex flex-col gap-4">
                    <FormFieldWrapper
                        form={form}
                        label="Amount (₦)"
                        name="amount"
                    >
                        {(field, isInvalid) => (
                            <Input
                                id={field.name}
                                name={field.name}
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e) => field.handleChange(e.target.value)}
                                type="text"
                                placeholder="Enter your amount"
                                className={`${isInvalid ? 'border-red-500' : ''} text-gbese-black text-xs md:text-sm py-2 px-3 md:py-2.5 md:px-4 rounded-[.625rem]!`}
                            />
                        )}
                    </FormFieldWrapper>
                    <FormFieldWrapper
                        form={form}
                        label="Bank Name"
                        name="bankName"
                    >
                        {(field, isInvalid) => (
                            <Input
                                id={field.name}
                                name={field.name}
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e) => field.handleChange(e.target.value)}
                                type="text"
                                placeholder="Enter your bank name"
                                className={`${isInvalid ? 'border-red-500' : ''} text-gbese-black text-xs md:text-sm py-2 px-3 md:py-2.5 md:px-4 rounded-[.625rem]!`}
                            />
                        )}
                    </FormFieldWrapper>
                     <FormFieldWrapper
                        form={form}
                        label="Bank Code"
                        name="bankCode"
                    >
                        {(field, isInvalid) => (
                            <Input
                                id={field.name}
                                name={field.name}
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e) => field.handleChange(e.target.value)}
                                type="text"
                                placeholder="Enter your bank code"
                                className={`${isInvalid ? 'border-red-500' : ''} text-gbese-black text-xs md:text-sm py-2 px-3 md:py-2.5 md:px-4 rounded-[.625rem]!`}
                            />
                        )}
                    </FormFieldWrapper>
                    <FormFieldWrapper
                        form={form}
                        label="Account Number"
                        name="accountNumber"
                    >
                        {(field, isInvalid) => (
                            <Input
                                id={field.name}
                                name={field.name}
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e) => field.handleChange(e.target.value)}
                                type="text"
                                placeholder="Enter your account number"
                                className={`${isInvalid ? 'border-red-500' : ''} text-gbese-black text-xs md:text-sm py-2 px-3 md:py-2.5 md:px-4 rounded-[.625rem]!`}
                            />
                        )}
                    </FormFieldWrapper>
                    <FormFieldWrapper
                        form={form}
                        label="Reason for withdrawal (Optional)"
                        name="reason"
                    >
                        {(field, isInvalid) => (
                            <Input
                                id={field.name}
                                name={field.name}
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e) => field.handleChange(e.target.value)}
                                type="text"
                                placeholder="Enter your reason for withdrawal"
                                className={`${isInvalid ? 'border-red-500' : ''} text-gbese-black text-xs md:text-sm py-2 px-3 md:py-2.5 md:px-4 rounded-[.625rem]!`}
                            />
                        )}
                    </FormFieldWrapper>
                </FieldGroup>
                <Button
                    variant={!form.state.isValid ? "secondary" : "default"} 
                    disabled={!form.state.isValid || withdrawFunds.isPending}
                    className="min-w-60 py-3 px-6 h-fit">
                        {withdrawFunds.isPending ?
                            <span className="flex items-center gap-1">
                                <span>Give us a second to process</span>
                                <Spinner />
                            </span> 
                                : 
                            "Withdraw now"
                        }
                </Button>
            </form>
            {openSuccessful &&
                <SuccessfulWithdrawalPrompt
                    open={openSuccessful}
                    onClose={() => setIsOpenSuccessful(false)}
                    withdrawal={{
                        receiver: form.state.values.accountNumber,
                        amount: form.state.values.amount,
                        date: new Date(),
                        description: form.state.values?.reason
                    }}
                />
            }
        </>
    )
}