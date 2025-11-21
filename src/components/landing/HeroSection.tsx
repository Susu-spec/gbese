import { Link } from "react-router";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
    return (
        <section
            id="hero"
            className="relative w-full bg-primary-900 text-gbese-white"
            style={{
                background: 'linear-gradient(180deg, #021346 0%, rgba(2, 19, 70, 0.9) 50%, #021346 100%)'
            }}
        >
            <div className="mx-auto max-w-[1440px] px-8 md:px-20 pt-16 md:pt-24 pb-12 md:pb-20">
                {/* Headline */}
                <h1 className="font-sora font-bold text-[32px] leading-12 md:text-[72px] md:leading-[90px] text-center text-gbese-white max-w-[1440px] mx-auto">
                    Shift Debt Like a Pro<br />
                    No Bank Stress, No Wahala!
                </h1>

                {/* Subheading */}
                <p className="font-poppins font-medium text-base leading-6 md:text-[24px] md:leading-9 text-center text-gbese-white/90 max-w-[1440px] mx-auto mt-5 md:mt-6 px-4 md:px-0">
                    GBESE lets you transfer loans to willing helpers, negotiate better <br />terms, earn and exchange crypto rewards and breathe easy.
                </p>

                {/* Primary CTA with glow wrapper */}
                <div className="relative mt-8 md:mt-10 mb-24 md:mb-36 -mx-8 md:-mx-20">
                    <div className="flex justify-center relative z-20 px-8 md:px-20">
                        <Link to="/sign-up">
                            <Button
                                size="lg"
                                className="relative bg-gbese-white hover:bg-gbese-white/90 text-primary-600 font-medium h-[60px] px-6 rounded-lg text-base md:text-lg shadow-xl"
                                style={{
                                    boxShadow: '0 20px 80px rgba(205, 215, 246, 0.4), 0 10px 40px rgba(205, 215, 246, 0.3), 0 4px 12px rgba(0, 0, 0, 0.1)'
                                }}
                            >
                                Start Passing Debt Now
                            </Button>
                        </Link>
                    </div>
                    
                    {/* Subtle horizontal line - positioned at the source */}
                    <div 
                        className="absolute left-1/2 -translate-x-1/2 top-full mt-4 pointer-events-none"
                        style={{
                            width: '600px',
                            maxWidth: '85vw',
                            height: '2px',
                            background: 'linear-gradient(to right, transparent 0%, rgba(131, 154, 232, 0.6) 10%, rgba(131, 154, 232, 0.8) 20%, rgba(131, 154, 232, 0.9) 50%, rgba(131, 154, 232, 0.8) 80%, rgba(131, 154, 232, 0.6) 90%, transparent 100%)',
                            filter: 'blur(1.5px)',
                            zIndex: 2,
                        }}
                    />
                    {/* Refined radial glow spreading upward only */}
                    <div 
                        className="absolute left-1/2 -translate-x-1/2 top-full mt-4 pointer-events-none overflow-hidden"
                        style={{
                            width: '100vw',
                            height: '200px',
                            background: `
                                radial-gradient(ellipse 100% 40% at center 100%, 
                                    rgba(131, 154, 232, 0.4) 0%, 
                                    rgba(131, 154, 232, 0.35) 3%, 
                                    rgba(131, 154, 232, 0.28) 8%, 
                                    rgba(131, 154, 232, 0.2) 15%, 
                                    rgba(131, 154, 232, 0.14) 25%, 
                                    rgba(131, 154, 232, 0.1) 35%, 
                                    rgba(131, 154, 232, 0.06) 50%, 
                                    rgba(131, 154, 232, 0.03) 65%, 
                                    transparent 85%
                                )
                            `,
                            filter: 'blur(25px)',
                            zIndex: 1,
                            transform: 'translateY(-100%)',
                        }}
                    />
                    {/* Additional soft glow layer for depth */}
                    <div 
                        className="absolute left-1/2 -translate-x-1/2 top-full mt-4 pointer-events-none overflow-hidden"
                        style={{
                            width: '100vw',
                            height: '150px',
                            background: `
                                radial-gradient(ellipse 100% 35% at center 100%, 
                                    rgba(131, 154, 232, 0.15) 0%, 
                                    rgba(131, 154, 232, 0.12) 5%, 
                                    rgba(131, 154, 232, 0.08) 12%, 
                                    rgba(131, 154, 232, 0.05) 22%, 
                                    rgba(131, 154, 232, 0.03) 35%, 
                                    transparent 60%
                                )
                            `,
                            filter: 'blur(35px)',
                            zIndex: 1,
                            transform: 'translateY(-100%)',
                        }}
                    />
                </div>
                {/* Dashboard Mockup - moved lower to give space for glow */}
                <div className="relative mt-32 md:mt-40 flex justify-center">
                    <div
                        className="relative w-full max-w-[1025px] rounded-t-3xl md:rounded-t-[40px] border-t-[6px] md:border-t-8 border-l-[6px] md:border-l-8 border-r-[6px] md:border-r-8 overflow-hidden"
                        style={{ borderColor: 'var(--color-primary-600)' }}
                    >
                        <img
                            src="/Dashboard-image.png"
                            alt="Gbese Dashboard Preview"
                            className="w-full h-auto select-none"
                            draggable={false}
                        />
                    </div>
                </div>
            </div>
            
            {/* Section divider below dashboard mockup with swirl pattern */}
            <div className="w-full flex justify-center relative">
                <div 
                    className="relative w-full"
                    style={{
                        width: '1440px',
                        maxWidth: '100%',
                        height: '64px',
                        background: 'rgba(2, 19, 71, 1)',
                        boxShadow: '0px 8px 4px 0px rgba(7, 53, 210, 0.1)',
                        overflow: 'hidden',
                    }}
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
                        {/* Smooth background for area below curves */}
                        <path 
                            d="M0,32 C280,12 400,12 560,38 C720,28 860,18 1120,42 C1280,34 1360,26 1440,38 L1440,64 L0,64 Z" 
                            fill="rgb(249, 250, 251)"
                            opacity="1"
                        />
                        {/* Thicker, smooth swirl curves following same path */}
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
