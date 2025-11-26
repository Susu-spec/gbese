import LoanProviderLogo from "@/assets/icons/loan-provider-logo.svg";
import type { CreditProvider } from "../../types";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

export const CreditProviderCard = ({ creditProvider }: {
    creditProvider: CreditProvider
}) => {
    const navigate = useNavigate();
    const {
        id,
        name,
        maxTenureMonths,
        defaultInterestRate,
        minLoanAmount,
        maxLoanAmount
    } = creditProvider;

    const min = (+minLoanAmount).toLocaleString();
    const max = (+maxLoanAmount).toLocaleString();

    return (
        <div className="flex flex-col gap-8 p-6 rounded-lg bg-gbese-white border border-primary-200 shadow-[0px_4px_4px_0px_#75757540]">
            <div className="flex gap-2 items-center">
                <img src={LoanProviderLogo} alt="" />
                <h2 className="font-sora text-primary-800 font-semibold leading-7.5 text-2xl">
                    {name}
                </h2>
            </div>
            <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center">
                    <p className="text-gbese-grey-300 leading-5.25">Interest Rate</p>
                    <p className="font-medium leading-5.25">{defaultInterestRate}</p>
                </div>
                <div className="flex justify-between items-center">
                    <p className="text-gbese-grey-300 leading-5.25">Terms</p>
                    <p className="font-medium leading-5.25">{maxTenureMonths * 30} days</p>
                </div>
                <div className="flex justify-between items-center">
                    <p className="text-gbese-grey-300 leading-5.25">Min - Max</p>
                    <p className="font-medium leading-5.25">{`₦${min} - ₦${max}`}</p>
                </div>
            </div>
            <Button 
                onClick={() => {
                    navigate(`/credit-options/apply/${id}`)
                }}
                className="text-sm text-gbese-white"
            >
                Apply Now
            </Button>
        </div>
    )
}