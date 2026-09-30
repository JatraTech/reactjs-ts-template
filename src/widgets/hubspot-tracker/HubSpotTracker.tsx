import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

import { useGetSiteSettingsQuery } from "@/features/site-settings/api/siteSettingsApi";

export function parseHubSpotHubId(rawId: string | undefined | null): string {
  const trimmed = rawId?.trim() || "";
  return /^[0-9]+$/.test(trimmed) ? trimmed : "";
}

export function trackHubSpotPageView(pathname: string): void {
  window._hsq = window._hsq || [];
  window._hsq.push(["setPath", pathname]);
  window._hsq.push(["trackPageView"]);
}

export default function HubSpotTracker() {
  const { data } = useGetSiteSettingsQuery();
  const { pathname } = useLocation();
  const hubId = parseHubSpotHubId(data?.hubspot_tracking_id);
  const skipInitialPageView = useRef(true);

  useEffect(() => {
    if (!hubId) return;

    const scriptId = `hs-script-loader-${hubId}`;
    if (document.getElementById(scriptId)) return;

    const script = document.createElement("script");
    script.id = scriptId;
    script.async = true;
    script.defer = true;
    script.src = `//js.hs-scripts.com/${hubId}.js`;
    document.head.appendChild(script);

    return () => {
      const existing = document.getElementById(scriptId);
      existing?.remove();
    };
  }, [hubId]);

  useEffect(() => {
    if (!hubId) return;

    if (skipInitialPageView.current) {
      skipInitialPageView.current = false;
      return;
    }

    trackHubSpotPageView(pathname);
  }, [hubId, pathname]);

  return null;
}
