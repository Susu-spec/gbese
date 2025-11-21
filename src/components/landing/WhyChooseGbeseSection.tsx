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
            className="w-full bg-gbese-white"
            style={{ padding: '80px', borderBottom: '1px solid rgba(179, 179, 179, 1)' }}
        >
            <div className="mx-auto max-w-[1440px]">
                {/* Section Header */}
                <h2 className="mx-auto max-w-[1140px] text-center font-sora text-[28px] font-semibold leading-[42px] text-primary-900 md:text-[60px] md:leading-[90px]">
                    Why Choose Gbese?
                </h2>

                {/* Subtitle */}
                <p className="mx-auto mt-4 max-w-[1140px] text-center font-poppins text-base font-medium leading-6 text-gbese-black/80 md:mt-6 md:text-[24px] md:leading-9">
                    One app to manage, repay, transfer, and stay on top of your debt game — with ease and style.
                </p>

                {/* Content Container */}
                <div className="mt-12 flex flex-col items-center justify-center gap-8 md:mt-16 md:flex-row">
                    {/* Bar Chart */}
                    <DebtManagementChart />

                    {/* Slider Section */}
                    <div className="flex w-full flex-col items-center gap-10 md:w-auto">
                        {/* Slider Items Container */}
                        <div className="flex items-start gap-4">
                            {/* Sliding Indicator Bar */}
                            <div className="relative h-[614px] w-3 shrink-0 overflow-hidden rounded-full bg-gray-200">
                                <div
                                    className="absolute w-full rounded-full bg-primary-500 transition-all duration-300 ease-in-out"
                                    style={{
                                        height: `${100 / slides.length}%`,
                                        top: `${(activeSlide * 100) / slides.length}%`,
                                    }}
                                />
                            </div>

                            {/* Slider Content */}
                            <div className="flex max-w-[540px] flex-col gap-8">
                                {slides.map((slide, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setActiveSlide(index)}
                                        className={`flex items-start gap-4 rounded-lg p-6 text-left transition-all duration-300 ${
                                            activeSlide === index
                                                ? 'border-2 border-primary-500 bg-primary-50'
                                                : 'border-2 border-transparent bg-transparent hover:bg-gray-50'
                                        }`}
                                    >
                                        <Icon
                                            icon={slide.icon}
                                            className="mt-1 shrink-0"
                                            width={32}
                                            height={32}
                                        />
                                        <div>
                                            <h3 className={`mb-2 font-poppins text-[20px] font-bold leading-[150%] ${
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

                        {/* CTA Button */}
                        <Link to="/sign-up">
                            <Button
                                className="h-[60px] rounded-lg bg-primary-900 px-6 font-poppins text-lg font-semibold text-white hover:bg-primary-800"
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
