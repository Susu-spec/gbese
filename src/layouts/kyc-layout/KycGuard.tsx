/**
 * @fileoverview - Checks if a kyc step has been completed 
 * before proceeding to the next
 */

import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import { toast } from "sonner";

export default function KycGuard({
    requiredStep,
    children,
}: {
    requiredStep: number;
    children: React.ReactNode;
}) {
    const currentStep = useSelector((state: any) => state.kyc.currentStep);

    const isBlocked = currentStep < requiredStep;

    if (isBlocked) {
        toast.error("Please complete the previous step first");

        return <Navigate to="/kyc/personal-info" replace />;
    }

    return <>{children}</>;
}
