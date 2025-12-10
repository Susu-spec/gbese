import { Progress } from "@/components/ui/progress";
import { kycSteps } from "@/features/kyc/data";
import { useLocation } from "react-router";

export default function KycProgressBar() {
    const { pathname } = useLocation();
    const currentStep = pathname.split("/").pop();
    const currentIndex = kycSteps.findIndex(
        (step) => step.path === currentStep
    );

    const percent = currentIndex >= 0
        ? ((currentIndex + 1) / kycSteps.length) * 100
        : 0;

    return (
        <div className="mt-5 flex flex-col w-full">
            <div className="w-full text-center 1200:hidden">
                <h1 className="font-bold text-3xl">KYC Verification</h1>
            </div>
            <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                    <p className="text-xs">{currentIndex + 1} of {kycSteps.length}</p>
                    <p className="text-xs">{percent}% Complete</p>
                </div>
                <Progress value={percent} className="h-4"/>
            </div>
        </div>
    )
}