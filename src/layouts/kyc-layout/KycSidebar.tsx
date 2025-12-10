import { KycSidebarIcon } from "@/components/shared/sidebar-icons"
import GbeseLogo from "@/assets/images/gbese-logo.svg"
import { useLocation } from "react-router"
import { kycSteps } from "@/features/kyc/data";

export default function KycSidebar() {
    const location = useLocation();
    const pathname = location.pathname;

    const currentStep = pathname.split("/").pop(); 
    const currentIndex = kycSteps.findIndex(
        (step) => step.path === currentStep
    );

    return (
        <aside 
            className="fixed
                hidden lg:max-w-2/5 min-h-screen
                bg-primary-900 px-5 lg:px-11 py-9.5
                1200:flex flex-col
            "
        >
            <div className="flex flex-col gap-8 h-full">
                <div className="w-full flex items-start flex-col gap-8">
                    <img src={GbeseLogo} alt="Gbese" className="h-auto w-26.5" />
                    <h1 className="text-[2rem] font-semibold text-gbese-white">
                        KYC Verification
                    </h1>
                </div>

                <div className="w-full flex flex-col gap-4 justify-start overflow-y-auto hide-scrollbar">
                    {kycSteps.map((step, index) => {
                        const isActive = index <= currentIndex

                        return (
                             <KYCStep 
                                key={step.id} 
                                isActive={isActive} 
                                step={step} 
                            />
                        )
                    })}
                </div>
            </div>
        </aside>
    )
}


const KYCStep = ({ step, isActive }: { 
    isActive: boolean,
    step: { 
        id: string, 
        title: string, 
        description: string 
    }}) => {
        const { id, title, description } = step;
        const color = isActive ? "#F9FAFB" : "#B3B3B3";

    return (
        <div key={id} className="flex gap-4 justify-start items-center transition-all">
            <KycSidebarIcon color={color} />
            <div className="flex flex-col gap-1.5">
                <p style={{ color: color }} className="font-medium">Step {id}</p>
                <p style={{ color: color }}className="font-semibold">{title}</p>
                <p style={{ color: color }}>{description}</p>
            </div>
        </div>
    )
}