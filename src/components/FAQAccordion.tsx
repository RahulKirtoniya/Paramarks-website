"use client";

import { useState } from "react";
import { PlusIcon } from "./icons/Icons";

export default function FAQAccordion({
  items,
}: {
  items: { q: string; a: string }[];
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-plum-100 border-y border-plum-100">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i}>
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-6 py-6 text-left"
              >
                <span className="text-title font-serif text-plum-700">
                  {item.q}
                </span>
                <span
                  className={[
                    "flex h-9 w-9 flex-none items-center justify-center rounded-full border transition-all duration-300",
                    isOpen
                      ? "rotate-45 border-gold-500 bg-gold-500 text-plum-950"
                      : "border-plum-200 text-plum-500",
                  ].join(" ")}
                >
                  <PlusIcon className="h-4 w-4" />
                </span>
              </button>
            </h3>
            <div
              className={[
                "grid transition-all duration-300 ease-in-out",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
              ].join(" ")}
            >
              <div className="overflow-hidden">
                <p className="max-w-prose pb-6 pr-12 text-base leading-relaxed text-ink-500">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
