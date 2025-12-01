import { useEffect } from "react";
import { useLocation } from "react-router";

/**
 * @fileoverview - Scrolls its parent component to the top of the window
 * on every route change
 * @returns null
 */
export default function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [pathname]);

    return null;
}
