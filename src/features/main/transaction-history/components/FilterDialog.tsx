import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useState } from "react";

const statuses = [ "all-status", "completed", "failed", "pending" ]
const categories = [ "all_categories", "loan_disbursement", "debt_payment", "deposit" ]

export function FilterDialog({ currentFilter, onFilterChange }: {
    currentFilter: {
        status: string,
        category: string
    },
    onFilterChange: (filterType: "status" | "category", value: string) => void
}) {
    const [open, setOpen] = useState<boolean>();

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="bg-primary-800 rounded-lg text-gbese-white font-semibold p-2.5 text-xs min-w-20">
                Filter
            </DialogTrigger>
            <DialogContent className="bg-gbese-white border border-gbese-neutrals-100 py-8 px-8.5 rounded-[1.25rem] flex flex-col gap-10 sm:max-w-3/5">
                <DialogTitle hidden>Title</DialogTitle>
                <DialogDescription hidden>Description</DialogDescription>
                <div className="flex flex-col gap-3">
                    <h1 className="font-sora font-semibold text-primary-950 text-xl">
                        All Categories
                    </h1>
                    <div className="flex items-center gap-3.25">
                        {categories.map((category) => (
                            <button 
                                className={`p-2.5 rounded-lg border border-gbese-neutrals-100 text-sm ${currentFilter.category === category ? "bg-primary-100" :"bg-inherit"}`}
                                onClick={() => onFilterChange("category", category)}
                            >
                                {category.split("_").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col gap-3">
                    <h1 className="font-sora font-semibold text-primary-950 text-xl">
                        All Status
                    </h1>
                    <div className="flex items-center gap-3.25">
                        {statuses.map((status) => (
                            <button 
                                className={`p-2.5 rounded-lg border border-gbese-neutrals-100 text-sm ${currentFilter.status === status ? "bg-primary-100" :"bg-inherit"}`}
                                onClick={() => onFilterChange("status", status)}
                            >
                                {status.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}
                            </button>
                        ))}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}