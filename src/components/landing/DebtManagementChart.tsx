import { useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import type { ChartConfig } from "@/components/ui/chart";
import { Icon } from "@iconify/react";

export default function DebtManagementChart() {
    const [isHovered, setIsHovered] = useState(false);

    const chartData = [
        { month: "Jan", debtsManaged: 186, transfers: 80 },
        { month: "Feb", debtsManaged: 305, transfers: 200 },
        { month: "Mar", debtsManaged: 120, transfers: 237 },
        { month: "Apr", debtsManaged: 190, transfers: 273 },
    ];

    const chartConfig = {
        debtsManaged: {
            label: "Debts Managed",
            color: "#0735D2", // primary-500 (base)
        },
        transfers: {
            label: "Debt Transfers",
            color: "#ACBCF0", // primary-100
        },
    } satisfies ChartConfig;

    return (
        <div
            className="relative w-full max-w-[630px] shrink-0 rounded-[20px] bg-white p-6 shadow-sm"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <h3 className="mb-6 font-sora text-[20px] font-semibold leading-[30px] text-gbese-black">
                How Gbese Members Are Thriving
            </h3>
            <div className="relative">
                <ChartContainer config={chartConfig} className="min-h-[520px] w-full">
                    <BarChart
                        accessibilityLayer
                        data={chartData}
                        margin={{ left: 20, right: 20, top: 10, bottom: 40 }}
                    >
                        <CartesianGrid vertical={false} strokeDasharray="3 3" />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tick={{ fill: "#111111", fontSize: 14, fontFamily: "Poppins" }}
                        />
                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            tick={{ fill: "#111111", fontSize: 14, fontFamily: "Poppins" }}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="dashed" />}
                        />
                        <Bar
                            dataKey="debtsManaged"
                            fill="var(--color-debtsManaged)"
                            radius={[8, 8, 0, 0]}
                            barSize={40}
                        />
                        <Bar
                            dataKey="transfers"
                            fill="var(--color-transfers)"
                            radius={[8, 8, 0, 0]}
                            barSize={40}
                        />
                    </BarChart>
                </ChartContainer>

                {/* Hover Overlay */}
                {isHovered && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center rounded-lg bg-white/95 p-8 transition-opacity duration-300">
                        {/* Main Stats Card */}
                        <div className="w-full max-w-md rounded-2xl border-2 border-primary-500 bg-white p-6 shadow-lg">
                            {/* Header */}
                            <div className="mb-4 flex items-center gap-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-100">
                                    <Icon icon="mdi:chart-line" width={24} height={24} className="text-primary-600" />
                                </div>
                                <div>
                                    <h4 className="font-sora text-lg font-semibold text-gbese-black">
                                        Community Growth
                                    </h4>
                                    <p className="font-poppins text-sm text-gbese-black/60">
                                        Jan - Apr 2025
                                    </p>
                                </div>
                            </div>

                            {/* Stats Grid */}
                            <div className="mb-4 grid grid-cols-2 gap-4">
                                <div className="rounded-lg bg-primary-50 p-4">
                                    <div className="mb-1 flex items-center gap-2">
                                        <div className="h-3 w-3 rounded-full bg-primary-500"></div>
                                        <p className="font-poppins text-xs text-gbese-black/70">Debts Managed</p>
                                    </div>
                                    <p className="font-poppins text-2xl font-bold text-primary-600">898</p>
                                    <p className="mt-1 font-poppins text-xs text-green-600">↑ 23% growth</p>
                                </div>
                                <div className="rounded-lg bg-primary-50 p-4">
                                    <div className="mb-1 flex items-center gap-2">
                                        <div className="h-3 w-3 rounded-full bg-primary-100"></div>
                                        <p className="font-poppins text-xs text-gbese-black/70">Transfers</p>
                                    </div>
                                    <p className="font-poppins text-2xl font-bold text-primary-400">690</p>
                                    <p className="mt-1 font-poppins text-xs text-green-600">↑ 18% growth</p>
                                </div>
                            </div>

                            {/* Key Insight */}
                            <div className="rounded-lg bg-linear-to-r from-primary-50 to-primary-100 p-4">
                                <div className="flex items-start gap-2">
                                    <Icon icon="mdi:lightbulb" width={20} height={20} className="mt-0.5 shrink-0 text-primary-600" />
                                    <div>
                                        <p className="mb-1 font-poppins text-sm font-semibold text-gbese-black">
                                            Key Insight
                                        </p>
                                        <p className="font-poppins text-xs leading-relaxed text-gbese-black/70">
                                            Members who use debt transfers are 2.5x more likely to pay on time and earn rewards faster.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
