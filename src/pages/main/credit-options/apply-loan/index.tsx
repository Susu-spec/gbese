import ApplyLoanForm from "@/features/main/credit-options/components/ApplyLoanForm";

export default function ApplyLoanPage() {
    return (
        <div className="flex flex-col gap-4.5 lg:gap-10">
            <div className="flex flex-col gap-1.5 md:gap-2">
                <h1 className="font-sora text-primary-800 font-semibold text-xl md:text-[2rem]">
                    Almost There, Boss! 😎
                </h1>
                <p className="text-sm md:text-xl text-primary-950 leading-7.5">
                    Let’s Set You Up!
                </p>
            </div>
            <ApplyLoanForm />
        </div>
    )
}