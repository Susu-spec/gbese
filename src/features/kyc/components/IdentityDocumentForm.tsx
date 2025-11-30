import { useForm } from "@tanstack/react-form"
import { identityDocumentSchema } from "../kycSchemas"
import { FieldGroup } from "@/components/ui/field";
import { FormFieldWrapper } from "@/components/shared/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronDown } from "lucide-react";
import DownloadIcon from "@/assets/icons/download-icon.svg"
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import type { IdentityDocumentFormValues } from "@/features/kyc/types";
import { useKyc } from "../hooks/useKyc";
import { Spinner } from "@/components/ui/spinner";

const defaultValues: IdentityDocumentFormValues = {
    documentType: "",
    file: null
}


export default function IdentityDocumentForm() {
    const navigate = useNavigate();
    const { uploadDocument } = useKyc();

    const form = useForm({
        defaultValues,
        validators: {
            onSubmit: identityDocumentSchema,
        },
        onSubmit: async ({ value }) => {
            uploadDocument.mutate({
                document_type: value.documentType,
                file: value.file
            })
        }
    })

    return (
        <form 
            id="upload-doc-form"
            onSubmit={(e) => {
                e.preventDefault(),
                form.handleSubmit()
            }}
            className="flex flex-col gap-10"
        >
            <FieldGroup className="flex flex-col gap-10">
                <FormFieldWrapper
                    form={form}
                    label="Select Document Type"
                    name="identityDocument"
                >
                    {(field, isInvalid) => (
                        <Select
                            defaultValue={field.state.value}
                            onValueChange={field.handleChange}
                            value={field.state.value}
                        >
                            <SelectTrigger className={`${isInvalid ? 'border-red-500' : 'border-primary-900'} relative h-fit! text-sm p-4 rounded-md w-full`}>
                                <SelectValue placeholder="Select document type" />
                                <div className="bg-primary-700 absolute right-3 w-8 h-8 rounded-md z-10 flex items-center justify-center">
                                    <ChevronDown className="text-gbese-white"/>
                                </div>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="national-id">National ID</SelectItem>
                                <SelectItem value="drivers_license">Drivers License</SelectItem>
                                <SelectItem value="passport">Passport</SelectItem>
                                <SelectItem value="utility_bill">Utility Bill</SelectItem>
                                <SelectItem value="bank_statement">Bank Statement</SelectItem>
                                <SelectItem value="selfie">Selfie</SelectItem>
                            </SelectContent>
                        </Select>
                    )}
                </FormFieldWrapper>
                <FormFieldWrapper
                    form={form}
                    name="file"
                >
                    {(field, isInvalid) => (
                        <div className={`${isInvalid ? 'border-red-500' : 'border-gbese-neutrals-100'} relative border border-dashed rounded-lg py-15 px-20 md:px-36`}>
                            <div className="flex flex-col gap-2 items-center text-center">
                                <img src={DownloadIcon} alt="" />
                                <p className="text-xs text-primary-900">
                                    Upload or Drag and drop back ID document
                                </p>
                                <p className="text-[.625rem] text-gbese-neutrals-200">
                                    Supported formats: JPG, PNG, PDF (Max 5MB)
                                </p>
                            </div>
                            <input
                                type="file"
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                accept=".pdf, .doc, .docx"
                                onChange={(e) => field.handleChange(e.target.files?.[0] ?? null)}
                            />
                        </div>
                    )}
                </FormFieldWrapper>
            </FieldGroup>
            <div className="flex-col md:flex-row gap-4 flex justify-end">
                <Button
                    variant="secondary"
                    className="w-full md:w-fit py-3 px-6 h-fit"
                    onClick={() => navigate("/kyc/personal-info")}
                    type="button"
                >
                    Back
                </Button>
                <Button
                    variant={!form.state.isValid ? "secondary" : "default"} 
                    className="w-full md:w-fit py-3 px-6 h-fit"
                >
                    {uploadDocument.isPending ?
                        <span className="flex items-center gap-1">
                            <span>Submitting</span>
                            <Spinner />
                        </span> 
                            : 
                        "Submit"
                    }
                </Button>
            </div>
        </form>
    )
}