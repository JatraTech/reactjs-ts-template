import { useEffect } from "react";
import { Outlet, ScrollRestoration, useLocation, useNavigationType } from "react-router-dom";

import { SiteFooter } from "@/widgets/site-footer/SiteFooter";
import { SiteHeader } from "@/widgets/site-header/SiteHeader";
import { isPreviewMode } from "@/shared/lib/preview";
import { SeoHead } from "@/shared/lib/seo/SeoHead";
import { SiteJsonLd } from "@/shared/lib/seo/SiteJsonLd";
import { PageLoader } from "@/shared/ui/PageLoader";
import { PreviewBanner } from "@/shared/ui/PreviewBanner";

export function MainLayout() {
  const { pathname, hash } = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    if (hash) return;
    if (navigationType !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash, navigationType]);

  const previewMode = isPreviewMode();

  return (
    <PageLoader>
      <ScrollRestoration />
      {!previewMode && <SiteJsonLd />}
      {previewMode && <SeoHead title="Preview" robots="noindex, nofollow" />}
      <div className="flex min-h-dvh flex-col bg-page-bg">
        <PreviewBanner />
        <SiteHeader />
        <main className="flex-1">
          <Outlet />
        </main>
        <SiteFooter />
      </div>
    </PageLoader>
  );
}
