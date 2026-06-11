import { getWhatsAppHref } from "@/lib/constants/site-contact";
import { SocialIcon } from "@/components/ui/social-icon";

export function WhatsAppWidget() {
  return (
    <a
      href={getWhatsAppHref()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with SRR Careers on WhatsApp"
      className="fixed z-50 flex size-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-md transition-colors hover:bg-[#20bd5a] sm:size-14 [bottom:max(1rem,env(safe-area-inset-bottom))] [right:max(1rem,env(safe-area-inset-right))]"
    >
      <SocialIcon platform="whatsapp" className="size-7" />
    </a>
  );
}
