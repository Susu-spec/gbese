import { Button, buttonVariants } from "@/components/ui/button";
import { useAppSelector } from "@/store/store";
import { useState } from "react";
import KycPromptModal from "./KycPromptModal";
import type { VariantProps } from "class-variance-authority";


type ButtonBaseProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
};

interface KycProtectedButtonProps extends ButtonBaseProps {
  onAllowed: () => void;
}


/**
 * @description
 * A wrapper around `<Button>` that prevents users from performing
 * certain actions unless their KYC is verified.
 *
 * @usage
 * 1. Navigate to a page only if verified:
 *    <KycProtectedButton onAllowed={() => navigate("/withdraw")}>
 *       Withdraw
 *    </KycProtectedButton>
 *
 * 2. Open a modal if verified:
 *    <KycProtectedButton
 *        className="w-full"
 *        variant="secondary"
 *        onAllowed={() => setOpenTopUpModal(true)}
 *    >
 *       Add Money
 *    </KycProtectedButton>
 *
 * 3. Trigger a function flow:
 *    <KycProtectedButton onAllowed={startPaymentFlow}>
 *       Pay ₦1,200
 *    </KycProtectedButton>
 *
 * @note
 * The `onAllowed` function is run when a user is kyc verified
 *  
 * */ 

export function KycProtectedButton({
    children,
    onAllowed, 
    ...rest
}: KycProtectedButtonProps) {
    const user = useAppSelector((state) => state.user.profile)
    const needsKyc = user.kyc_status !== "verified";
    const [open, setOpen] = useState<boolean>(false);

    return (
        <>
            <Button
                {...rest}
                onClick={() => {
                    if (needsKyc) setOpen(true);
                    else onAllowed();
                }}
            >
                {children}
            </Button>

            <KycPromptModal open={open} onClose={() => setOpen(false)} />
        </>
    );
}
