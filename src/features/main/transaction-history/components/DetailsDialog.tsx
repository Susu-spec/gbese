import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AlertTriangle, LoaderIcon, X } from "lucide-react"
import GbeseLogo from "@/assets/icons/gbese-logo-light.svg"
import CopyLogo from "@/assets/icons/copy-logo.svg"
import { Separator } from "@/components/ui/separator"
import useTransactionDetail from "../hooks/useTransactionDetail"
import { formatDate, TransactionStatusMap } from "@/lib/utils"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import { useState } from "react"

export const DetailsDialog = ({ referenceNumber }: { referenceNumber: string }) => {
    const [open, setOpen] = useState<boolean>(false);
    const { data, isError, isPending, isLoading, refetch } = useTransactionDetail(referenceNumber);
    const transaction = data?.data?.data;

    const handleCopyId = async () => {
        try {
            await navigator.clipboard.writeText(transaction?.id);
            toast.info("Session ID copied to clipboard!")
        } catch(error: any) {
            toast.error(error.message)
        }
    }


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="" onClick={() => refetch()}>
                <span className="hover:bg-gbese-lilac p-2.5 rounded-lg border border-gbese-neutrals-100 text-sm">
                    View details
                </span>
            </DialogTrigger>
            <DialogContent className="bg-gbese-white p-5 md:p-10 rounded-[1.25rem] sm:max-w-4/5 [&>button]:hidden">
                <DialogTitle hidden>Title</DialogTitle>
                <DialogDescription hidden>Description</DialogDescription>
                <div className="w-full flex justify-end">
                    <DialogClose>
                        <X />
                    </DialogClose>
                </div>
                
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-4 pt-4 md:gap-10 md:pt-10 md:items-end w-full">
                        <img src={GbeseLogo} alt="" className="h-auto w-26.5" />
                        <Separator />
                    </div>
                    {(isPending || isLoading) && (
                        <div className="py-10 w-full flex items-center justify-center">
                            <LoaderIcon className="size-4 animate-spin" />
                        </div>
                    )}

                    {isError && (
                        <div className="flex flex-col items-center gap-3 py-10">
                            <AlertTriangle className="text-red-500" size={32} />
                            <p className="text-xs md:text-sm text-gray-600">We couldn't load your data.</p>
                            <Button onClick={() => refetch()}>Tap to Retry</Button>
                        </div>
                    )}
                    {(!isLoading && !isError && transaction) && (() => {
                        const {
                            id,
                            recipient,
                            status,
                            fee,
                            initiated_at,
                            completed_at
                        } = transaction;
                        const { text, color } = TransactionStatusMap[status as keyof typeof TransactionStatusMap];

                        return (
                            <div className="grid grid-cols-1 lg:grid-rows-3 gap-y-4 gap-x-4 md:gap-y-6 lg:gap-y-8 lg:gap-x-15 justify-between overflow-y-scroll hide-scrollbar">
                                <InfoGrid>
                                    <InfoItem label="Recipient">
                                    <p className="capitalize">{recipient?.name}</p>
                                    <p className="text-gbese-neutrals-200 text-xs md:text-sm font-semibold">
                                        {recipient?.account_number}
                                    </p>
                                    </InfoItem>

                                    <InfoItem label="Bank">Gbese</InfoItem>
                                </InfoGrid>

                                <InfoGrid>
                                    <InfoItem label="Created on">
                                        {format(new Date(initiated_at), "MM-dd-yyyy hh:mm a")}
                                    </InfoItem>

                                    <InfoItem label="Processed on">
                                        {format(new Date(completed_at), "MM-dd-yyyy hh:mm a")}
                                    </InfoItem>

                                    <InfoItem label="Session ID">
                                    <div className="flex justify-between md:gap-1 items-center">
                                        <p className="truncate max-w-50">{id}</p>
                                        <button onClick={() => handleCopyId()}>
                                            <img src={CopyLogo} alt="" />
                                            <p className="hidden">Copy</p>
                                        </button>
                                    </div>
                                    </InfoItem>
                                </InfoGrid>

                                <InfoGrid>
                                    <InfoItem label="Fee">{fee}</InfoItem>

                                    <InfoItem label="Status">
                                    <span style={{ color }}>{text}</span>
                                    </InfoItem>

                                    <InfoItem label="Created on">
                                    {formatDate(initiated_at)}
                                    </InfoItem>
                                </InfoGrid>
                            </div>  
                        );
                    })()}
                </div>
            </DialogContent>
        </Dialog>
    )
}

const InfoItem = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="flex flex-col gap-1">
    <p className="text-gbese-neutrals-200 text-xs md:text-sm font-semibold">{label}</p>
    <div className="text-sm md:text-xl font-semibold text-primary-900">{children}</div>
  </div>
);


const InfoGrid = ({ children }: { children: React.ReactNode }) => (
  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-4">
    {children}
  </div>
);
