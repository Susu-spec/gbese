import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { heroCtaText } from "./landingData";
import SwirlPattern from "./SwirlPattern";
import DashboardImage from "@/components/assets/images/Dashboard-image.png";

export default function HeroSection() {
    return (
        <section
            id="hero"
            className="relative w-full bg-primary-900 hero-bg text-gbese-white"
        >
            <div className="mx-auto max-w-screen-2xl px-5 sm:px-10 md:px-20 pt-12 md:pt-24 pb-12 md:pb-20">
                {/* Headline */}
                <h1 className="font-sora font-bold text-xl leading-9 md:text-7xl md:leading-tight text-center text-gbese-white max-w-sm sm:max-w-xl md:max-w-full mx-auto">
                    Shift Debt Like a Pro<br />
                    No Bank Stress, No Wahala!
                </h1>

                {/* Subheading */}
                <p className="font-medium text-base leading-7 md:text-2xl md:leading-snug text-center text-gbese-white/90 max-w-sm sm:max-w-xl md:max-w-full mx-auto mt-5 md:mt-6">
                    GBESE lets you transfer loans to willing helpers, negotiate better <br className="hidden md:inline" />terms, earn and exchange crypto rewards and breathe easy.
                </p>

                {/* CTA with glow effects */}
                <div className="relative mt-8 md:mt-10 mb-24 md:mb-36 -mx-5 md:-mx-20">
                    <div className="flex justify-center relative z-20 px-5 md:px-20">
                        <Link to="/sign-up" className="w-full sm:w-auto">
                            <Button
                                size="lg"
                                className="relative bg-gbese-white hover:bg-gbese-white/90 text-primary-600 font-semibold rounded-lg w-full sm:w-auto transition-all duration-300 hover:scale-105 hover:shadow-2xl hero-btn-shadow"
                            >
                                {heroCtaText}
                            </Button>
                        </Link>
                    </div>
                    
                    <div 
                        className="absolute left-1/2 -translate-x-1/2 top-full mt-2 md:mt-4 pointer-events-none w-[75vw] sm:w-96 md:w-150 hero-divider-line z-20"
                        aria-hidden="true"
                    />
                    {/* Refined radial glow spreading upward only */}
                    <div 
                        className="absolute left-1/2 -translate-x-1/2 top-full mt-2 md:mt-4 pointer-events-none overflow-hidden h-30 md:h-50 w-screen hero-glow-main z-10"
                        aria-hidden="true"
                    />
                    {/* Additional soft glow layer for depth */}
                    <div 
                        className="absolute left-1/2 -translate-x-1/2 top-full mt-2 md:mt-4 pointer-events-none overflow-hidden h-25 md:h-38 w-screen hero-glow-secondary z-10"
                        aria-hidden="true"
                    />
                </div>
                {/* Dashboard Mockup */}
                <div className="relative mt-24 md:mt-40 flex justify-center px-5 md:px-0 mb-0 md:mb-4">
                    <div
                        className="relative w-full max-w-sm sm:max-w-lg md:max-w-4xl overflow-hidden rounded-t-xl md:rounded-t-3xl transition-transform duration-500 hover:scale-[1.02] border-4 md:border-6 border-[rgba(6,44,175,1)]"
                    >
                        <img
                            src={DashboardImage}
                            alt="Gbese dashboard preview showing debt transfer interface with user-friendly design"
                            className="w-full h-auto select-none"
                            draggable={false}
                        />
                    </div>
                </div>
            </div>
            
            {/* Section divider */}
            <div className="w-full flex justify-center relative" aria-hidden="true">
                <div 
                    className="relative w-full max-w-screen-2xl h-16 bg-[rgba(2,19,71,1)] overflow-hidden"
                >
                    <SwirlPattern />
                </div>
            </div>
        </section>
    );
}
