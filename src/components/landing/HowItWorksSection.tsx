import { Send, ArrowLeftRight, Award } from "lucide-react";
import { howItWorksSteps } from "./landingData";

export default function HowItWorksSection() {
    return (
        <section 
            id="how-it-works" 
            className="w-full bg-gbese-white py-16 md:py-24 border-b border-[rgba(179,179,179,1)]"
        >
            <div className="mx-auto max-w-7xl px-5 sm:px-10 md:px-20">
                <h2 className="font-sora font-semibold text-3xl leading-tight md:text-6xl md:leading-tight text-center text-primary-900">
                    How Gbese Works
                </h2>
                
                <p className="font-medium text-base leading-6 md:text-2xl md:leading-snug text-center text-gbese-black/80 max-w-sm sm:max-w-2xl md:max-w-4xl mx-auto mt-4 md:mt-6">
                    From debt requests to repayments, Gbese makes every step simple, social, and secure. Here's how you stay in control.
                </p>

                <div className="mt-12 md:mt-16 flex flex-col md:flex-row gap-14 md:gap-8 justify-center items-stretch max-w-7xl mx-auto">
                    {howItWorksSteps.map((step, idx) => {
                        const iconWrapClasses = [
                            "icon-bg-primary",
                            "icon-bg-transfer",
                            "icon-bg-reward",
                        ][idx] || "icon-bg-primary";
                        return (
                            <div key={step.step} className="flex-1 flex flex-col items-center text-center py-4 md:py-[18px] px-6 transition-all duration-300 hover:transform hover:-translate-y-2">
                                <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 transition-all duration-300 hover:scale-110 ${idx === 0 ? 'hover:rotate-12' : ''} ${iconWrapClasses} p-3.5`}>
                                    {step.icon === 'send' && (
                                        <Send className="w-full h-full text-primary-600 transition-transform duration-300" />
                                    )}
                                    {step.icon === 'arrow-left-right' && (
                                        <ArrowLeftRight className="w-full h-full transition-transform duration-300 hover:translate-x-1 text-[rgba(0,150,136,1)]" />
                                    )}
                                    {step.icon === 'award' && (
                                        <Award className="w-full h-full transition-transform duration-300 text-[rgba(147,51,234,1)]" />
                                    )}
                                </div>
                                <h3 className="font-semibold text-lg leading-7 md:text-2xl md:leading-snug mb-3">
                                    {`Step ${step.step}: ${step.title}`}
                                </h3>
                                <p className="font-normal text-base leading-6 md:text-xl md:leading-relaxed text-gbese-black/70">
                                    {step.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
