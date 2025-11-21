import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Footer() {
    const quickLinks = [
        { label: "Product", href: "#product" },
        { label: "Company", href: "#company" },
        { label: "Web3", href: "#web3" },
        { label: "Legal", href: "#legal" },
    ];

    const trustLinks = [
        { label: "Privacy Policy", href: "#privacy" },
        { label: "Terms of Service", href: "#terms" },
        { label: "Security", href: "#security" },
        { label: "Testimonials", href: "#testimonials" },
    ];

    const contactInfo = [
        { label: "Email", value: "hello@gbese.com", href: "mailto:hello@gbese.com" },
        { label: "Phone", value: "+234 800 000 0000", href: "tel:+2348000000000" },
        { label: "Address", value: "Lagos, Nigeria" },
    ];

    const socialIcons = [
        { icon: "proicons:x-twitter", href: "#", label: "Twitter" },
        { icon: "ic:baseline-facebook", href: "#", label: "Facebook" },
        { icon: "ic:baseline-telegram", href: "#", label: "Telegram" },
        { icon: "mdi:instagram", href: "#", label: "Instagram" },
    ];

    return (
        <footer className="w-full bg-primary-900 text-gbese-white" style={{ gap: "40px" }}>
            {/* Footer Top Section */}
            <div
                id="contact"
                className="w-full border-b border-gbese-white/50"
                style={{
                    paddingLeft: "100px",
                    paddingRight: "120px",
                    paddingTop: "60px",
                    paddingBottom: "60px",
                }}
            >
                <div className="mx-auto flex max-w-[1440px]" style={{ gap: "60px" }}>
                    {/* Logo, Subtitle, and Social Icons */}
                    <div className="flex flex-col" style={{ width: "229px", gap: "20px" }}>
                        {/* Logo */}
                        <img
                            src="/Logo Dark BG.png"
                            alt="Gbese Logo"
                            style={{ width: "105px", height: "34px" }}
                        />

                        {/* Subtitle */}
                        <p
                            className="font-poppins font-medium text-gbese-white"
                            style={{
                                fontSize: "16px",
                                lineHeight: "24px",
                                width: "229px",
                            }}
                        >
                            No Carry Debt Alone – Join Our Squad!
                        </p>

                        {/* Social Icons */}
                        <div className="flex items-center" style={{ gap: "32px" }}>
                            {socialIcons.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gbese-white hover:text-primary-100 transition-colors"
                                    aria-label={social.label}
                                >
                                    <Icon icon={social.icon} width={24} height={24} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links, Trust & Social Proof, Contact */}
                    <div className="flex" style={{ gap: "24px" }}>
                        {/* Quick Links */}
                        <div className="flex flex-col" style={{ width: "120px", gap: "12px" }}>
                            <h3
                                className="font-poppins font-semibold text-gbese-white"
                                style={{
                                    fontSize: "20px",
                                    lineHeight: "24px",
                                }}
                            >
                                Quick Links
                            </h3>
                            <nav className="flex flex-col" style={{ gap: "12px" }}>
                                {quickLinks.map((link) => (
                                    <a
                                        key={link.label}
                                        href={link.href}
                                        className="font-poppins font-medium text-gbese-white hover:text-primary-100 transition-colors"
                                        style={{
                                            fontSize: "16px",
                                            lineHeight: "24px",
                                        }}
                                    >
                                        {link.label}
                                    </a>
                                ))}
                            </nav>
                        </div>

                        {/* Trust & Social Proof */}
                        <div className="flex flex-col" style={{ width: "203px", gap: "12px" }}>
                            <h3
                                className="font-poppins font-semibold text-gbese-white"
                                style={{
                                    fontSize: "20px",
                                    lineHeight: "24px",
                                }}
                            >
                                Trust & Social Proof
                            </h3>
                            <nav className="flex flex-col" style={{ gap: "12px" }}>
                                {trustLinks.map((link) => (
                                    <a
                                        key={link.label}
                                        href={link.href}
                                        className="font-poppins font-medium text-gbese-white hover:text-primary-100 transition-colors"
                                        style={{
                                            fontSize: "16px",
                                            lineHeight: "24px",
                                        }}
                                    >
                                        {link.label}
                                    </a>
                                ))}
                            </nav>
                        </div>

                        {/* Contact */}
                        <div className="flex flex-col" style={{ width: "203px", gap: "12px" }}>
                            <h3
                                className="font-poppins font-semibold text-gbese-white"
                                style={{
                                    fontSize: "20px",
                                    lineHeight: "24px",
                                }}
                            >
                                Contact
                            </h3>
                            <div className="flex flex-col" style={{ gap: "12px" }}>
                                {contactInfo.map((info) => (
                                    <div key={info.label}>
                                        {info.href ? (
                                            <a
                                                href={info.href}
                                                className="font-poppins font-medium text-gbese-white hover:text-primary-100 transition-colors"
                                                style={{
                                                    fontSize: "16px",
                                                    lineHeight: "24px",
                                                }}
                                            >
                                                {info.value}
                                            </a>
                                        ) : (
                                            <p
                                                className="font-poppins font-medium text-gbese-white"
                                                style={{
                                                    fontSize: "16px",
                                                    lineHeight: "24px",
                                                }}
                                            >
                                                {info.value}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Newsletter */}
                    <div className="flex flex-col" style={{ width: "358px", gap: "20px" }}>
                        <h3
                            className="font-poppins font-semibold text-gbese-white"
                            style={{
                                fontSize: "20px",
                                lineHeight: "24px",
                            }}
                        >
                            Newsletter
                        </h3>
                        <p
                            className="font-poppins font-medium text-gbese-white"
                            style={{
                                fontSize: "16px",
                                lineHeight: "24px",
                            }}
                        >
                            No Miss Update Again! Subscribe for GBESE Gist & Quick Loans.
                        </p>

                        {/* Subscribe Form */}
                        <form className="flex items-center" style={{ width: "341px" }}>
                            <Input
                                type="email"
                                placeholder="Email Address"
                                className="text-gbese-white border-none rounded-r-none placeholder:text-gbese-neutrals-100"
                                style={{ 
                                    height: "44px", 
                                    width: "211px",
                                    background: "rgba(205, 215, 246, 0.2)",
                                    backdropFilter: "blur(24px)"
                                }}
                            />
                            <Button
                                type="submit"
                                className="bg-gbese-white hover:bg-gbese-white/90 text-primary-500 rounded-l-none"
                                style={{
                                    width: "130px",
                                    height: "44px",
                                    borderRadius: "8px",
                                    paddingTop: "12px",
                                    paddingRight: "24px",
                                    paddingBottom: "12px",
                                    paddingLeft: "24px",
                                }}
                            >
                                Subscribe
                            </Button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Footer Bottom Section */}
            <div
                className="w-full"
                style={{
                    height: "156px",
                    paddingTop: "40px",
                    paddingBottom: "40px",
                }}
            >
                <div className="mx-auto max-w-[1440px] px-[100px] flex items-center justify-center">
                    <p
                        className="font-poppins font-medium text-gbese-white text-center"
                        style={{
                            fontSize: "16px",
                            lineHeight: "24px",
                        }}
                    >
                        © {new Date().getFullYear()} Gbese. <br></br>All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
