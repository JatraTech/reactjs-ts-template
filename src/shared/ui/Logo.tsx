import { useState } from "react";
import { Link } from "react-router-dom";

import { useGetSiteSettingsQuery } from "@/features/site-settings/api/siteSettingsApi";
import { brand } from "@/shared/config/brand.config";
import { APP_NAME } from "@/shared/config/constants";
import LazyImage from "@/shared/ui/LazyImage";
import { cn } from "@/shared/lib/cn";

interface LogoProps {
  size?: "sm" | "md";
  className?: string;
}

const sizeClasses = {
  sm: "max-h-8 max-w-[140px]",
  md: "max-h-10 max-w-[180px]",
};

export default function Logo({ size = "md", className }: LogoProps) {
  const { data } = useGetSiteSettingsQuery();
  const [hidden, setHidden] = useState(false);
  const logoSrc = data?.logo?.trim() || brand.assets.logoDark;
  const alt = data?.site_name?.trim() || APP_NAME;

  if (hidden) return null;

  return (
    <LazyImage
      src={logoSrc}
      alt={alt}
      priority
      className={cn("block h-auto w-auto object-contain", sizeClasses[size], className)}
      onError={() => setHidden(true)}
    />
  );
}

export function LogoLink({ size = "md", className }: LogoProps) {
  const { data } = useGetSiteSettingsQuery();
  const label = data?.site_name?.trim() || APP_NAME;

  return (
    <Link
      to="/"
      className={cn("inline-flex items-center gap-3 no-underline", className)}
      aria-label={`${label} home`}
    >
      <Logo size={size} />
      <span className="text-lg font-bold text-brand-navy">{label}</span>
    </Link>
  );
}
