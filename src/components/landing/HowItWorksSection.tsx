import { Send, ArrowLeftRight, Award } from "lucide-react";

export default function HowItWorksSection() {
    return (
        <section 
            id="how-it-works" 
            className="w-full bg-gbese-white py-16 md:py-24"
            style={{ borderBottom: '1px solid rgba(179, 179, 179, 1)' }}
        >
            <div className="mx-auto max-w-[1440px] px-8 md:px-20">
                {/* Section Header */}
                <h2 className="font-sora font-semibold text-[28px] leading-[42px] md:text-[60px] md:leading-[90px] text-center text-primary-900">
                    How Gbese Works
                </h2>
                
                {/* Subtitle */}
                <p className="font-poppins font-medium text-base leading-6 md:text-[24px] md:leading-9 text-center text-gbese-black/80 max-w-[962px] mx-auto mt-4 md:mt-6">
                    From debt requests to repayments, Gbese makes every step simple, social, and secure. Here's how you stay in control.
                </p>

                {/* Steps Container */}
                <div className="mt-12 md:mt-16 flex flex-col md:flex-row gap-6 md:gap-8 justify-center items-stretch max-w-[1234px] mx-auto">
                    {/* Step 1 */}
                    <div className="flex-1 flex flex-col items-center text-center py-4 md:py-[18px] px-6">
                        {/* Icon */}
                        <div 
                            className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
                            style={{ 
                                background: 'var(--color-primary-100)',
                                padding: '14px'
                            }}
                        >
                            <Send className="w-full h-full text-primary-600" />
                        </div>
                        
                        {/* Step Title */}
                        <h3 className="font-poppins font-semibold text-lg leading-7 md:text-[24px] md:leading-9 text-gbese-black mb-3">
                            Step 1: Start or Accept a Gbese
                        </h3>
                        
                        {/* Step Description */}
                        <p className="font-poppins font-normal text-base leading-6 md:text-[20px] md:leading-[30px] text-gbese-black/70">
                            Send or accept a debt. Whether you're owing or helping out, it begins with one simple agreement.
                        </p>
                    </div>

                    {/* Step 2 */}
                    <div className="flex-1 flex flex-col items-center text-center py-4 md:py-[18px] px-6">
                        {/* Icon */}
                        <div 
                            className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
                            style={{ 
                                background: 'rgba(223, 255, 249, 1)',
                                padding: '14px'
                            }}
                        >
                            <ArrowLeftRight className="w-full h-full" style={{ color: 'rgba(0, 150, 136, 1)' }} />
                        </div>
                        
                        {/* Step Title */}
                        <h3 className="font-poppins font-semibold text-lg leading-7 md:text-[24px] md:leading-9 text-gbese-black mb-3">
                            Step 2: Transfer or Repay
                        </h3>
                        
                        {/* Step Description */}
                        <p className="font-poppins font-normal text-base leading-6 md:text-[20px] md:leading-[30px] text-gbese-black/70">
                            Need help? Shift the debt to someone else. Ready to pay back? Clear it in a tap.
                        </p>
                    </div>

                    {/* Step 3 */}
                    <div className="flex-1 flex flex-col items-center text-center py-4 md:py-[18px] px-6">
                        {/* Icon */}
                        <div 
                            className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
                            style={{ 
                                background: 'rgba(231, 206, 255, 0.35)',
                                padding: '14px'
                            }}
                        >
                            <Award className="w-full h-full" style={{ color: 'rgba(147, 51, 234, 1)' }} />
                        </div>
                        
                        {/* Step Title */}
                        <h3 className="font-poppins font-semibold text-lg leading-7 md:text-[24px] md:leading-9 text-gbese-black mb-3">
                            Step 3: Earn XP & Trust
                        </h3>
                        
                        {/* Step Description */}
                        <p className="font-poppins font-normal text-base leading-6 md:text-[20px] md:leading-[30px] text-gbese-black/70">
                            Make smart money moves, climb ranks, and unlock rewards in the community.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
