import SignUpForm from "@/features/auth/components/SignUpForm";
import { Link } from "react-router";

export default function SignUpPage() {
    return (
        <div className="flex flex-col gap-8 md:gap-14">
            <div className="flex flex-col items-center gap-1.75 md:gap-3">
                <h1 className="font-sora text-2xl md:text-5xl font-semibold leading-18">
                    Create an account?
                </h1>
                <p className="text-lg flex gap-1">
                    Have an account? 
                    <Link to="/sign-in" className="text-primary-900 font-semibold">
                        Login
                    </Link>
                </p>
            </div>
            <div className="flex flex-col gap-8 items-center w-full">
                <div className="flex flex-col gap-3 items-center w-full">
                    <button className="oauth-button py-4.25">
                        <span>
                            Continue with Google
                        </span>
                    </button>
                    <button className="oauth-button py-4.25">
                        <span>
                            Continue with Apple
                        </span>
                    </button>
                </div>
                <p className="w-full font-medium text-black text-center">OR</p>
                <SignUpForm />
            </div>
        </div>
    )
}