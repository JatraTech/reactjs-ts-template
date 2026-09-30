import {
  PAGE_SECTION_CONTAINER,
  PAGE_SECTION_PADDING,
} from "@/shared/lib/sectionLayout";

export type SectionSpacing = "default" | "compact";

const VERTICAL_PAD: Record<SectionSpacing, string> = {
  default: PAGE_SECTION_PADDING,
  compact: "py-8 md:py-10",
};

/** Horizontal shell + vertical section padding for below-hero blocks. */
export function sectionShellClass(spacing: SectionSpacing = "default", className?: string) {
  return [PAGE_SECTION_CONTAINER, VERTICAL_PAD[spacing], className].filter(Boolean).join(" ");
}
