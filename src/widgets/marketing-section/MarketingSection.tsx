import type { ReactNode } from "react";

import { sectionShellClass, type SectionSpacing } from "@/shared/lib/sectionSpacing";
import { RichTextContent } from "@/shared/ui/RichTextContent";
import { cn } from "@/shared/lib/cn";

export interface MarketingSectionProps {
  heading?: string;
  html?: string;
  spacing?: SectionSpacing;
  className?: string;
  children?: ReactNode;
}

export default function MarketingSection({
  heading,
  html,
  spacing = "default",
  className,
  children,
}: MarketingSectionProps) {
  return (
    <section className={cn(sectionShellClass(spacing), "max-w-3xl", className)}>
      {heading?.trim() && <h2 className="text-2xl font-bold text-brand-navy">{heading}</h2>}
      {html?.trim() && <RichTextContent content={html} className={heading ? "mt-4" : undefined} />}
      {children}
    </section>
  );
}
