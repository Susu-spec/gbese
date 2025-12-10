import { Button } from "@/components/ui/button";
import type { DebtRequest } from "../types"

const DebtRequests = ({debtRequest, handleAccept, handleReject}: {debtRequest: DebtRequest, handleAccept: () => void, handleReject: () => void}) => {

    return(
        <div className="w-full">
            <div className="flex flex-col gap-2 mb-3">
                <div className="flex justify-between items-center">
                    <h3 className="font-sora font-semibold text-lg text-primary-900">{debtRequest.sender.first_name}</h3>
                    <p className="font-sora font-semibold text-lg text-primary-900">&#8358;{Number(debtRequest.debt.remaining_balance).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                </div>
            </div>
            <div className="flex gap-2">
                <Button onClick={handleAccept} className="flex-1 bg-primary-700 hover:bg-primary-800 text-white text-sm">Accept</Button>
                <Button onClick={handleReject} className="flex-1 bg-white text-primary-900 border border-primary-300 hover:bg-primary-50 text-sm">Reject</Button>
            </div>
            <hr className="h-px my-3 bg-primary-200 border-0"/>
        </div>
    )
}
export default DebtRequests;
