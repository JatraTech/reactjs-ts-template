import { NavLink } from "react-router-dom";

import { NAV_LINKS } from "@/shared/config/constants";
import { cn } from "@/shared/lib/cn";
import { LogoLink } from "@/shared/ui/Logo";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    "text-sm font-medium transition-colors",
    isActive ? "text-brand-primary" : "text-brand-navy/80 hover:text-brand-primary",
  );

export function SiteHeader() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
        <LogoLink />
        <nav className="flex flex-wrap items-center gap-6" aria-label="Main">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.path} to={link.path} className={navLinkClass}>
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
