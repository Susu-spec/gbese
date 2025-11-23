import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";

interface FormFieldWrapperProps {
    form: any;
    name: string;
    label?: string;
    description?: React.ReactNode;
    children: (field: any, isInvalid: boolean) => React.ReactNode;
}

export default function FormFieldWrapper({
    form,
    name,
    label,
    description,
    children,
}: FormFieldWrapperProps) {
    return (
        <form.Field
            name={name}
            children={(field: any) => {
                const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                    <Field data-invalid={isInvalid} className="flex flex-col gap-2 md:gap-3">
                        {label && (
                            <FieldLabel 
                                htmlFor={field.name}
                                className={`text-gbese-grey-400 font-normal`}
                            >
                                {label}
                            </FieldLabel>
                        )}
                        <div className="flex flex-col gap-1">
                            {/* Input / textarea / select goes here */}
                            {children(field, isInvalid)}

                            {description && (
                                <FieldDescription>
                                    {description}
                                </FieldDescription>
                            )}

                            {/* Error */}
                            {isInvalid && 
                                <FieldError errors={field.state.meta.errors} />}
                        </div>
                    </Field>
                );
            }}
        />
    );
}
