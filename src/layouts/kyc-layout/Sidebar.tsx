import { KycSidebarIcon } from "@/components/shared/sidebar-icons"
import GbeseLogo from "@/assets/images/gbese-logo.svg"
import { useLocation } from "react-router"

export default function KYCSidebar() {
    const location = useLocation();
    const pathname = location.pathname;

    const currentStep = pathname.split("/").pop(); 

    return (
        <aside 
            className="
                hidden md:max-w-1.5/5
                lg:max-w-2/5 min-h-screen
                bg-primary-900 px-11 py-9.5
                lg:flex flex-col
            "
        >
            <div className="flex flex-col justify-between h-full">
                <div className="w-full flex items-start flex-col gap-16">
                    <img src={GbeseLogo} alt="Gbese" className="h-auto w-26.5" />
                    <h1 className="text-[2rem] font-semibold text-gbese-white">
                        KYC Verification
                    </h1>
                </div>

                <div className="w-full flex items-start">
                    {steps.map((step) => {
                        const isActive = step.path === currentStep;

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


const steps = [
    {
        id: "1",
        title: "Personal Information",
        path: "personal-info",
        description: "Enter your name, email and phone number."
    },
    {
        id: "2",
        title: "Identity Document",
        path: "identity-document",
        description: "Upload a valid government ID."
    },
    {
        id: "3",
        title: "Review and Submit",
        path: "review",
        description: "Confirm your info before submitting."
    }
]

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
        <div key={id} className="flex gap-4 justify-center">
            <KycSidebarIcon color={color} />
            <div className="flex flex-col gap-1.5">
                <p style={{ color: color }} className="font-medium">Step {id}</p>
                <p style={{ color: color }}className="font-semibold">{title}</p>
                <p style={{ color: color }}>{description}</p>
            </div>
        </div>
    )
}