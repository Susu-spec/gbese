import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { quickLinks, trustLinks, contactInfo, socialIcons } from "./landingData";
import LogoDarkBG from "@/assets/images/logo-dark-bg.png";

export default function Footer() {

    return (
        <footer className="w-full bg-primary-900 text-gbese-white">
            <div
                id="contact"
                className="w-full border-b border-gbese-white/50 py-8 px-5 md:px-10 lg:px-25 lg:pr-30"
            >
                <div className="mx-auto flex flex-col lg:flex-row max-w-screen-2xl gap-4 lg:gap-15">
                    <div className="flex flex-col w-full sm:w-56 md:w-60 gap-4">
                        <img
                            src={LogoDarkBG}
                            alt="Gbese Logo"
                            className="w-[105px] h-[34px]"
                        />

                        <p className="font-medium text-gbese-white text-sm leading-5 md:text-base w-full sm:w-56 md:w-60">
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

                    <div className="flex flex-col lg:flex-row w-full lg:w-auto gap-8 lg:gap-6 order-3 lg:order-0">
                        <div className="flex gap-6 lg:gap-6">
                            <div className="flex flex-col flex-1 sm:w-32 md:w-32 gap-2">
                                <h3 className="font-semibold text-gbese-white text-sm leading-snug md:text-xl md:leading-snug">
                                    Quick Links
                                </h3>
                                <nav className="flex flex-col gap-2">
                                    {quickLinks.map((link) => (
                                        <a
                                            key={link.label}
                                            href={link.href}
                                            className="font-medium text-gbese-white hover:text-primary-100 transition-colors text-sm leading-5 md:text-base"
                                        >
                                            {link.label}
                                        </a>
                                    ))}
                                </nav>
                            </div>

                            <div className="flex flex-col flex-1 sm:w-48 md:w-52 gap-2">
                                <h3 className="font-semibold text-gbese-white text-sm leading-snug md:text-xl md:leading-snug">
                                    Trust & Social Proof
                                </h3>
                                <nav className="flex flex-col gap-2">
                                    {trustLinks.map((link) => (
                                        <a
                                            key={link.label}
                                            href={link.href}
                                            className="font-medium text-gbese-white hover:text-primary-100 transition-colors text-sm leading-5 md:text-base"
                                        >
                                            {link.label}
                                        </a>
                                    ))}
                                </nav>
                            </div>
                        </div>

                        <div className="flex flex-col w-full sm:w-48 md:w-52 gap-2 order-2 lg:order-0">
                            <h3 className="font-semibold text-gbese-white text-sm leading-snug md:text-xl md:leading-snug">
                                Contact
                            </h3>
                            <div className="flex flex-col gap-2">
                                {contactInfo.map((info) => (
                                    <div key={info.label}>
                                        {info.href ? (
                                            <a
                                                href={info.href}
                                                className="font-medium text-gbese-white hover:text-primary-100 transition-colors text-sm leading-5 md:text-base"
                                            >
                                                {info.value}
                                            </a>
                                        ) : (
                                            <p className="font-medium text-gbese-white text-sm leading-5 md:text-base">
                                                {info.value}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                        <div className="flex flex-col w-full sm:w-80 lg:w-96 gap-3 order-1 lg:order-0">
                        <h3 className="font-semibold text-gbese-white text-sm leading-snug md:text-xl md:leading-snug">
                            Newsletter
                        </h3>
                        <p className="font-medium text-gbese-white text-sm leading-5 md:text-base">
                            No Miss Update Again! Subscribe for GBESE Gist & Quick Loans.
                        </p>

                        <form className="flex items-center w-full sm:w-80 lg:w-85.25">
                            <Input
                                type="email"
                                placeholder="Email Address"
                                className="text-gbese-white bg-gbese-white/10 backdrop-blur-2xl border border-gbese-white/30 rounded-r-none placeholder:text-gbese-neutrals-100 flex-1 focus:border-gbese-white/50 focus:bg-gbese-white/15"
                            />
                            <Button
                                type="submit"
                                className="bg-gbese-white hover:bg-gbese-white/90 text-primary-500 rounded-l-none rounded-r-lg shrink-0 transition-all duration-300 hover:shadow-lg"
                            >
                                Subscribe
                            </Button>
                        </form>
                    </div>
                </div>
            </div>

            <div className="w-full py-5">
                <div className="mx-auto max-w-screen-2xl px-5 sm:px-10 lg:px-25 flex items-center justify-center">
                    <p className="font-medium text-gbese-white text-center text-sm leading-6 md:text-base">
                        © {new Date().getFullYear()} Gbese. <br></br>All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
