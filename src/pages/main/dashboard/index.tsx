import { Card, CardAction, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import type { DashboardCardProps } from "@/utils/types"
import { useState } from "react";
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


export default function DashboardPage() {
    const [mockItems, _setMockItems] = useState<DashboardCardProps[]>([]);
    const [activity, _setActivity] = useState<any[]>([]);
    const [transactions, _setTransactions] = useState<any[]>([]);
    const [debtRequests, _setDebtRequests] = useState<any[]>([]);
    return (
        <div>
            <div className="mb-4">
                <h2 className="text-3xl font-semibold text-primary-800">How Far, Charles!</h2>
                <p>Time to balance your gbese and stack some XP. No slackin’ today</p>
            </div>
            <div className="flex gap-3 w-full overflow-x-auto hide-scrollbar mb-6">
                {mockItems.length > 0 ? (
                    <div className="flex w-full gap-3">
                        <Card className="w-full h-38 p-2">
                            <div>
                                <Wallet />
                            </div>
                            <CardTitle>Balance</CardTitle>
                            <p>&#8358; 0.00</p>
                            <p>Fund Wallet</p>
                        </Card>
                        <Card className="w-full h-38 p-2">
                            <div>
                                <Wallet />
                            </div>
                            <CardTitle>Balance</CardTitle>
                            <p>&#8358; 0.00</p>
                            <p>Fund Wallet</p>
                        </Card>
                        <Card className="w-full h-38 p-2">
                            <div>
                                <Award />
                            </div>
                            <CardTitle>Balance</CardTitle>
                            <p>&#8358; 0.00</p>
                            <p>Fund Wallet</p>
                        </Card>
                    </div>
                ) : (
                    <div className="flex justify-between overscroll-x-auto hide-scrollbar w-full gap-3">
                        <Card className="md:w-full md:max-w-86 md:flex-1 w-44 flex-none h-38 p-2">
                            <Skeleton className="h-8 w-8 rounded-full "/>
                            <Skeleton className="h-20 w-full mt-2"/>
                            <div>
                                <Skeleton className="h-2 w-3/4 mt-2"/>
                                <Skeleton className="h-2 w-1/2 mt-2"/>
                            </div>
                        </Card>
                        <Card className="md:w-full md:max-w-86 md:flex-1 w-44 flex-none h-38 p-2">
                            <Skeleton className="h-8 w-8 rounded-full "/>
                            <Skeleton className="h-20 w-full mt-2"/>
                            <div>
                                <Skeleton className="h-2 w-3/4 mt-2"/>
                                <Skeleton className="h-2 w-1/2 mt-2"/>
                            </div>
                        </Card>
                        <Card className="md:w-full md:max-w-86 md:flex-1 w-44 flex-none h-38 p-2">
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
                    {activity.length > 0 ? activity.map((act, index) => (
                        <div key={index}>{act}</div>
                    )) : (
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
                    {transactions.length > 0 ? transactions.map((tx, index) => (
                        <div key={index}>{tx}</div>
                    )) : (      
                        <div className="flex flex-col text-center items-center justify-center">
                            <img src={WalletSvg} alt="Wallet-svg" />
                            <p className="xl:w-92 md:w-72 w-64 text-gbese-grey-100">No transactions yet. Once you start flipping gbese, your history will appear here.</p>
                        </div>
                    )}
                </Card>
                <Card className="col-span-1">
                    {debtRequests.length > 0 ? debtRequests.map((dr, index) => (
                        <div key={index}>{dr}</div>
                    )) : (
                        <div className="flex flex-col text-center items-center justify-center p-4">
                            <p>No gbese requests for now. Send one yourself!</p>
                            <Button className="bg-primary-800 mt-4 w-fit">Send Request</Button>
                        </div>
                    )}
                </Card>
            </div>
        </div>
    )
}