import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import WhyChooseGbeseSection from "@/components/landing/WhyChooseGbeseSection";
import CTASection from "@/components/landing/CTASection";
import FAQSection from "@/components/landing/FAQSection";
import Footer from "@/components/landing/Footer";

export default function LandingPage() {
    return (
        <>
            <Navbar />
            <main>
                <HeroSection />
                <HowItWorksSection />
                <WhyChooseGbeseSection />
                <CTASection />
                <FAQSection />

                <section id="about"></section>
                <section id="contact"></section>
            </main>
            <Footer />
        </>
    );
}
