import SignUpForm from "@/features/auth/components/SignUpForm";
import { Link } from "react-router";
import { SiApple } from "react-icons/si"
import GoogleG from "@/assets/icons/google.svg"

export default function SignUpPage() {
    return (
        <div className="flex flex-col gap-8 md:gap-14">
            <div className="flex flex-col items-center gap-1.75 md:gap-3">
                <h1 className="font-sora text-2xl md:text-5xl font-bold md:font-semibold leading-9 md:leading-18">
                    Create an account?
                </h1>
                <p className="text-sm md:text-lg flex flex-wrap gap-1 justify-center">
                    <span>Have an account? </span>
                    <Link to="/sign-in" className="text-primary-900 font-semibold">
                        Login
                    </Link>
                </p>
            </div>
            <div className="flex flex-col gap-4.5 md:gap-8 items-center w-full">
                <div className="flex flex-col gap-1.75 md:gap-3 items-center w-full">
                    <button className="oauth-button items-center px-4 py-2 md:py-4.25">
                        <img 
                            src={GoogleG}
                            alt="Google" 
                            width="24"
                        />
                        <span>
                            Continue with Google
                        </span>
                    </button>
                    <button className="oauth-button items-center px-4 py-2 md:py-4.25">
                        <SiApple size={24} />
                        <span>
                            Continue with Apple
                        </span>
                    </button>
                </div>
                <p className="w-full font-medium text-black text-center text-sm md:text-base">OR</p>
                <SignUpForm />
            </div>
        </div>
    )
}