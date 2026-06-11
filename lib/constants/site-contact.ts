export const siteContact = {
  phone: "+91 80913 45674",
  phoneHref: "tel:+918091345674",
  email: "kumar@moriyaedu.com",
  emailHref: "mailto:kumar@moriyaedu.com",
  whatsappNumber: "918091345674",
  whatsappPrefillMessage:
    "Hi SRR Careers, I would like to know more about your SAP S/4 HANA FICO training.",
  whatsappLabel: "WhatsApp us",
} as const;

export function getWhatsAppHref(
  message: string = siteContact.whatsappPrefillMessage,
) {
  return `https://wa.me/${siteContact.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
