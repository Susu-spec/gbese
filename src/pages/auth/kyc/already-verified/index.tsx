/**
 * @fileoverview - Shows up when a kyc verified user tries to access the
 * kyc flow by typing into the browser tab or an accidental routing.
 * 
 */

import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router";

export default function KycAlreadyVerifiedPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 md:px-0">
        <div className="relative mb-4">
            <CheckCircle 
                className="text-green-500 size-20 drop-shadow-lg"
            />
            <div className="absolute inset-0 animate-ping rounded-full bg-green-500/20"></div>
        </div>
        <h1 className="text-3xl font-semibold text-center">
            Your KYC is Verified
        </h1>
        <p className="text-muted-foreground mt-3 max-w-md text-center leading-relaxed">
            Your account is fully activated! No further action required.
        </p>
        <div className="mt-2 backdrop-blur-md border rounded-xl px-6 py-4 shadow-md max-w-md text-center">
            <p className="text-sm text-primary-700 dark:text-primary-300">
                If you ever need to update your information,  
                you can do so from the Profile section.
            </p>
        </div>
        <Button
            className="mt-8 px-8 py-3 rounded-lg shadow-md"
            onClick={() => navigate("/dashboard")}
        >
            Go to Dashboard
        </Button>
    </div>
  );
}
