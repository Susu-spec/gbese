import { useState } from "react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import DebtManagementChart from "./DebtManagementChart";

export default function WhyChooseGbeseSection() {
    const [activeSlide, setActiveSlide] = useState(0);

    const slides = [
        {
            icon: "flat-color-icons:debt",
            title: "Debt Made Simple",
            description: "Track your debt, set reminders, and automate payments. No drama, no long talk.",
        },
        {
            icon: "ic:baseline-transfer-within-a-station",
            title: "Transfer Debts",
            description: "Need help paying? Let someone else cover you (with their consent). Stay accountable without the pressure.",
        },
        {
            icon: "token-branded:trust",
            title: "Built for Trust",
            description: "Use cash or crypto; your choice. Smart contracts keep repayments secure on-chain when you want extra peace of mind.",
        },
        {
            icon: "tabler:award",
            title: "Earn While You Help",
            description: "Every good gbe$e deed earns you XP. Transfer debts, pay on time, help others, then watch your rewards rack up.",
        },
    ];

    return (
        <section
            id="why-choose-gbese"
            className="w-full bg-gbese-white py-16 px-5 md:py-20 md:px-20 border-b border-[rgba(179,179,179,1)]"
        >
            <div className="mx-auto max-w-[1440px]">
                <h2 className="mx-auto max-w-[337px] md:max-w-[1140px] text-center font-sora text-[1.75rem] font-semibold leading-10 text-primary-900 md:text-[3.75rem] md:leading-[5.625rem]">
                    Why Choose Gbese?
                </h2>

                <p className="mx-auto mt-4 max-w-[337px] md:max-w-[1140px] text-center font-poppins text-lg font-medium leading-9 text-gbese-black/80 md:mt-6 md:text-[1.5rem]">
                    One app to manage, repay, transfer, and stay on top of your debt game — with ease and style.
                </p>

                <div className="mt-12 flex flex-col items-center justify-center gap-11 md:mt-16 md:flex-row md:gap-8">
                    <DebtManagementChart />

                    <div className="flex w-full flex-col items-center gap-10 md:w-auto">
                        <div className="flex items-start gap-3 md:gap-4">
                            {/* Sliding indicator bar */}
                            <div className="relative h-[746px] md:h-[614px] w-[11px] md:w-3 shrink-0 overflow-hidden rounded-[20px] md:rounded-full bg-gray-200">
                                <div
                                    className="absolute w-full rounded-[20px] md:rounded-full bg-primary-500 transition-all duration-300 ease-in-out"
                                    style={{
                                        height: `${100 / slides.length}%`,
                                        top: `${(activeSlide * 100) / slides.length}%`,
                                    }}
                                />
                            </div>

                            <div className="flex w-[306px] md:w-auto md:max-w-[540px] flex-col gap-3 md:gap-8">
                                {slides.map((slide, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setActiveSlide(index)}
                                        className={`flex items-start gap-[22px] md:gap-4 rounded-[20px] md:rounded-lg py-6 px-2.5 md:p-6 text-left transition-all duration-300 ${
                                            activeSlide === index
                                                ? 'border border-primary-500 md:border-2 bg-primary-50'
                                                : 'border border-transparent md:border-2 bg-transparent hover:bg-gray-50'
                                        }`}
                                    >
                                        <Icon
                                            icon={slide.icon}
                                            className="mt-1 shrink-0"
                                            width={32}
                                            height={32}
                                        />
                                        <div className="flex flex-col gap-2">
                                            <h3 className={`font-poppins text-lg md:text-[1.25rem] font-bold leading-[150%] ${
                                                activeSlide === index ? 'text-primary-600' : 'text-gbese-black'
                                            }`}>
                                                {slide.title}
                                            </h3>
                                            <p className={`font-poppins text-base font-normal leading-6 ${
                                                activeSlide === index ? 'text-gbese-black/80' : 'text-gbese-black/60'
                                            }`}>
                                                {slide.description}
                                            </p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <Link to="/sign-up" className="w-full md:w-auto">
                            <Button
                                className="w-full md:w-auto h-[60px] rounded-lg bg-primary-900 px-6 font-poppins text-lg font-semibold text-white hover:bg-primary-800 transition-all duration-300 hover:scale-105 hover:shadow-xl"
                            >
                                Join Gbese Now
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
