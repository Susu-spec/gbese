import { Send, ArrowLeftRight, Award } from "lucide-react";

export default function HowItWorksSection() {
    return (
        <section 
            id="how-it-works" 
            className="w-full bg-gbese-white py-16 md:py-24 border-b border-[rgba(179,179,179,1)]"
        >
            <div className="mx-auto max-w-[1440px] px-5 md:px-20">
                <h2 className="font-sora font-semibold text-[1.75rem] leading-[2.625rem] md:text-[3.75rem] md:leading-[5.625rem] text-center text-primary-900">
                    How Gbese Works
                </h2>
                
                <p className="font-poppins font-medium text-base leading-6 md:text-[1.5rem] md:leading-9 text-center text-gbese-black/80 max-w-[962px] mx-auto mt-4 md:mt-6">
                    From debt requests to repayments, Gbese makes every step simple, social, and secure. Here's how you stay in control.
                </p>

                <div className="mt-12 md:mt-16 flex flex-col md:flex-row gap-14 md:gap-8 justify-center items-stretch max-w-[1234px] mx-auto">
                    <div className="flex-1 flex flex-col items-center text-center py-4 md:py-[18px] px-6 transition-all duration-300 hover:transform hover:-translate-y-2">
                        <div 
                            className="w-20 h-20 rounded-full flex items-center justify-center mb-6 transition-all duration-300 hover:scale-110 hover:rotate-12 icon-bg-primary p-3.5"
                        >
                            <Send className="w-full h-full text-primary-600 transition-transform duration-300" />
                        </div>
                        
                        <h3 className="font-poppins font-semibold text-lg leading-7 md:text-[1.5rem] md:leading-9 text-gbese-black mb-3">
                            Step 1: Start or Accept a Gbese
                        </h3>
                        
                        <p className="font-poppins font-normal text-base leading-6 md:text-[1.25rem] md:leading-[1.875rem] text-gbese-black/70">
                            Send or accept a debt. Whether you're owing or helping out, it begins with one simple agreement.
                        </p>
                    </div>

                    <div className="flex-1 flex flex-col items-center text-center py-4 md:py-[18px] px-6 transition-all duration-300 hover:transform hover:-translate-y-2">
                        <div 
                            className="w-20 h-20 rounded-full flex items-center justify-center mb-6 transition-all duration-300 hover:scale-110 icon-bg-transfer p-3.5"
                        >
                            <ArrowLeftRight className="w-full h-full transition-transform duration-300 hover:translate-x-1 text-[rgba(0,150,136,1)]" />
                        </div>
                        
                        {/* Step Title */}
                        <h3 className="font-poppins font-semibold text-lg leading-7 md:text-[1.5rem] md:leading-9 text-gbese-black mb-3">
                            Step 2: Transfer or Repay
                        </h3>
                        
                        {/* Step Description */}
                        <p className="font-poppins font-normal text-base leading-6 md:text-[1.25rem] md:leading-[1.875rem] text-gbese-black/70">
                            Need help? Shift the debt to someone else. Ready to pay back? Clear it in a tap.
                        </p>
                    </div>

                    <div className="flex-1 flex flex-col items-center text-center py-4 md:py-[18px] px-6 transition-all duration-300 hover:transform hover:-translate-y-2">
                        <div 
                            className="w-20 h-20 rounded-full flex items-center justify-center mb-6 transition-all duration-300 hover:scale-110 hover:rotate-12 icon-bg-reward p-3.5"
                        >
                            <Award className="w-full h-full transition-transform duration-300 text-[rgba(147,51,234,1)]" />
                        </div>
                        
                        {/* Step Title */}
                        <h3 className="font-poppins font-semibold text-lg leading-7 md:text-[1.5rem] md:leading-9 text-gbese-black mb-3">
                            Step 3: Earn XP & Trust
                        </h3>
                        
                        {/* Step Description */}
                        <p className="font-poppins font-normal text-base leading-6 md:text-[1.25rem] md:leading-[1.875rem] text-gbese-black/70">
                            Make smart money moves, climb ranks, and unlock rewards in the community.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
