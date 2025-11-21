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
        <footer className="w-full bg-primary-900 text-gbese-white">
            <div
                id="contact"
                className="w-full border-b border-gbese-white/50 py-[60px] px-5 md:px-[100px] md:pr-[120px]"
            >
                <div className="mx-auto flex flex-col md:flex-row max-w-[1440px] gap-10 md:gap-[60px]">
                    <div className="flex flex-col w-full md:w-[229px] gap-5">
                        <img
                            src="/Logo Dark BG.png"
                            alt="Gbese Logo"
                            className="w-[105px] h-[34px]"
                        />

                        <p className="font-poppins font-medium text-gbese-white text-sm leading-6 md:text-base w-full md:w-[229px]">
                            No Carry Debt Alone – Join Our Squad!
                        </p>

                        <div className="flex items-center gap-8">
                            {socialIcons.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gbese-white hover:text-primary-100 transition-all duration-300 hover:scale-125 hover:-translate-y-1"
                                    aria-label={social.label}
                                >
                                    <Icon icon={social.icon} width={24} height={24} />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row w-full md:w-auto gap-10 md:gap-6 order-3 md:order-0">
                        <div className="flex gap-6 md:gap-6">
                            <div className="flex flex-col flex-1 md:w-[120px] gap-3">
                                <h3 className="font-poppins font-semibold text-gbese-white text-sm leading-[27px] md:text-xl md:leading-6">
                                    Quick Links
                                </h3>
                                <nav className="flex flex-col gap-3">
                                    {quickLinks.map((link) => (
                                        <a
                                            key={link.label}
                                            href={link.href}
                                            className="font-poppins font-medium text-gbese-white hover:text-primary-100 transition-colors text-sm leading-6 md:text-base"
                                        >
                                            {link.label}
                                        </a>
                                    ))}
                                </nav>
                            </div>

                            <div className="flex flex-col flex-1 md:w-[203px] gap-3">
                                <h3 className="font-poppins font-semibold text-gbese-white text-sm leading-[27px] md:text-xl md:leading-6">
                                    Trust & Social Proof
                                </h3>
                                <nav className="flex flex-col gap-3">
                                    {trustLinks.map((link) => (
                                        <a
                                            key={link.label}
                                            href={link.href}
                                            className="font-poppins font-medium text-gbese-white hover:text-primary-100 transition-colors text-sm leading-6 md:text-base"
                                        >
                                            {link.label}
                                        </a>
                                    ))}
                                </nav>
                            </div>
                        </div>

                        <div className="flex flex-col w-full md:w-[203px] gap-3">
                            <h3 className="font-poppins font-semibold text-gbese-white text-sm leading-[27px] md:text-xl md:leading-6">
                                Contact
                            </h3>
                            <div className="flex flex-col gap-3">
                                {contactInfo.map((info) => (
                                    <div key={info.label}>
                                        {info.href ? (
                                            <a
                                                href={info.href}
                                                className="font-poppins font-medium text-gbese-white hover:text-primary-100 transition-colors text-sm leading-6 md:text-base"
                                            >
                                                {info.value}
                                            </a>
                                        ) : (
                                            <p className="font-poppins font-medium text-gbese-white text-sm leading-6 md:text-base">
                                                {info.value}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col w-full md:w-[358px] gap-5 order-2 md:order-0">
                        <h3 className="font-poppins font-semibold text-gbese-white text-sm leading-[27px] md:text-xl md:leading-6">
                            Newsletter
                        </h3>
                        <p className="font-poppins font-medium text-gbese-white text-sm leading-6 md:text-base">
                            No Miss Update Again! Subscribe for GBESE Gist & Quick Loans.
                        </p>

                        <form className="flex items-center w-full md:w-[341px]">
                            <Input
                                type="email"
                                placeholder="Email Address"
                                className="text-gbese-white border-none rounded-r-none placeholder:text-gbese-neutrals-100 h-11 flex-1 md:w-[211px]"
                                style={{ 
                                    background: "rgba(205, 215, 246, 0.2)",
                                    backdropFilter: "blur(24px)"
                                }}
                            />
                            <Button
                                type="submit"
                                className="bg-gbese-white hover:bg-gbese-white/90 text-primary-500 rounded-l-none h-11 px-6 py-3 transition-all duration-300 hover:shadow-lg"
                                style={{
                                    borderRadius: "8px",
                                }}
                            >
                                Subscribe
                            </Button>
                        </form>
                    </div>
                </div>
            </div>

            <div className="w-full py-10">
                <div className="mx-auto max-w-[1440px] px-5 md:px-[100px] flex items-center justify-center">
                    <p className="font-poppins font-medium text-gbese-white text-center text-sm leading-6 md:text-base">
                        © {new Date().getFullYear()} Gbese. <br></br>All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
