/**
 * @fileoverview - Checks if a kyc step has been completed 
 * before proceeding to the next.
 * - Also returns the already verified page if a kyc verified user
 * tries to visit a kyc flow.
 */

import { useAppSelector } from "@/store/store";
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
    const user = useAppSelector((state) => state.user.profile)
    const isVerified = user.kyc_status === "verified";

    const isBlocked = currentStep < requiredStep;

    if (isVerified) {
        return <Navigate to="/kyc/already-verified" replace />;
    }

    if (isBlocked) {
        toast.error("Please complete the previous step first");

        return <Navigate to="/kyc/personal-info" replace />;
    }

    return <>{children}</>;
}
