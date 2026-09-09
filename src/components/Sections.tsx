import type { Dictionary, IconName } from "@/i18n/dictionaries/types";
import { Icon } from "./icons/Icons";

/* ---------------- USP feature list ---------------- */

export function USPGrid({
  items,
}: {
  items: { icon: IconName; title: string; text: string }[];
}) {
  return (
    <div className="grid gap-px overflow-hidden rounded-2xl border border-plum-100 bg-plum-100 sm:grid-cols-2">
      {items.map((item, i) => (
        <div
          key={i}
          className="group flex gap-4 bg-sand-50 p-7 transition-colors hover:bg-sand-100"
        >
          <span className="flex h-12 w-12 flex-none items-center justify-center rounded-xl bg-plum-700 text-gold-400 transition-colors group-hover:bg-plum-600">
            <Icon name={item.icon} className="h-6 w-6" />
          </span>
          <div>
            <h3 className="text-base font-semibold text-plum-700">{item.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-500">{item.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------------- Services grid ---------------- */

export function ServicesGrid({
  items,
}: {
  items: { title: string; text: string }[];
}) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, i) => (
        <article
          key={i}
          className="group relative overflow-hidden rounded-2xl border border-plum-100 bg-sand-50 p-6 shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-lift"
        >
          <span
            aria-hidden
            className="absolute right-5 top-5 h-8 w-8 rounded-full border border-gold-300/60 opacity-0 transition-opacity group-hover:opacity-100"
          />
          <h3 className="text-title font-serif text-plum-700">{item.title}</h3>
          <p className="mt-2.5 text-sm leading-relaxed text-ink-500">{item.text}</p>
          <span className="mt-5 block h-px w-8 bg-gold-500/70 transition-all duration-200 group-hover:w-14" />
        </article>
      ))}
    </div>
  );
}

/* ---------------- Team cards ---------------- */

export function TeamGrid({
  members,
}: {
  members: Dictionary["team"]["members"];
}) {
  return (
    <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
      {members.map((m, i) => (
        <article
          key={i}
          className="flex flex-col rounded-2xl border border-plum-100 bg-sand-50 p-7 shadow-card"
        >
          {/* Portrait placeholder — swap for a real photo */}
          <div className="relative mb-6 aspect-[4/5] w-full overflow-hidden rounded-xl bg-gradient-to-br from-plum-700 to-plum-900">
            <div
              aria-hidden
              className="absolute inset-0 opacity-30"
              style={{
                background:
                  "radial-gradient(60% 60% at 30% 20%, rgba(198,161,91,0.4), transparent 60%)",
              }}
            />
            <span className="absolute bottom-4 left-4 flex h-11 w-11 items-center justify-center rounded-lg bg-sand-50/10 text-gold-300 backdrop-blur">
              <Icon name={m.icon} className="h-6 w-6" />
            </span>
            <span className="absolute right-4 top-4 font-serif text-5xl text-sand-50/15">
              {m.name.split(" ").map((w) => w[0]).join("")}
            </span>
          </div>

          <h3 className="text-title font-serif text-plum-700">{m.name}</h3>
          <p className="mt-1 text-sm font-semibold text-gold-600">{m.role}</p>
          <p className="mt-3 text-xs font-medium uppercase tracking-wide text-ink-400">
            {m.credentials}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-ink-500">{m.bio}</p>
        </article>
      ))}
    </div>
  );
}
