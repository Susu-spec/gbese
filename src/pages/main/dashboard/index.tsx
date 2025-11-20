import { Card, CardAction, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import type { DashboardCardProps } from "@/utils/types"
import { useState } from "react";
import Analytics from "@/assets/cuate.svg";
import WalletSvg from "@/assets/rafiki.svg"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button";


export default function DashboardPage() {
    const [mockItems, setMockItems] = useState<DashboardCardProps[]>([]);
    const [activity, setActivity] = useState<any[]>([]);
    const [transactions, setTransactions] = useState<any[]>([]);
    const [debtRequests, setDebtRequests] = useState<any[]>([]);
    return (
        <div>
            <div>
                <h2 className="text-3xl font-semibold text-primary-800">How Far, Charles!</h2>
                <p>Time to balance your gbese and stack some XP. No slackin’ today</p>
            </div>
            <div className="flex gap-3 w-full p-3">
                {mockItems.length > 0 ? mockItems.map((item, index) => (
                    <Card key={index} className="p-2 w-full h-[150px]">
                        <img src={item.icon} alt={item.title} />
                        <CardTitle>{item.title}</CardTitle>
                        <p>{item.amount}</p>
                        <a href={item.href}>{item.href}</a>
                    </Card>
                )) : (
                    <div className="flex w-full gap-3">
                        <Card className="w-full h-[150px] p-2">
                            <Skeleton className="h-8 w-8 rounded-full "/>
                            <Skeleton className="h-20 w-full mt-2"/>
                            <div>
                                <Skeleton className="h-2 w-3/4 mt-2"/>
                                <Skeleton className="h-2 w-1/2 mt-2"/>
                            </div>
                        </Card>
                        <Card className="w-full h-[150px] p-2">
                            <Skeleton className="h-8 w-8 rounded-full "/>
                            <Skeleton className="h-20 w-full mt-2"/>
                            <div>
                                <Skeleton className="h-2 w-3/4 mt-2"/>
                                <Skeleton className="h-2 w-1/2 mt-2"/>
                            </div>
                        </Card>
                        <Card className="w-full h-[150px] p-2">
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

            <div className="grid grid-cols-3 p-2 gap-3">
                <Card className="col-span-2">
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
                            <p className="w-[450px] text-gbese-grey-100">Your activity will show here once you start borrowing, repaying, or transferring gbese.</p>
                        </div>
                    )}
                </Card>
                <Card className="col-span-1">Falling</Card>
                <Card className="col-span-2">
                    <CardHeader>
                        <CardTitle>Transaction History</CardTitle>
                    </CardHeader>
                    {transactions.length > 0 ? transactions.map((tx, index) => (
                        <div key={index}>{tx}</div>
                    )) : (      
                        <div className="flex flex-col text-center items-center justify-center">
                            <img src={WalletSvg} alt="Wallet-svg" />
                            <p className="w-[450px] text-gbese-grey-100">No transactions yet. Once you start flipping gbese, your history will appear here.</p>
                        </div>
                    )}
                </Card>
                <Card className="col-span-1">
                    {debtRequests.length > 0 ? debtRequests.map((dr, index) => (
                        <div key={index}>{dr}</div>
                    )) : (
                        <div className="flex flex-col text-center items-center justify-center p-4">
                            <p>No gbese requests for now. Send one yourself!</p>
                            <Button className="bg-primary-800 mt-4 w-full">Send Request</Button>
                        </div>
                    )}
                </Card>
            </div>
        </div>
    )
}