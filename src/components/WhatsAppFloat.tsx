import { WhatsAppIcon } from "./Icons";
import { waLink } from "@/lib/whatsapp";

/** Botón flotante de WhatsApp, visible en todas las páginas. */
export function WhatsAppFloat() {
  return (
    <a
      href={waLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      className="group fixed right-4 bottom-4 z-40 flex items-center gap-3 rounded-full bg-[#25D366] p-3.5 text-[#0a0a0a] shadow-[0_10px_40px_-10px_rgba(37,211,102,.6)] transition-transform hover:scale-105 md:right-6 md:bottom-6"
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-20 [animation-duration:3s]" />
      <WhatsAppIcon className="relative h-6 w-6" />
      <span className="relative hidden max-w-0 overflow-hidden text-sm font-semibold whitespace-nowrap transition-all duration-500 group-hover:max-w-40 group-hover:pr-1 md:inline">
        Escríbenos
      </span>
    </a>
  );
}
