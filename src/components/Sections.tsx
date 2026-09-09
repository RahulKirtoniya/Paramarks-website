import type { Dictionary, IconName } from "@/i18n/dictionaries/types";
import { Icon } from "./icons/Icons";

/* ---------------- USP — editorial hairline rows, not cards ---------------- */

export function USPGrid({
  items,
}: {
  items: { icon: IconName; title: string; text: string }[];
}) {
  return (
    <div className="grid gap-x-14 gap-y-10 sm:grid-cols-2">
      {items.map((item, i) => (
        <div key={i} className="border-t border-plum-200 pt-6">
          <div className="flex items-start gap-4">
            <Icon name={item.icon} className="mt-0.5 h-6 w-6 flex-none text-gold-600" />
            <div>
              <h3 className="font-serif text-[1.3rem] font-semibold leading-tight text-plum-700">
                {item.title}
              </h3>
              <p className="mt-2 text-[0.98rem] leading-relaxed text-ink-500">{item.text}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------------- Services — an index/register, hairline-ruled ---------------- */

export function ServicesGrid({
  items,
}: {
  items: { title: string; text: string }[];
}) {
  return (
    <div className="grid border-t border-plum-200 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, i) => (
        <article
          key={i}
          className="group border-b border-plum-200 py-7 pr-6 sm:[&:nth-child(odd)]:border-r sm:[&:nth-child(odd)]:pr-8 lg:[&:nth-child(3n+1)]:border-r lg:[&:nth-child(3n+2)]:border-r lg:pr-8"
        >
          <div className="sm:pl-2 lg:pl-4">
            <h3 className="font-serif text-[1.35rem] font-semibold leading-tight text-plum-700 transition-colors group-hover:text-gold-700">
              {item.title}
            </h3>
            <p className="mt-2.5 max-w-[42ch] text-[0.95rem] leading-relaxed text-ink-500">
              {item.text}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}

/* ---------------- Team — portrait plate + structured credentials ---------------- */

export function TeamGrid({
  members,
}: {
  members: Dictionary["team"]["members"];
}) {
  return (
    <div className="grid gap-x-10 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
      {members.map((m, i) => {
        const creds = m.credentials.split("\u00B7").map((s) => s.trim()).filter(Boolean);
        return (
          <article key={i} className="flex flex-col">
            {/* Portrait plate — deep plum with the seal watermark; swap for a real photo */}
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-card bg-plum-800">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-[0.13]"
                style={{
                  backgroundImage:
                    "repeating-radial-gradient(circle at 30% 22%, #C6A15B 0 1px, transparent 1px 13px)",
                }}
              />
              <span className="absolute left-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-gold-500/40 text-gold-400">
                <Icon name={m.icon} className="h-5 w-5" />
              </span>
              <span className="absolute bottom-4 right-5 font-serif text-6xl italic text-sand-50/12">
                {m.name.split(" ").map((w) => w[0]).join("")}
              </span>
            </div>

            <h3 className="mt-6 font-serif text-[1.45rem] font-semibold text-plum-700">{m.name}</h3>
            <p className="mt-1 text-sm font-semibold text-gold-700">{m.role}</p>

            <ul className="mt-4 space-y-1.5 border-t border-plum-200 pt-4">
              {creds.map((c, j) => (
                <li key={j} className="text-[0.82rem] leading-snug text-ink-400">
                  {c}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[0.95rem] leading-relaxed text-ink-500">{m.bio}</p>
          </article>
        );
      })}
    </div>
  );
}
