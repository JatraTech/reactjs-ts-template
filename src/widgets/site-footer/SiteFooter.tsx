import { Link } from "react-router-dom";

import { APP_FULL_NAME, APP_EMAIL, NAV_LINKS } from "@/shared/config/constants";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-gray-200 bg-brand-navy text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-semibold">{APP_FULL_NAME}</p>
          {APP_EMAIL && (
            <a href={`mailto:${APP_EMAIL}`} className="mt-1 block text-sm text-white/80 hover:text-white">
              {APP_EMAIL}
            </a>
          )}
        </div>
        <nav className="flex flex-wrap gap-4 text-sm" aria-label="Footer">
          {NAV_LINKS.map((link) => (
            <Link key={link.path} to={link.path} className="text-white/80 hover:text-white">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
      <p className="border-t border-white/10 py-4 text-center text-xs text-white/60">
        © {year} {APP_FULL_NAME}
      </p>
    </footer>
  );
}
