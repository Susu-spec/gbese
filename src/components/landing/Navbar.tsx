import { useState } from "react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    return (
        <nav
            className="sticky top-0 z-50 w-full bg-primary-900 text-gbese-white"
            aria-label="Main navigation"
        >
            <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 md:px-20 h-[66px] md:h-[119px]">
                {/* Logo */}
                <Link to="/" className="flex items-center" aria-label="Gbese Home" onClick={closeMenu}>
                    <img
                        src="/Logo Dark BG.png"
                        alt="Gbese Logo"
                        className="select-none w-[105px] h-[34px]"
                        draggable={false}
                    />
                </Link>

                {/* Desktop Navigation */}
                <ul className="hidden md:flex items-center gap-6 h-10">
                    <li>
                        <a href="#how-it-works" className="font-sora font-semibold text-sm sm:text-base leading-none text-gbese-white/90 hover:text-gbese-white transition-colors">
                            About Us
                        </a>
                    </li>
                    <li>
                        <a href="#contact" className="font-sora font-semibold text-sm sm:text-base leading-none text-gbese-white/90 hover:text-gbese-white transition-colors">
                            Contact
                        </a>
                    </li>
                    <li>
                        <a href="#faqs" className="font-sora font-semibold text-sm sm:text-base leading-none text-gbese-white/90 hover:text-gbese-white transition-colors">
                            FAQs
                        </a>
                    </li>
                </ul>

                {/* Desktop Auth Buttons */}
                <div className="hidden md:flex items-center gap-6">
                    <Link to="/sign-in">
                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-gbese-white hover:text-primary-200 transition-colors"
                        >
                            Login
                        </Button>
                    </Link>
                    <Link to="/sign-up">
                        <Button size="sm" className="bg-primary-500 hover:bg-primary-600 text-white transition-all duration-300 hover:scale-105">
                            Sign Up
                        </Button>
                    </Link>
                </div>

                {/* Mobile Hamburger Menu */}
                <button
                    onClick={toggleMenu}
                    className="md:hidden flex items-center justify-center text-gbese-white transition-transform duration-300 hover:scale-110 w-7 h-7"
                    aria-label="Toggle menu"
                    aria-expanded={isMenuOpen}
                >
                    {isMenuOpen ? <X size={28} className="transition-transform duration-200" /> : <Menu size={28} className="transition-transform duration-200" />}
                </button>
            </div>

            {/* Mobile Dropdown Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-primary-900 border-t border-gbese-white/10 animate-in slide-in-from-top duration-300">
                    <div className="px-5 py-6 flex flex-col gap-6">
                        {/* Mobile Navigation Links */}
                        <nav className="flex flex-col gap-4">
                            <a
                                href="#how-it-works"
                                className="text-gbese-white/90 hover:text-gbese-white transition-colors font-medium text-base"
                                onClick={closeMenu}
                            >
                                About Us
                            </a>
                            <a
                                href="#contact"
                                className="text-gbese-white/90 hover:text-gbese-white transition-colors font-medium text-base"
                                onClick={closeMenu}
                            >
                                Contact
                            </a>
                            <a
                                href="#faqs"
                                className="text-gbese-white/90 hover:text-gbese-white transition-colors font-medium text-base"
                                onClick={closeMenu}
                            >
                                FAQs
                            </a>
                        </nav>

                        {/* Mobile Auth Buttons */}
                        <div className="flex flex-col gap-3 pt-4 border-t border-gbese-white/10">
                            <Link to="/sign-in" onClick={closeMenu} className="w-full">
                                <Button
                                    variant="ghost"
                                    className="w-full text-gbese-white hover:text-primary-200 transition-colors"
                                >
                                    Login
                                </Button>
                            </Link>
                            <Link to="/sign-up" onClick={closeMenu} className="w-full">
                                <Button className="w-full bg-primary-500 hover:bg-primary-600 text-white">
                                    Sign Up
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
