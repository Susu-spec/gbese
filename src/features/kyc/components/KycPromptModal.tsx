import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

export default function KycPromptModal({ 
    open, 
    onClose 
}: 
    { 
        open: boolean; 
        onClose: () => void 
    }) {
        const navigate = useNavigate();


        return (
            <Dialog open={open} onOpenChange={onClose}>
                <DialogContent className="bg-gbese-white border border-gbese-neutrals-100 py-8 px-8.5 rounded-[1.25rem] flex flex-col gap-4 sm:max-w-3/5">
                    <DialogHeader>
                        <DialogTitle className="text-xl md:text-[2rem] font-bold font-sora">Complete Your KYC</DialogTitle>
                    </DialogHeader>

                    <p className="text-sm text-gbese-grey-300">
                        You need to complete your KYC before continuing.
                    </p>

                    <div className="flex flex-wrap justify-end gap-3 mt-5">
                        <Button 
                            variant="secondary" 
                            onClick={onClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={() => {
                                onClose();
                                navigate("/kyc/personal-info");
                            }}
                        >
                            Complete KYC
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
    );
}
