import LoginForm from "@/features/auth/components/LoginForm";
import { AuthHeader } from "@/layouts/auth-layout/AuthHeader";
import { OAuthButtons } from "@/features/auth/components/OauthButtons";
import { useEffect } from "react";
import { toast } from "sonner";

export default function SignInPage() {

    useEffect(() => {
        if (sessionStorage.getItem("expired") === "1") {
            sessionStorage.removeItem("expired");
            toast.error("Your session expired. Please log in again.");
        }
    }, []);
    
    return (
        <div className="flex flex-col gap-8">
            <AuthHeader
                title="Welcome back!"
                subtitle="Don't have an account?"
                linkText="Create account"
                linkTo="/sign-up"
            />
            <div className="flex flex-col gap-4.5 md:gap-8 items-center w-full">
                <OAuthButtons />
                <p className="w-full font-medium text-black text-center text-sm md:text-base">OR</p>
                <LoginForm />
            </div>
        </div>
    )
}