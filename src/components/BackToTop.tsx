"use client";

import { useEffect, useState } from "react";

/**
 * Back-to-top button. Appears once the visitor has scrolled down, and returns
 * them to the top. Placed bottom-left so it never collides with the chat and
 * WhatsApp buttons on the right. Honors prefers-reduced-motion.
 */
export default function BackToTop({ label }: { label: string }) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > 600);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    function toTop() {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    }

    return (
        <button
            type="button"
            onClick={toTop}
            aria-label={label}
            tabIndex={visible ? 0 : -1}
            className={[
                "group fixed bottom-5 left-5 z-40 flex h-11 w-11 items-center justify-center rounded-full",
                "border border-plum-300/60 bg-plum-800 text-gold-400 shadow-lift",
                "transition-all duration-300 hover:border-gold-400 hover:text-gold-300",
                "sm:bottom-7 sm:left-7",
                visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0",
            ].join(" ")}
        >
            <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.7}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
            >
                <path d="M12 19V5M6 11l6-6 6 6" />
            </svg>
        </button>
    );
}