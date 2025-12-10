import IdentityDocumentForm from "@/features/kyc/components/IdentityDocumentForm";

export default function IdentityDocument() {
    return (
        <div className="flex flex-col gap-4.5 md:gap-10">
            <div className="flex flex-col gap-4 md:gap-8">
                <div className="flex flex-col gap-2">
                    <h1 className="font-semibold text-xl md:text-[2rem]">
                        Identity Document
                    </h1>
                    <p className="text-xs md:text-sm">
                        Please upload a valid ID document (Passport, Driver's license, or National ID card)
                    </p>
                </div>
                <div className="py-5 px-6 bg-primary-150 rounded-xl">
                    <p className="text-xs md:text-sm">
                        Please upload a clear photo or scan of your ID, ensuring your name, photo, and ID number are fully visible without glare, blur, or cropping
                    </p>
                </div>
            </div>
            <IdentityDocumentForm />
        </div>
    )
}