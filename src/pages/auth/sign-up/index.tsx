import SignUpForm from "@/features/auth/components/SignUpForm";
import { AuthHeader } from "@/layouts/auth-layout/AuthHeader";
import { OAuthButtons } from "@/features/auth/components/OauthButtons";

export default function SignUpPage() {
    return (
        <div className="flex flex-col gap-8 md:gap-14">
            <AuthHeader
                title="Create an account?"
                subtitle="Have an account?"
                linkText="Login"
                linkTo="/sign-in"
            />
            <div className="flex flex-col gap-4.5 md:gap-8 items-center w-full">
                <OAuthButtons />
                <p className="w-full font-medium text-black text-center text-sm md:text-base">OR</p>
                <SignUpForm />
            </div>
        </div>
    )
}