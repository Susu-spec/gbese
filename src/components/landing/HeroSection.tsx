import { Link } from "react-router";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
    return (
        <section
            id="hero"
            className="relative w-full bg-primary-900 hero-bg text-gbese-white"
        >
            <div className="mx-auto max-w-[1440px] px-5 md:px-20 pt-12 md:pt-24 pb-12 md:pb-20">
                {/* Headline */}
                <h1 className="font-sora font-bold text-[24px] leading-9 md:text-[72px] md:leading-[90px] text-center text-gbese-white max-w-[335px] md:max-w-[1440px] mx-auto">
                    Shift Debt Like a Pro<br />
                    No Bank Stress, No Wahala!
                </h1>

                {/* Subheading */}
                <p className="font-poppins font-medium text-[16px] leading-7 md:text-[24px] md:leading-9 text-center text-gbese-white/90 max-w-[335px] md:max-w-[1440px] mx-auto mt-5 md:mt-6">
                    GBESE lets you transfer loans to willing helpers, negotiate better <br className="hidden md:inline" />terms, earn and exchange crypto rewards and breathe easy.
                </p>

                {/* CTA with glow effects */}
                <div className="relative mt-8 md:mt-10 mb-24 md:mb-36 -mx-5 md:-mx-20">
                    <div className="flex justify-center relative z-20 px-5 md:px-20">
                        <Link to="/sign-up" className="w-full max-w-[304px] md:max-w-none md:w-auto">
                            <Button
                                size="lg"
                                className="relative bg-gbese-white hover:bg-gbese-white/90 text-primary-600 font-poppins font-semibold h-[60px] rounded-lg w-full transition-all duration-300 hover:scale-105 hover:shadow-2xl text-base leading-[27px] px-6 py-3 hero-btn-shadow"
                            >
                                Start Passing Debt Now
                            </Button>
                        </Link>
                    </div>
                    
                    <div 
                        className="absolute left-1/2 -translate-x-1/2 top-full mt-2 md:mt-4 pointer-events-none w-[300px] max-w-[85vw] md:w-[600px] hero-divider-line z-20"
                    />
                    {/* Refined radial glow spreading upward only */}
                    <div 
                        className="absolute left-1/2 -translate-x-1/2 top-full mt-2 md:mt-4 pointer-events-none overflow-hidden h-[120px] md:h-[200px] w-screen hero-glow-main z-10"
                    />
                    {/* Additional soft glow layer for depth */}
                    <div 
                        className="absolute left-1/2 -translate-x-1/2 top-full mt-2 md:mt-4 pointer-events-none overflow-hidden h-[100px] md:h-[150px] w-screen hero-glow-secondary z-10"
                    />
                </div>
                {/* Dashboard Mockup */}
                <div className="relative mt-24 md:mt-40 flex justify-center px-5 md:px-0 mb-0 md:mb-4">
                    <div
                        className="relative w-full max-w-[330px] md:max-w-[1025px] overflow-hidden rounded-t-[12.57px] md:rounded-t-[40px] transition-transform duration-500 hover:scale-[1.02] border-t-[6.29px] border-l-[6.29px] border-r-[6.29px] border-[rgba(6,44,175,1)]"
                    >
                        <img
                            src="/Dashboard-image.png"
                            alt="Gbese Dashboard"
                            className="w-full h-auto select-none"
                            draggable={false}
                        />
                    </div>
                </div>
            </div>
            
            {/* Section divider */}
            <div className="w-full flex justify-center relative">
                <div 
                    className="relative w-full max-w-[1440px] h-16 bg-[rgba(2,19,71,1)] overflow-hidden"
                >
                    {/* Swirl pattern SVG */}
                    <svg 
                        className="absolute inset-0 w-full h-full"
                        viewBox="0 0 1440 64"
                        preserveAspectRatio="none"
                    >
                        <defs>
                            <linearGradient id="swirlGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="rgba(172, 188, 240, 0.8)" />
                                <stop offset="50%" stopColor="rgba(131, 154, 232, 1)" />
                                <stop offset="100%" stopColor="rgba(172, 188, 240, 0.8)" />
                            </linearGradient>
                        </defs>
                        <path 
                            d="M0,32 C280,12 400,12 560,38 C720,28 860,18 1120,42 C1280,34 1360,26 1440,38 L1440,64 L0,64 Z" 
                            fill="rgb(249, 250, 251)"
                            opacity="1"
                        />
                        <path 
                            d="M0,32 C280,12 400,12 560,38 C720,28 860,18 1120,42 C1280,34 1360,26 1440,38" 
                            fill="none" 
                            stroke="url(#swirlGradient)" 
                            strokeWidth="6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path 
                            d="M0,32 C280,12 400,12 560,38 C720,28 860,18 1120,42 C1280,34 1360,26 1440,38" 
                            fill="none" 
                            stroke="url(#swirlGradient)" 
                            strokeWidth="5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            opacity="0.7"
                        />
                    </svg>
                </div>
            </div>
        </section>
    );
}
