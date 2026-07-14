import { Icon } from "@/components/ui/icon";

type PreFooterContactButtonsProps = {
  phoneButtonLabel: string;
  emailButtonLabel: string;
};

const buttonClassName =
  "inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-base font-semibold text-brand-purple shadow-lg";

export function PreFooterContactButtons({
  phoneButtonLabel,
  emailButtonLabel,
}: PreFooterContactButtonsProps) {
  return (
    <div className="flex flex-wrap gap-4">
      <span className={buttonClassName}>
        <Icon name="phone" className="h-4 w-4" strokeWidth={2} />
        {phoneButtonLabel}
      </span>
      <span className={buttonClassName}>
        <Icon name="mail" className="h-4 w-4" strokeWidth={2} />
        {emailButtonLabel}
      </span>
    </div>
  );
}
