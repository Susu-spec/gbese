import { FormFieldWrapper } from "@/components/shared/form";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm } from "@tanstack/react-form";
import { useAuth } from "../hooks/useAuth";
import { Spinner } from "@/components/ui/spinner";
import { signupSchema } from "../schemas/signupSchema";

const defaultValues = {
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    password: ""
}

export default function SignUpForm() {
    const { signUp } = useAuth();

    const form = useForm({
        defaultValues: defaultValues,
        validators: {
            onSubmit: signupSchema,
            onChange: signupSchema
        },
        onSubmit: async ({ value }) => {
            signUp.mutate({
                email: value.email,
                password: value.password,
                first_name: value.firstName,
                last_name: value.lastName,
                phone_number: value.phoneNumber.startsWith("+")
                ? value.phoneNumber
                : `+${value.phoneNumber}`,
            });
        }
    })

    return (
        <form
            id="sign-up-form"
            onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit()
            }}
            className="w-full flex flex-col gap-11.5 md:gap-20"
        >
            <FieldGroup className="flex flex-col gap-3 md:gap-5">
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
                            className={`${isInvalid ? 'border-red-500' : ''} text-xs md:text-sm py-3 px-2 md:py-4 md:px-4 rounded-md`}
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
                            className={`${isInvalid ? 'border-red-500' : ''} text-xs md:text-sm py-3 px-2 md:py-4 md:px-4 rounded-md`}
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
                            className={`${isInvalid ? 'border-red-500' : ''} text-xs md:text-sm py-3 px-2 md:py-4 md:px-4 rounded-md`}
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
                            placeholder="Enter your phone number: should start with 234"
                            className={`${isInvalid ? 'border-red-500' : ''} text-xs md:text-sm py-3 px-2 md:py-4 md:px-4 rounded-md`}
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
                            className={`${isInvalid ? 'border-red-500' : ''} text-xs md:text-sm py-3 px-2 md:py-4 md:px-4 rounded-md`}
                        />
                    )}
                </FormFieldWrapper>
            </FieldGroup>

            <div className="flex flex-col gap-2.25 md:gap-4 justify-center items-center">
                <Button 
                    variant={!form.state.isValid ? "secondary" : "default"} 
                    disabled={!form.state.isValid || signUp.isPending}
                    className="w-full py-3 px-6 h-fit">
                    {signUp.isPending ?
                        <span className="flex items-center gap-1">
                            <span>Give us a second</span>
                            <Spinner />
                        </span> 
                            : 
                        "Create Account"
                    }
                </Button>
                <p className="text-sm leading-5.25 text-center">
                    By signing up, you agree to our 
                    <span className="font-bold cursor-pointer">
                        &nbsp;Terms & Conditions
                    </span>
                </p>
            </div>
        </form>
    )
}