import { Card, CardAction, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton";
import Analytics from "@/assets/images/cuate.svg";
import WalletSvg from "@/assets/images/rafiki.svg"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button";
import { Award, Wallet } from "lucide-react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { type RootState } from "@/store/store";
import { setIncomingDebtRequests } from "@/features/main/debt-requests/debtRequestsSlice";
import { useUser } from "@/features/main/dashboard/hooks/useUser";
import { TableData } from "@/features/main/dashboard/components/TransactionTable";
import type { DebtRequest } from "@/features/main/dashboard/types";
import DebtRequests from "@/features/main/dashboard/components/DebtRequest";
import { useNavigate } from "react-router";


export default function DashboardPage() {
    const {userQuery, accountQuery, debtReqQuery} = useUser();
    const navigate = useNavigate();

    const handleAccept = (request_id: string) => {
        navigate(`/debt-requests?accept=${request_id}`);
    }

    const handleReject = (request_id: string) => {
        navigate(`/debt-requests?decline=${request_id}`);
    }

    const isLoading = userQuery.isPending || accountQuery.isPending || debtReqQuery.isPending;
    const debtReq = debtReqQuery.data?.data;

    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user?.profile);
    const userAccount = useSelector((state: RootState) => state.user?.account);

    // Sync incoming debt requests to Redux store when data changes
    // Wrapped in useEffect to avoid dispatching during render (prevents "Cannot update component while rendering" error)
    useEffect(() => {
        if (debtReq && Array.isArray(debtReq)) {
            dispatch(setIncomingDebtRequests(debtReq));
        }
    }, [debtReq, dispatch]);


    return (
        <div>
            <div className="mb-4">
                <h2 className="text-3xl font-semibold text-primary-800">How Far, {isLoading ? "Loading..." : user?.first_name || "User"}!</h2>
                <p>Time to balance your gbese and stack some XP. No slackin’ today</p>
            </div>
            <div className="flex gap-3 w-full overflow-x-auto hide-scrollbar mb-6">
                {userAccount && !isLoading ? (
                    <div className="flex justify-between overscroll-x-auto hide-scrollbar w-full gap-3">
                        <Card className="md:w-full md:basis-w-86 md:flex-1 w-44 flex-none h-47.5 p-2">
                            <div className="w-10 p-2 rounded-full flex items-center justify-center bg-gbese-success">
                                <Wallet stroke="#fff" />
                            </div>
                            <CardTitle className="text-lg">Balance</CardTitle>
                            <p className="text-xl">&#8358; {Number(userAccount?.current_balance ?? 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) ?? '0.00'}</p>
                            <a className="text-underline cursor-pointer">Fund Wallet</a>
                        </Card>
                        <Card className="md:w-full md:basis-w-86 md:flex-1 w-44 flex-none h-47.5 p-2">
                            <div className="w-10 p-2 rounded-full flex items-center justify-center bg-gbese-warning">
                                <Wallet stroke="#fff" />
                            </div>
                            <CardTitle className="text-lg">Debt</CardTitle>
                            <p className={`${Number(userAccount?.total_debt_obligation ?? 0) > 0 ? "text-gbese-warning text-xl" : "text-gbese-green"}`}>&#8358; {Number(userAccount?.total_debt_obligation ?? 0) > 0 ? "-" + Number(userAccount?.total_debt_obligation ?? 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0.00'}</p>
                            <a>Fund Wallet</a>
                        </Card>
                        <Card className="md:w-full md:basis-w-86 md:flex-1 w-44 flex-none h-47.5 p-2">
                            <div className="w-10 p-2 rounded-full flex items-center justify-center">
                                <Award />
                            </div>
                            <CardTitle className="text-lg">Credit Score</CardTitle>
                            <p className="text-xl">&#8358; {userAccount?.available_credit}</p>
                            <a>Apply For Credit</a>
                        </Card>
                    </div>
                ) : (
                    <div className="flex justify-between overscroll-x-auto hide-scrollbar w-full gap-3">
                        <Card className="md:w-full md:basis-w-86 md:flex-1 w-44 flex-none h-38 p-2">
                            <Skeleton className="h-8 w-8 rounded-full "/>
                            <Skeleton className="h-20 w-full mt-2"/>
                            <div>
                                <Skeleton className="h-2 w-3/4 mt-2"/>
                                <Skeleton className="h-2 w-1/2 mt-2"/>
                            </div>
                        </Card>
                        <Card className="md:w-full md:basis-w-86 md:flex-1 w-44 flex-none h-38 p-2">
                            <Skeleton className="h-8 w-8 rounded-full "/>
                            <Skeleton className="h-20 w-full mt-2"/>
                            <div>
                                <Skeleton className="h-2 w-3/4 mt-2"/>
                                <Skeleton className="h-2 w-1/2 mt-2"/>
                            </div>
                        </Card>
                        <Card className="md:w-full md:basis-w-86 md:flex-1 w-44 flex-none h-38 p-2">
                            <Skeleton className="h-8 w-8 rounded-full "/>
                            <Skeleton className="h-20 w-full mt-2"/>
                            <div>
                                <Skeleton className="h-2 w-3/4 mt-2"/>
                                <Skeleton className="h-2 w-1/2 mt-2"/>
                            </div>
                        </Card>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 gap-2 lg:grid-cols-2 xl:grid-cols-3 lg:gap-3">
                <Card className="xl:col-span-2">
                    <CardHeader>
                        <CardTitle>Activity Breakdown</CardTitle>
                        <CardAction>
                            <Select>
                                <SelectTrigger className="w-[120px]">
                                    <SelectValue placeholder="Monthly" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="apple">Monthly</SelectItem>
                                        <SelectItem value="banana">Weekly</SelectItem>
                                        <SelectItem value="blueberry">Yearly</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                                </Select>
                        </CardAction>
                    </CardHeader>
                    {!isLoading ? (
                        <TableData/>
                    ) : (
                        <div className="flex flex-col text-center items-center justify-center">
                            <img src={Analytics} alt="Analytics" />
                            <p className="xl:w-92 md:w-72 w-64 text-gbese-grey-100">Your activity will show here once you start borrowing, repaying, or transferring gbese.</p>
                        </div>
                    )}
                </Card>
                <Card className="col-span-1 p-2">There is meant to be something here but I dont think I want to put any spinning thing here</Card>
                <Card className="xl:col-span-2">
                    <CardHeader>
                        <CardTitle>Transaction History</CardTitle>
                    </CardHeader>
                    {!isLoading ? (
                        <TableData/>
                    ) : (      
                        <div className="flex flex-col text-center items-center justify-center">
                            <img src={WalletSvg} alt="Wallet-svg" />
                            <p className="xl:w-92 md:w-72 w-64 text-gbese-grey-100">No transactions yet. Once you start flipping gbese, your history will appear here.</p>
                        </div>
                    )}
                </Card>
                <Card className="col-span-1 p-4">
                    <div className="mb-3 text-center">
                        <h2 className="font-sora font-semibold text-2xl text-primary-800 mb-1">Debt Requests</h2>
                        <p className="text-sm text-primary-900">Accept Request to help save a person financial life. Abeg! Big Dawg</p>
                    </div>
                    {!isLoading && debtReq && debtReq.length > 0 ? (
                        debtReq.slice(0, 3).map((dr: DebtRequest) => (
                            <DebtRequests key={dr.id} debtRequest={dr} handleAccept={() => handleAccept(dr.id)} handleReject={() => handleReject(dr.id)} />
                        ))
                    ) : !isLoading ? (
                        <div className="flex flex-col text-center items-center justify-center p-4">
                            <p>No gbese requests for now. Send one yourself!</p>
                            <Button className="bg-primary-800 mt-4 w-fit">Send Request</Button>
                        </div>
                    ) : (
                        <div className="flex justify-center p-4">
                            <p>Loading requests...</p>
                        </div>
                    )}
                </Card>
            </div>
        </div>
    )
}