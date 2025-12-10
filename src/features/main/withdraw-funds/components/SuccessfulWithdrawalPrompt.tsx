import { Modal } from "@/components/ui/modal";
import { format } from "date-fns";
import { CheckCircle } from "lucide-react";

export interface WithdrawalProps {
    receiver: string,
    date: Date | string,
    description: string | undefined,
    amount: string
}

export default function SuccessfulWithdrawalPrompt({
    open, onClose, withdrawal
}: { 
    open: boolean, 
    onClose: () => void, 
    withdrawal: WithdrawalProps
}) {
    const {
        receiver,
        date,
        description,
        amount
    } = withdrawal;

    return (
        <Modal 
            open={open} 
            onClose={onClose}
            className="w-full max-w-lg p-6 md:p-10 flex flex-col gap-6 md:gap-8 rounded-4xl"
        >
            <div className="flex flex-col gap-4 items-center">
                <CheckCircle
                    className="text-green-500 size-20 drop-shadow-lg"
                />
                <p className="font-semibold text-[1.75rem]">
                    Withdrawal Successful
                </p>
            </div>
            <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                    <p className="text-base font-semibold">
                        Receiver:
                    </p>
                    <p className="text-base">
                        {receiver}
                    </p>
                </div>
                <div className="flex justify-between items-center">
                    <p className="text-base font-semibold">
                        Date:
                    </p>
                    <p className="text-base">
                        {format(date, 'dd-MM-yyyy')}
                    </p>
                </div>
                {description &&
                    <div className="flex justify-between items-center">
                        <p className="text-base font-semibold">
                            Description:
                        </p>
                        <p className="text-base">
                            {description}
                        </p>
                    </div>
                }
                <div className="flex justify-between items-center">
                    <p className="text-base font-semibold">
                        Amount:
                    </p>
                    <p className="text-base font-semibold">
                        N{(+amount).toLocaleString()}
                    </p>
                </div>
            </div>
        </Modal>
    )
}