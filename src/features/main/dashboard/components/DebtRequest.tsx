import { Button } from "@/components/ui/button";
import type { DebtRequest } from "../types"

const DebtRequests = ({debtRequest, handleAccept, handleReject}: {debtRequest: DebtRequest, handleAccept: () => void, handleReject: () => void}) => {

    return(
        <div className="w-full">
            <div className="mb-2 text-center">
                <h2 className="text-3xl font-bold">Debt Requests</h2>
                <p>Accept Request to help save a person financial life. Abeg! Big Dawg</p>
            </div>
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-2xl">{debtRequest.sender.first_name}</h2>
                <p className="text-2xl">&#8358; {Number(debtRequest.debt.remaining_balance).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
            <div className="flex justify-between ">
                <Button onClick={handleAccept} className="w-1/3 p-2 bg-gbese-success text-white text-lg">Accept</Button>
                <Button onClick={handleReject} className="w-1/3 p-2 bg-[#F5D8D8] text-[#EF4444] text-lg">Reject</Button>
            </div>
            <hr className="h-6 my-2"/>
        </div>
    )
}
export default DebtRequests;
