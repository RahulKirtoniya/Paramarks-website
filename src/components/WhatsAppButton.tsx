import { site } from "@/lib/site";

/**
 * Floating WhatsApp click-to-chat button, shown site-wide.
 * Opens WhatsApp (app or web) with a pre-filled message via the wa.me link.
 * Styled to the plum/gold identity rather than a default green bubble.
 * Pure CSS interaction — no client JS. Expands to a label on hover/focus.
 */
export default function WhatsAppButton({
  label,
  message,
}: {
  label: string;
  message: string;
}) {
  const href = `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="group animate-rise fixed bottom-[5.75rem] right-5 z-50 flex items-center gap-0 rounded-full border border-gold-500/60 bg-plum-900 py-3 pl-3 pr-3 text-sand-50 shadow-lift transition-all duration-300 hover:border-gold-400 hover:pr-5 focus-visible:pr-5 sm:bottom-[6.75rem] sm:right-7"
      style={{ animationDelay: "0.6s" }}
    >
      <span className="flex h-8 w-8 flex-none items-center justify-center text-gold-400 transition-colors group-hover:text-gold-300">
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.892c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652a12.062 12.062 0 005.71 1.447h.005c6.585 0 11.946-5.335 11.949-11.893a11.821 11.821 0 00-3.479-8.413z" />
        </svg>
      </span>
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold text-sand-50 transition-all duration-300 group-hover:ml-2.5 group-hover:max-w-[200px] group-focus-visible:ml-2.5 group-focus-visible:max-w-[200px]">
        {label}
      </span>
    </a>
  );
}
