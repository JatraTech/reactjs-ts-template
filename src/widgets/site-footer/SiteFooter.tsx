import { Link } from "react-router-dom";

import { useGetSiteSettingsQuery } from "@/features/site-settings/api/siteSettingsApi";
import { APP_EMAIL, APP_FULL_NAME, NAV_LINKS } from "@/shared/config/constants";

const SOCIAL_KEYS = ["linkedin_url", "instagram_url", "facebook_url", "youtube_url"] as const;

export function SiteFooter() {
  const year = new Date().getFullYear();
  const { data: settings } = useGetSiteSettingsQuery();

  const siteName = settings?.site_name?.trim() || APP_FULL_NAME;
  const email = settings?.support_email?.trim() || APP_EMAIL;

  const socialLinks = SOCIAL_KEYS.map((key) => ({
    key,
    href: settings?.[key]?.trim(),
  })).filter((item) => item.href && item.href !== "#");

  return (
    <footer className="mt-auto border-t border-gray-200 bg-brand-navy text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-semibold">{siteName}</p>
          {email && (
            <a href={`mailto:${email}`} className="mt-1 block text-sm text-white/80 hover:text-white">
              {email}
            </a>
          )}
        </div>
        <div className="flex flex-col gap-4 md:items-end">
          <nav className="flex flex-wrap gap-4 text-sm" aria-label="Footer">
            {NAV_LINKS.map((link) => (
              <Link key={link.path} to={link.path} className="text-white/80 hover:text-white">
                {link.label}
              </Link>
            ))}
          </nav>
          {socialLinks.length > 0 && (
            <nav className="flex flex-wrap gap-3 text-xs uppercase tracking-wide" aria-label="Social">
              {socialLinks.map(({ key, href }) => (
                <a
                  key={key}
                  href={href}
                  className="text-white/70 hover:text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {key.replace("_url", "").replace("_", " ")}
                </a>
              ))}
            </nav>
          )}
        </div>
      </div>
      <p className="border-t border-white/10 py-4 text-center text-xs text-white/60">
        © {year} {siteName}
      </p>
    </footer>
  );
}
