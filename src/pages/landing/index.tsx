import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Send, ArrowLeftRight, Award } from "lucide-react";

export default function LandingPage() {
    return (
        <>
            <nav
                className="sticky top-0 z-50 w-full bg-primary-900 text-gbese-white"
                aria-label="Main navigation"
            >
                <div className="mx-auto flex max-w-[1440px] items-center justify-between px-8 md:px-20 h-20 md:h-[119px]">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2" aria-label="Gbese Home">
                        <img
                            src="/Logo Dark BG.png"
                            alt="Gbese Logo"
                            className="h-8 md:h-9 w-auto select-none"
                            draggable={false}
                        />
                    </Link>
                    {/* Center nav links */}
                    <ul className="hidden md:flex items-center gap-6 h-10">
                        <li>
                            <a href="#about" className="body-sm md:body text-gbese-white/90 hover:text-gbese-white transition-colors">
                                About Us
                            </a>
                        </li>
                        <li>
                            <a href="#contact" className="body-sm md:body text-gbese-white/90 hover:text-gbese-white transition-colors">
                                Contact
                            </a>
                        </li>
                        <li>
                            <a href="#faqs" className="body-sm md:body text-gbese-white/90 hover:text-gbese-white transition-colors">
                                FAQs
                            </a>
                        </li>
                    </ul>
                    {/* Auth actions */}
                    <div className="flex items-center gap-6">
                        <Link to="/sign-in" className="hidden md:inline-flex">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-gbese-white hover:text-primary-200 transition-colors"
                            >
                                Login
                            </Button>
                        </Link>
                        <Link to="/sign-up">
                            <Button size="sm" className="bg-primary-500 hover:bg-primary-600 text-white">
                                Sign Up
                            </Button>
                        </Link>
                    </div>
                </div>
            </nav>
            {/* Hero Section */}
            <main>
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
                            GBESE lets you transfer loans to willing helpers, negotiate better <br></br>terms, earn and exchange crypto rewards and breathe easy.
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
                    <div 
                        className="w-full flex justify-center relative"
                    >
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
                                style={{ opacity: 0.8 }}
                            >
                                <defs>
                                    <linearGradient id="swirlGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="rgba(172, 188, 240, 0.8)" />
                                        <stop offset="50%" stopColor="rgba(131, 154, 232, 1)" />
                                        <stop offset="100%" stopColor="rgba(172, 188, 240, 0.8)" />
                                    </linearGradient>
                                </defs>
                                {/* Swirl curves */}
                                <path 
                                    d="M0,32 Q360,4 720,32 T1440,32" 
                                    fill="none" 
                                    stroke="url(#swirlGradient)" 
                                    strokeWidth="3.5"
                                    strokeLinecap="round"
                                />
                                <path 
                                    d="M0,32 Q360,60 720,32 T1440,32" 
                                    fill="none" 
                                    stroke="url(#swirlGradient)" 
                                    strokeWidth="3.5"
                                    strokeLinecap="round"
                                />
                                <path 
                                    d="M-200,32 Q180,6 560,32 T1280,32" 
                                    fill="none" 
                                    stroke="url(#swirlGradient)" 
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    opacity="0.85"
                                />
                                <path 
                                    d="M-200,32 Q180,58 560,32 T1280,32" 
                                    fill="none" 
                                    stroke="url(#swirlGradient)" 
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    opacity="0.85"
                                />
                                {/* Additional swirls for more coverage */}
                                <path 
                                    d="M-100,32 Q270,10 640,32 T1380,32" 
                                    fill="none" 
                                    stroke="url(#swirlGradient)" 
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    opacity="0.7"
                                />
                                <path 
                                    d="M-100,32 Q270,54 640,32 T1380,32" 
                                    fill="none" 
                                    stroke="url(#swirlGradient)" 
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    opacity="0.7"
                                />
                            </svg>
                        </div>
                    </div>
                </section>

                {/* How Gbese Works Section */}
                <section id="how-it-works" className="w-full bg-gbese-white py-16 md:py-24">
                    <div className="mx-auto max-w-[1440px] px-8 md:px-20">
                        {/* Section Header */}
                        <h2 className="font-sora font-semibold text-[28px] leading-[42px] md:text-[60px] md:leading-[90px] text-center text-gbese-black">
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

                <section id="about"></section>
                <section id="contact"></section>
                <section id="faqs"></section>
            </main>
        </>
    );
}