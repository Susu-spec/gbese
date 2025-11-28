import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

export default function MyDebtsPage() {
    return (
        <div>
            <div>
                <h1>My Debts - GBESE</h1>
                <p>Track, Manage, and Transfer your debt in one place.</p>
            </div>
            <div>
                <Card>
                    <CardTitle>Total Outstanding</CardTitle>
                    <CardContent>
                        <p>0.00</p>
                        <div>
                            <p>Due date: Invalid date</p>
                            <div>
                                <Button>Make Payment</Button>
                                <Button>Transfer Debt</Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
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

            <div></div>

        </div>
    )
}