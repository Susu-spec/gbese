import { useUser } from "@/features/main/dashboard/hooks/useUser";
import ActiveDebts from "@/features/main/my-debts/components/ActiveDebts";
import TransferredDebts from "@/features/main/my-debts/components/TransferredDebts";
import type { RootState } from "@/store/store";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";

type TabValue = "active" | "transferred" | "history" ;

export default function MyDebtsPage() {
    const [tabValue, setTabValue] = useState<TabValue>("active");
    const {accountQuery} = useUser();
    const isLoading = accountQuery.isPending;
    
    const account = useSelector((state: RootState) => state.user?.account);
    const handleTabChange = (value: TabValue) => {
        setTabValue(value);
    }

    return (
        <div className="flex flex-col gap-4 md:gap-8">
            <div className="flex flex-col gap-2">
                <h1 className="text-xl md:text-3xl text-primary-800 font-semibold">My Debts - GBESE</h1>
                <p className="text-sm md:text-base">Track, Manage, and Transfer your debt in one place.</p>
            </div>
            <div className="flex flex-col lg:flex-row md:flex-row gap-4">
                <div className="lg:w-2/3 w-full bg-white p-8 rounded-xl shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Total Outstanding</h2>
                    <div>
                        <p className="text-xl md:text-3xl text-primary-800 font-semibold">&#8358; {isLoading ? "0.00" : Number(account?.total_debt_obligation ?? 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                    </div>
                </div>
                <div className="lg:w-1/3 w-full bg-[#EFE3FF] p-4 rounded-xl flex flex-col gap-4">
                    
                    <div className="flex flex-col gap-1">
                        <h2 className="font-semibold text-xl">Debt Shuffle Program</h2>
                        <p>Join our community debt redistribution program for potential debt reduction of 5-15%</p>
                        
                    </div>
                    <button disabled className="w-full bg-gbese-white rounded-xl flex items-center gap-6 justify-center p-2 cursor-default">
                            <ArrowRight size={20}/>
                            <p className="font-semibold text-sm">Coming soon</p>
                        </button>
                </div>
            </div>

            <div className="flex flex-col gap-5">
                <div className="w-full items-center flex md:justify-between mb-4 gap-4 overflow-x-auto flex-nowrap whitespace-nowrap hide-scrollbar">
                    <button onClick={() => handleTabChange("active")} className={`${tabValue === "active" ? "border-b-2 border-primary-800 h-18 flex items-center whitespace-nowrap font-semibold" : ""} text-sm md:text-base`}>
                        <p>Active Debts</p>
                    </button>
                    <button onClick={() => handleTabChange("transferred")} className={`${tabValue === "transferred" ? "border-b-2 border-primary-800 h-18 flex items-center whitespace-nowrap font-semibold" : ""} text-sm md:text-base`}>
                        <p>Transferred Debts</p>
                    </button>
                    <button onClick={() => handleTabChange("history")} className={`${tabValue === "history" ? "border-b-2 border-primary-800 h-18 flex items-center whitespace-nowrap font-semibold" : ""} text-sm md:text-base`}>
                        <p>Debt History</p>
                    </button>
                </div>
                <div>
                    {tabValue === "active" ? (
                        <ActiveDebts />
                    ) : tabValue === "transferred" ? (
                        <div>
                            <TransferredDebts/>
                        </div>
                    ) : (
                        <div>
                            <p>Coming soon...</p>
                        </div>
                    )}
                </div>
            </div>

        </div>
    )
}


