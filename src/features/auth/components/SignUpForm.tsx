import { FormFieldWrapper } from "@/components/shared/form";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { signupSchema } from "@/lib/schemas/signupSchema";
import { useForm } from "@tanstack/react-form";

const defaultValues = {
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    password: ""
}

export default function SignUpForm() {
    const form = useForm({
        defaultValues: defaultValues,
        validators: {
            onSubmit: signupSchema,
            onChange: signupSchema
        },
        onSubmit: async (values) => {
            console.log(values)
        }
    })

    return (
        <form
            id="sign-up-form"
            onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit()
            }}
            className="w-full flex flex-col gap-20"
        >
            <FieldGroup className="flex flex-col gap-2.25 md:gap-5">
                <FormFieldWrapper
                    form={form}
                    label="First Name"
                    name="firstName"
                >
                    {(field, isInvalid) => (
                        <Input
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            type="text"
                            placeholder="Enter your first name"
                            className={`${isInvalid ? 'border-red-500' : ''} py-2 px-3 md:py-4 md:px-4 rounded-md`}
                        />
                    )}
                </FormFieldWrapper>
                <FormFieldWrapper
                    form={form}
                    label="Last Name"
                    name="lastName"
                >
                    {(field, isInvalid) => (
                        <Input
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            placeholder="Enter your last name"
                            className={`${isInvalid ? 'border-red-500' : ''} py-2 px-3 md:py-4 md:px-4 rounded-md`}
                        />
                    )}
                </FormFieldWrapper>
                <FormFieldWrapper
                    form={form}
                    label="Email"
                    name="email"
                >
                    {(field, isInvalid) => (
                        <Input
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            type="email"
                            placeholder="Enter your email"
                            className={`${isInvalid ? 'border-red-500' : ''} py-2 px-3 md:py-4 md:px-4 rounded-md`}
                        />
                    )}
                </FormFieldWrapper>
                <FormFieldWrapper
                    form={form}
                    label="Phone Number"
                    name="phoneNumber"
                >
                    {(field, isInvalid) => (
                        <Input
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            type="text"
                            placeholder="Enter your phone number"
                            className={`${isInvalid ? 'border-red-500' : ''} py-2 px-3 md:py-4 md:px-4 rounded-md`}
                        />
                    )}
                </FormFieldWrapper>
                <FormFieldWrapper
                    form={form}
                    label="Password"
                    name="password"
                >
                    {(field, isInvalid) => (
                        <Input
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            type="password"
                            placeholder="Enter your password"
                            className={`${isInvalid ? 'border-red-500' : ''} py-2 px-3 md:py-4 md:px-4 rounded-md`}
                        />
                    )}
                </FormFieldWrapper>
            </FieldGroup>

            <div className="flex flex-col gap-4 justify-center items-center">
                <Button 
                    variant={!form.state.isValid ? "secondary" : "default"} 
                    disabled={!form.state.isValid || form.state.isSubmitting}
                    className="w-full py-3 px-6">
                    Create Account
                </Button>
                <p className="text-sm leading-5.25">
                    By signing up, you agree to our <span className="font-bold">Terms & Conditions</span>
                </p>
            </div>
        </form>
    )
}