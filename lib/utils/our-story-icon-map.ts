import {
  Award,
  Building2,
  FileBadge,
  GraduationCap,
  Heart,
  Medal,
  Target,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { OurStoryIconName } from "@/lib/types/our-story-page-content";

export const ourStoryIconMap: Record<OurStoryIconName, LucideIcon> = {
  users: Users,
  "file-badge": FileBadge,
  "building-2": Building2,
  medal: Medal,
  heart: Heart,
  target: Target,
  award: Award,
  "graduation-cap": GraduationCap,
};
