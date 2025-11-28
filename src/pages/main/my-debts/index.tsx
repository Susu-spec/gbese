import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { useUser } from "@/features/main/dashboard/hooks/useUser";
import ActiveDebts from "@/features/main/my-debts/components/ActiveDebts";
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
        <div>
            <div>
                <h1 className="text-3xl text-primary-800 font-semibold">My Debts - GBESE</h1>
                <p>Track, Manage, and Transfer your debt in one place.</p>
            </div>
            <div className="flex gap-4 mb-6">
                <Card className="w-2/3">
                    <CardTitle>Total Outstanding</CardTitle>
                    <CardContent>
                        <p className="text-xl text-primary-800">&#8358; {isLoading ? "0.00" : Number(account?.total_debt_obligation ?? 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                        <div className="flex justify-between">
                            <p>Due date: </p>
                            <div className="flex gap-2">
                                <Button className="px-1 py-2 bg-primary-800 text-white">Make Payment</Button>
                                <Button className="px-1 py-2 text-primary-800 bg-white border border-primary-800">Transfer Debt</Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="w-1/3">
                    <CardTitle>Debt Shuffle Program</CardTitle>
                    <CardContent>
                        <p>Join our community debt redistribution program for potential debt reduction of 5-15%</p>
                    </CardContent>
                    <Button>
                        <ArrowRight/>
                        <p>Learn More</p>
                    </Button>
                </Card>
            </div>

            <div>
                <div className="w-full px-6 items-center flex justify-between mb-4 ">
                    <div onClick={() => handleTabChange("active")} className={tabValue === "active" ? "border-b-2 border-primary-800 h-18 flex items-center " : ""}>
                        <p>Active Debts</p>
                    </div>
                    <div onClick={() => handleTabChange("transferred")} className={tabValue === "transferred" ? "border-b-2 border-primary-800 h-18 flex items-center" : ""}>
                        <p>Transferred Debts</p>
                    </div>
                    <div onClick={() => handleTabChange("history")} className={tabValue === "history" ? "border-b-2 border-primary-800 h-18 flex items-center" : ""}>
                        <p>Debt History</p>
                    </div>
                </div>
                <div>
                    {tabValue === "active" ? (
                        <ActiveDebts />
                    ) : tabValue === "transferred" ? (
                        <div>
                            <p>Transferred Debts Content</p>
                        </div>
                    ) : (
                        <div>
                            <p>Debt History Content</p>
                        </div>
                    )}
                </div>
            </div>

        </div>
    )
}


