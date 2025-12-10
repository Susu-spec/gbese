import { FieldGroup } from "@/components/ui/field";
import { Separator } from "@/components/ui/separator";
import { useForm } from "@tanstack/react-form";
import { useParams } from "react-router";
import { applyLoanSchema } from "../../schemas/applyLoanSchema";
import { FormFieldWrapper } from "@/components/shared/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useApplyLoan } from "../hooks";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { KycProtectedButton } from "@/features/kyc/components/KycProtectedButton";

const defaultValues = {
    amount: "",
    tenureMonths: "",
    purpose: "",
    employmentStatus: "",
    incomeRange: ""
}

export default function ApplyLoanForm() {
    const { providerId } = useParams();
    const applyLoan = useApplyLoan();

    const form = useForm({
        defaultValues: defaultValues,
        validators: {
            onSubmit: applyLoanSchema,
            onChange: applyLoanSchema
        },
        onSubmit: async ({ value }) => {
            if (!providerId) {
                toast.error("Missing provider");
                return;
            }
            applyLoan.mutate({
                provider_id: providerId,
                amount: Number(value.amount),
                tenure_months: Number(value.tenureMonths),
                purpose: value.purpose
            })
        }
    })

    return (
        <div className="bg-gbese-white border border-gbese-neutrals-200 rounded-lg">
            <div className="py-5 px-1.5 md:px-5 lg:px-16">
                <h1 className="font-semibold text-xl lg:text-[1.75rem]">
                    Instant Loan Approval System
                </h1>
            </div>
            <Separator className="bg-gbese-neutrals-200"/>
            <form 
                id="apply-loan-form"
                onSubmit={(e) => {
                    e.preventDefault();
                    form.handleSubmit();
                }}
                className="py-5 lg:py-15 px-1.5 md:px-5 lg:px-16 flex flex-col items-end gap-6 md:gap-8 lg:gap-14"
            >
                <FieldGroup className="flex flex-col gap-6">
                    <FormFieldWrapper
                        form={form}
                        label="Amount  (₦)"
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
                                placeholder="Enter loan amount"
                                className={`${isInvalid ? 'border-red-500' : ''} text-xs md:text-sm py-2 px-2 md:py-4 md:px-4 rounded-md`}
                            />
                        )}
                    </FormFieldWrapper>
                    <FormFieldWrapper
                        form={form}
                        label="Purpose"
                        name="purpose"
                    >
                        {(field, isInvalid) => (
                            <Input
                                id={field.name}
                                name={field.name}
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e) => field.handleChange(e.target.value)}
                                type="text"
                                placeholder="Purpose of loan"
                                className={`${isInvalid ? 'border-red-500' : ''} text-xs md:text-sm py-2 px-2 md:py-4 md:px-4 rounded-md`}
                            />
                        )}
                    </FormFieldWrapper>
                    <FormFieldWrapper
                        form={form}
                        label="Employment Status"
                        name="employmentStatus"
                    >
                        {(field, isInvalid) => (
                            <Select 
                                onValueChange={field.handleChange} 
                                value={field.state.value}
                            >
                                <SelectTrigger className={`${isInvalid ? 'border-red-500' : ''} text-xs md:text-sm py-2 px-2 md:py-4 h-fit! md:px-4 rounded-md w-full`}>
                                    <SelectValue placeholder="Select employment status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="employed">Employed</SelectItem>
                                    <SelectItem value="selfEmployed">Self-employed</SelectItem>
                                    <SelectItem value="freelancer">Freelancer</SelectItem>
                                    <SelectItem value="unemployed">Unemployed</SelectItem>
                                    <SelectItem value="student">Student</SelectItem>
                                </SelectContent>
                            </Select>
                        )}
                    </FormFieldWrapper>
                    <FormFieldWrapper
                        form={form}
                        label="Monthly income range"
                        name="incomeRange"
                    >
                        {(field, isInvalid) => (
                            <Select 
                                onValueChange={field.handleChange} 
                                value={field.state.value}
                            >
                                <SelectTrigger className={`${isInvalid ? 'border-red-500' : ''} text-xs md:text-sm py-2 px-2 md:py-4 h-fit! md:px-4 rounded-md w-full`}>
                                    <SelectValue placeholder="Select income range" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="0-50k">₦0 – ₦50,000</SelectItem>
                                    <SelectItem value="500001-100k">₦50,001 – ₦100,000</SelectItem>
                                    <SelectItem value="100001-250k">₦100,001 – ₦250,000</SelectItem>
                                    <SelectItem value="250001-500k">₦250,001 – ₦500,000</SelectItem>
                                    <SelectItem value="500001-1M">₦500,001 – ₦1,000,000</SelectItem>
                                    <SelectItem value=">1M">Above ₦1,000,000</SelectItem>
                                </SelectContent>
                            </Select>
                        )}
                    </FormFieldWrapper>
                    <FormFieldWrapper
                        form={form}
                        label="Tenure months"
                        name="tenureMonths"
                    >
                        {(field, isInvalid) => (
                            <Select 
                                onValueChange={field.handleChange} 
                                value={field.state.value} 
                                defaultValue={field.state.value}
                            >
                                <SelectTrigger className={`${isInvalid ? 'border-red-500' : ''} text-xs md:text-sm py-2 px-2 md:py-4 h-fit! md:px-4 rounded-md w-full`}>
                                    <SelectValue placeholder="Select tenure" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="3">3 months</SelectItem>
                                    <SelectItem value="6">6 months</SelectItem>
                                    <SelectItem value="9">9 months</SelectItem>
                                    <SelectItem value="12">12 months</SelectItem>
                                </SelectContent>
                            </Select>
                        )}
                    </FormFieldWrapper>
                </FieldGroup>

                <KycProtectedButton
                    type="button"
                    variant={!form.state.isValid ? "secondary" : "default"} 
                    disabled={!form.state.isValid || applyLoan.isPending}
                    onAllowed={() => form.handleSubmit()}
                    className="w-fit py-3 px-6 h-fit">
                        {applyLoan.isPending ?
                            <span className="flex items-center gap-1">
                                <span>Give us a second to process</span>
                                <Spinner />
                            </span> 
                                : 
                            "Submit application"
                        }
                </KycProtectedButton>
            </form>
        </div>
    )
}