import type { ElementType, ReactNode } from "react";

import { cn } from "@/shared/lib/cn";

export const SHELL_MAX = "mx-auto max-w-6xl";
export const SHELL_GUTTER = "px-6";

interface PageContainerProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}

export default function PageContainer({
  children,
  className,
  as: Tag = "div",
}: PageContainerProps) {
  return (
    <Tag className={cn("w-full", SHELL_MAX, SHELL_GUTTER, className)}>{children}</Tag>
  );
}
