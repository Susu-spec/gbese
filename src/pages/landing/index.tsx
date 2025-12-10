import { useEffect, useState } from "react";
import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import WhyChooseGbeseSection from "@/components/landing/WhyChooseGbeseSection";
import CTASection from "@/components/landing/CTASection";
import FAQSection from "@/components/landing/FAQSection";
import Footer from "@/components/landing/Footer";
import FullPageLoader from "@/components/landing/FullPageLoader";

export default function LandingPage() {
    const [loading, setLoading] = useState(true);
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        // Longer splash duration for perceived loading
        const loaderTimer = setTimeout(() => {
            setLoading(false);
            // Allow a short gap before revealing content for fade-in
            const contentTimer = setTimeout(() => setShowContent(true), 50);
            return () => clearTimeout(contentTimer);
        }, 1200);
        return () => clearTimeout(loaderTimer);
    }, []);

    return (
        <div className="relative min-h-screen">
            {/* Loader overlay */}
            <div
                className={`fixed inset-0 z-30 transition-opacity duration-500 bg-white flex items-center justify-center ${
                    loading ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}
                aria-hidden={!loading}
            >
                <FullPageLoader />
            </div>

            {/* Main content with fade-in */}
            <div
                className={`transition-opacity duration-700 ${showContent ? 'opacity-100' : 'opacity-0'}`}
            >
                <Navbar />
                <main>
                    <HeroSection />
                    <HowItWorksSection />
                    <WhyChooseGbeseSection />
                    <CTASection />
                    <FAQSection />
                    <section id="about" />
                    <section id="contact" />
                </main>
                <Footer />
            </div>
        </div>
    );
}
