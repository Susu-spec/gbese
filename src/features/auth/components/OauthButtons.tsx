import { SiApple } from "react-icons/si";
import GoogleG from "@/assets/icons/google.svg";

export function OAuthButtons() {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    const googleUrl = `${baseUrl}/auth/google/redirect`;
    const appleUrl = `${baseUrl}/auth/apple/redirect`;

    return (
        <div className="flex flex-col gap-1.75 md:gap-3 items-center w-full">
            <button
                className="oauth-button pointer-events-none"
                onClick={() => (window.location.href = googleUrl)}
            >
                <img src={GoogleG} alt="Google" width="24" />
                <span>Continue with Google</span>
            </button>

            <button
                className="oauth-button pointer-events-none"
                onClick={() => (window.location.href = appleUrl)}
            >
                <SiApple size={24} />
                <span>Continue with Apple</span>
            </button>
        </div>
    );
}
