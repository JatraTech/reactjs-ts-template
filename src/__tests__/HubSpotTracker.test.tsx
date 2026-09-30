import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { MemoryRouter, Route, Routes, useNavigate } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import HubSpotTracker, {
  parseHubSpotHubId,
  trackHubSpotPageView,
} from "@/widgets/hubspot-tracker/HubSpotTracker";

const mockUseGetSiteSettingsQuery = vi.fn();

vi.mock("@/features/site-settings/api/siteSettingsApi", () => ({
  useGetSiteSettingsQuery: () => mockUseGetSiteSettingsQuery(),
}));

function NavigationProbe() {
  const navigate = useNavigate();

  return (
    <button type="button" onClick={() => navigate("/contact")}>
      Go to contact
    </button>
  );
}

function renderTracker(initialPath = "/") {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root: Root = createRoot(container);

  act(() => {
    root.render(
      <MemoryRouter initialEntries={[initialPath]}>
        <HubSpotTracker />
        <Routes>
          <Route path="/" element={<NavigationProbe />} />
          <Route path="/contact" element={null} />
        </Routes>
      </MemoryRouter>,
    );
  });

  return {
    container,
    cleanup: () => {
      act(() => {
        root.unmount();
      });
      container.remove();
    },
  };
}

describe("parseHubSpotHubId", () => {
  it("accepts numeric hub ids", () => {
    expect(parseHubSpotHubId("22678419")).toBe("22678419");
  });

  it("rejects non-numeric values", () => {
    expect(parseHubSpotHubId("abc123")).toBe("");
    expect(parseHubSpotHubId("")).toBe("");
    expect(parseHubSpotHubId(undefined)).toBe("");
  });
});

describe("trackHubSpotPageView", () => {
  beforeEach(() => {
    window._hsq = [];
  });

  it("queues setPath and trackPageView", () => {
    trackHubSpotPageView("/contact");

    expect(window._hsq).toEqual([
      ["setPath", "/contact"],
      ["trackPageView"],
    ]);
  });
});

describe("HubSpotTracker", () => {
  beforeEach(() => {
    document.head.innerHTML = "";
    window._hsq = [];
    mockUseGetSiteSettingsQuery.mockReturnValue({ data: { hubspot_tracking_id: "" } });
  });

  afterEach(() => {
    document.head.innerHTML = "";
    vi.clearAllMocks();
  });

  it("does not inject a script when hub id is blank", () => {
    const { cleanup } = renderTracker();

    expect(document.querySelector('script[src*="hs-scripts.com"]')).toBeNull();

    cleanup();
  });

  it("injects the hubspot script when hub id is set", () => {
    mockUseGetSiteSettingsQuery.mockReturnValue({
      data: { hubspot_tracking_id: "22678419" },
    });

    const { cleanup } = renderTracker();
    const script = document.getElementById("hs-script-loader-22678419") as HTMLScriptElement | null;

    expect(script).not.toBeNull();
    expect(script?.src).toContain("js.hs-scripts.com/22678419.js");

    cleanup();
  });
});
