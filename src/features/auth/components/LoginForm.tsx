import { FormFieldWrapper } from "@/components/shared/form"
import { Button } from "@/components/ui/button"
import { FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { loginSchema } from "@/lib/schemas/loginSchema"
import { useForm } from "@tanstack/react-form"
import { useAuth } from "../hooks/useAuth"
import { useState } from "react"


const defaultValues = {
    email: "",
    password: ""
}

export default function LoginForm() {
    const { signIn } = useAuth();

    const [_value, _setValue] = useState()
    const form = useForm({
        defaultValues: defaultValues,
        validators: {
            onSubmit: loginSchema,
            onChange: loginSchema
        },
        onSubmit: async ({ value }) => {
            // signIn.mutate({
            //     email: value.email,
            //     password: value.password
            // })
            
        }
    })

    return (
        <form
            id="log-in-form"
            onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit();
            }}
            className="w-full flex flex-col gap-8"
        >
            <FieldGroup className="flex flex-col gap-3 md:gap-5">
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
                            className={`${isInvalid ? 'border-red-500' : ''} text-gbese-black text-xs md:text-sm py-3 px-2 md:py-4 md:px-4 rounded-md`}
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
                    disabled={!form.state.isValid || form.state.isSubmitting}
                    className="w-full py-3 px-6 h-fit">
                    Sign In
                </Button>
                <p className="text-sm leading-5.25">
                    By signing up, you agree to our 
                    <span className="font-bold cursor-pointer">
                        Terms & Conditions
                    </span>
                </p>
            </div>        
        </form>
    )
}