import { Link } from "react-router";
import { Button } from "@/components/ui/button";

export default function Navbar() {
    return (
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
                        <a href="#how-it-works" className="body-sm md:body text-gbese-white/90 hover:text-gbese-white transition-colors">
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
    );
}
