import {
  ArrowUpRight,
  ChartSpline,
  Clock,
  FileBadge,
  Mail,
  MessageCircle,
  Phone,
  Quote,
  ScanFace,
  Settings,
  Star,
  TriangleAlert,
  type LucideProps,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";

const icons = {
  chat: MessageCircle,
  settings: Settings,
  chart: ChartSpline,
  alert: TriangleAlert,
  project: ScanFace,
  clock: Clock,
  document: FileBadge,
  star: Star,
  quote: Quote,
  arrowUpRight: ArrowUpRight,
  phone: Phone,
  mail: Mail,
} as const;

export type IconName = keyof typeof icons;

type IconProps = {
  name: IconName;
  className?: string;
} & Omit<LucideProps, "ref">;

export function Icon({ name, className, ...props }: IconProps) {
  const LucideIcon = icons[name];

  return (
    <LucideIcon
      className={cn("shrink-0", className)}
      aria-hidden
      {...props}
    />
  );
}

/** @deprecated Use IconName */
export type HomeIconKey = IconName;
