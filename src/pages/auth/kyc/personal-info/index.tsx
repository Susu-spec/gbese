import PersonalInfoForm from "@/features/kyc/components/PersonalInfoForm";

export default function PersonalInfo() {
    return (
        <div className="flex flex-col gap-4.5 md:gap-10">
            <div className="flex flex-col gap-2">
                <h1 className="font-semibold text-xl md:text-[2rem]">
                    Personal Information
                </h1>
                <p className="text-xs md:text-sm">
                    Please provide your basic personal details.
                </p>
            </div>
           
            <PersonalInfoForm />
        </div>
    )
}