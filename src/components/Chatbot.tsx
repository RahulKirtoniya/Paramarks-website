"use client";

import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/types";
import { localePath } from "@/lib/paths";
import { site } from "@/lib/site";

/**
 * Paramarks assistant — a curated, bilingual helper.
 *
 * It answers from the firm's own FAQ and services content (no external AI, no
 * keys, no cost) and hands off to the contact form, WhatsApp or email for
 * anything specific. This keeps answers accurate and on-message — appropriate
 * for a law firm — while still feeling responsive.
 */

type Chip = { label: string; query?: string; href?: string; external?: boolean };
type Msg = { role: "bot" | "user"; text: string; chips?: Chip[] };

const STOP = new Set([
    "the", "a", "an", "of", "to", "in", "on", "for", "and", "or", "is", "are", "do", "you", "i", "we", "my", "our",
    "with", "how", "what", "can", "does", "it", "this", "that", "your", "me", "us", "de", "het", "een", "van", "en",
    "of", "ik", "we", "wij", "mijn", "ons", "onze", "hoe", "wat", "kan", "kunt", "u", "je", "uw", "met", "is", "zijn",
    "op", "voor", "naar", "in", "die", "dit", "dat",
]);

function norm(s: string): string {
    return s
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9\s]/g, " ");
}

function tokens(s: string): string[] {
    return norm(s)
        .split(/\s+/)
        .filter((t) => t.length > 1 && !STOP.has(t));
}

export default function Chatbot({
    locale,
    dict,
}: {
    locale: Locale;
    dict: Dictionary;
}) {
    const nl = locale === "nl";
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<Msg[]>([]);
    const listRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const panelId = "paramarks-assistant";

    const t = {
        title: nl ? "Paramarks-assistent" : "Paramarks assistant",
        sub: nl ? "Snelle antwoorden, direct" : "Quick answers, right away",
        greeting: nl
            ? "Hallo! Ik beantwoord veelgestelde vragen over merkbescherming in Suriname. Waar kan ik u mee helpen?"
            : "Hello! I answer common questions about trademark protection in Suriname. How can I help?",
        placeholder: nl ? "Typ uw vraag\u2026" : "Type your question\u2026",
        send: nl ? "Versturen" : "Send",
        open: nl ? "Open de assistent" : "Open the assistant",
        close: nl ? "Sluit de assistent" : "Close the assistant",
        contact: nl ? "Neem contact op" : "Contact us",
        services: nl ? "Bekijk diensten" : "See services",
        whatsapp: nl ? "Chat via WhatsApp" : "Chat on WhatsApp",
        email: nl ? "Stuur een e-mail" : "Email us",
        fallback: nl
            ? "Daar heb ik zo geen kant-en-klaar antwoord op. Voor uw specifieke zaak reageert ons team snel \u2014 laat het ons weten."
            : "I don't have a ready answer for that. For your specific matter our team responds promptly \u2014 reach out and we'll help.",
        handoff: nl ? "Liever direct contact?" : "Prefer to talk to someone?",
    };

    const links = {
        contact: { label: t.contact, href: localePath(locale, "contact") },
        services: { label: t.services, href: localePath(locale, "services") },
        whatsapp: {
            label: t.whatsapp,
            href: `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(
                nl ? "Hallo Paramarks, ik heb een vraag." : "Hello Paramarks, I have a question.",
            )}`,
            external: true,
        },
        email: { label: t.email, href: `mailto:${site.contact.email}`, external: true },
    };

    // Knowledge base assembled from the firm's own localized content.
    const kb = [
        ...dict.faq.items.map((i) => ({ text: i.a, match: `${i.q} ${i.a}` })),
        ...dict.services.grid.map((s) => ({ text: `${s.title}: ${s.text}`, match: `${s.title} ${s.text}` })),
    ].map((k) => ({ ...k, toks: new Set(tokens(k.match)) }));

    const intents: { keys: string[]; reply: () => Msg }[] = [
        {
            keys: nl
                ? ["contact", "bellen", "telefoon", "afspraak", "mail", "email", "bereiken"]
                : ["contact", "call", "phone", "reach", "appointment", "consultation", "talk"],
            reply: () => ({
                role: "bot",
                text: nl
                    ? `U bereikt ons via ${site.contact.email}. Kies hieronder wat u het beste uitkomt.`
                    : `You can reach us at ${site.contact.email}. Pick whichever suits you below.`,
                chips: [links.contact, links.whatsapp, links.email],
            }),
        },
        {
            keys: nl
                ? ["kosten", "prijs", "tarief", "tarieven", "wat kost"]
                : ["cost", "price", "fee", "fees", "pricing", "how much"],
            reply: () => ({
                role: "bot",
                text: nl
                    ? "Kosten hangen af van de zaak en de omvang van het werk. We geven graag een heldere inschatting \u2014 neem contact op voor een offerte."
                    : "Fees depend on the matter and the scope of work. We're glad to give a clear estimate \u2014 contact us for a quote.",
                chips: [links.contact, links.whatsapp],
            }),
        },
        {
            keys: nl
                ? ["registreren", "registratie", "aanvragen", "depot", "inschrijven"]
                : ["register", "registration", "file", "filing", "apply", "trademark my"],
            reply: () => ({
                role: "bot",
                text: nl
                    ? "Wij verzorgen het volledige traject: onderzoek, depot en registratie in Suriname. Vertel ons over uw merk en we begeleiden u stap voor stap."
                    : "We handle the full path: search, filing and registration in Suriname. Tell us about your brand and we'll guide you through each step.",
                chips: [links.services, links.contact],
            }),
        },
    ];

    function answer(query: string): Msg {
        const qToks = tokens(query);
        const qSet = new Set(qToks);

        // Greeting / thanks shortcuts
        const raw = norm(query);
        if (/\b(hi|hello|hey|hallo|goedendag|hoi)\b/.test(raw) && qToks.length <= 2) {
            return { role: "bot", text: t.greeting, chips: quickReplies() };
        }
        if (/\b(thanks|thank|bedankt|dank)\b/.test(raw)) {
            return {
                role: "bot",
                text: nl ? "Graag gedaan! Kan ik nog ergens mee helpen?" : "You're welcome! Anything else I can help with?",
                chips: quickReplies(),
            };
        }

        // Intent match
        for (const intent of intents) {
            if (intent.keys.some((k) => raw.includes(norm(k)))) return intent.reply();
        }

        // Knowledge-base best match
        let best = { score: 0, text: "" };
        for (const k of kb) {
            let score = 0;
            for (const tok of qSet) if (k.toks.has(tok)) score += 1;
            if (score > best.score) best = { score, text: k.text };
        }
        if (best.score >= 2) {
            return {
                role: "bot",
                text: best.text,
                chips: [links.contact, links.whatsapp],
            };
        }

        return { role: "bot", text: t.fallback, chips: [links.contact, links.whatsapp, links.email] };
    }

    function quickReplies(): Chip[] {
        const faqChips = dict.faq.items.slice(0, 3).map((i) => ({ label: i.q, query: i.q }));
        return [...faqChips, links.contact];
    }

    function push(msg: Msg) {
        setMessages((m) => [...m, msg]);
    }

    function send(text: string) {
        const clean = text.trim();
        if (!clean) return;
        push({ role: "user", text: clean });
        setInput("");
        // Small delay so it reads as a reply, not an echo.
        window.setTimeout(() => push(answer(clean)), 220);
    }

    // Open: seed the greeting once.
    useEffect(() => {
        if (open && messages.length === 0) {
            setMessages([{ role: "bot", text: t.greeting, chips: quickReplies() }]);
        }
        if (open) window.setTimeout(() => inputRef.current?.focus(), 120);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);

    // Autoscroll to newest.
    useEffect(() => {
        listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
    }, [messages]);

    // Esc closes.
    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open]);

    return (
        <>
            {/* Panel */}
            {open && (
                <div
                    id={panelId}
                    role="dialog"
                    aria-label={t.title}
                    className="fixed bottom-[8.5rem] right-5 z-50 flex max-h-[70vh] w-[min(360px,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-panel border border-plum-200 bg-sand-50 shadow-lift sm:bottom-[9.5rem] sm:right-7"
                >
                    {/* Header */}
                    <div className="relative flex items-center justify-between gap-3 bg-plum-900 px-5 py-4 text-sand-50">
                        <div
                            aria-hidden
                            className="pointer-events-none absolute inset-0 opacity-70"
                            style={{ background: "radial-gradient(60% 120% at 90% 0%, rgba(198,161,91,0.16), transparent 60%)" }}
                        />
                        <div className="relative">
                            <p className="font-serif text-[1.05rem] font-semibold leading-none">
                                {t.title}
                                <span className="ml-1 align-super font-sans text-[0.55rem] text-gold-400">&#174;</span>
                            </p>
                            <p className="mt-1 text-[0.72rem] text-sand-200/70">{t.sub}</p>
                        </div>
                        <button
                            type="button"
                            onClick={() => setOpen(false)}
                            aria-label={t.close}
                            className="relative flex h-8 w-8 items-center justify-center rounded-full text-sand-200/80 hover:text-gold-300"
                        >
                            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round">
                                <path d="M6 6l12 12M18 6L6 18" />
                            </svg>
                        </button>
                    </div>

                    {/* Messages */}
                    <div ref={listRef} className="flex-1 space-y-4 overflow-y-auto px-4 py-5" aria-live="polite">
                        {messages.map((m, i) => (
                            <div key={i} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
                                <div className="max-w-[85%]">
                                    <div
                                        className={[
                                            "rounded-panel px-4 py-2.5 text-[0.92rem] leading-relaxed",
                                            m.role === "user"
                                                ? "bg-plum-700 text-sand-50"
                                                : "border border-plum-100 bg-paper text-ink-700",
                                        ].join(" ")}
                                    >
                                        {m.text}
                                    </div>
                                    {m.chips && m.chips.length > 0 && (
                                        <div className="mt-2.5 flex flex-wrap gap-2">
                                            {m.chips.map((c, j) =>
                                                c.href ? (
                                                    <a
                                                        key={j}
                                                        href={c.href}
                                                        target={c.external ? "_blank" : undefined}
                                                        rel={c.external ? "noopener noreferrer" : undefined}
                                                        className="rounded-full border border-gold-500/60 bg-gold-100/40 px-3 py-1.5 text-[0.8rem] font-semibold text-plum-700 transition-colors hover:border-gold-500 hover:bg-gold-100"
                                                    >
                                                        {c.label}
                                                    </a>
                                                ) : (
                                                    <button
                                                        key={j}
                                                        type="button"
                                                        onClick={() => send(c.query || c.label)}
                                                        className="rounded-full border border-plum-200 px-3 py-1.5 text-left text-[0.8rem] font-medium text-plum-700 transition-colors hover:border-gold-500 hover:text-plum-900"
                                                    >
                                                        {c.label}
                                                    </button>
                                                ),
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Input */}
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            send(input);
                        }}
                        className="flex items-center gap-2 border-t border-plum-100 bg-sand-50 p-3"
                    >
                        <input
                            ref={inputRef}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder={t.placeholder}
                            aria-label={t.placeholder}
                            autoComplete="off"
                            className="min-w-0 flex-1 rounded-card border border-plum-200 bg-paper px-3.5 py-2.5 text-[0.92rem] text-ink-700 placeholder:text-ink-400 focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/25"
                        />
                        <button
                            type="submit"
                            aria-label={t.send}
                            disabled={!input.trim()}
                            className="flex h-10 w-10 flex-none items-center justify-center rounded-card bg-gold-500 text-plum-950 transition-colors hover:bg-gold-400 disabled:opacity-40"
                        >
                            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
                                <path d="M4 12h15M13 6l6 6-6 6" />
                            </svg>
                        </button>
                    </form>
                </div>
            )}

            {/* Launcher */}
            <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls={panelId}
                aria-label={open ? t.close : t.open}
                className="group animate-rise fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-gold-500/60 bg-plum-900 text-gold-400 shadow-lift transition-all duration-300 hover:border-gold-400 hover:text-gold-300 sm:bottom-7 sm:right-7"
                style={{ animationDelay: "0.45s" }}
            >
                {open ? (
                    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round">
                        <path d="M6 6l12 12M18 6L6 18" />
                    </svg>
                ) : (
                    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4.5 5.5h15a1 1 0 011 1v8a1 1 0 01-1 1H9l-4 3.2V16.5H4.5a1 1 0 01-1-1v-9a1 1 0 011-1Z" />
                        <path d="M8 9.5h8M8 12.5h5" />
                    </svg>
                )}
            </button>
        </>
    );
}