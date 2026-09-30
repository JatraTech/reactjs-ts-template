interface BrandedLoadingOverlayProps {
  exiting?: boolean;
}

export function BrandedLoadingOverlay({ exiting = false }: BrandedLoadingOverlayProps) {
  return (
    <div
      className={`loading-overlay fixed inset-0 z-[9999] flex items-center justify-center bg-page-bg ${
        exiting ? "loading-overlay-exiting" : ""
      }`}
      aria-busy={!exiting}
      aria-label="Loading"
      role="status"
    >
      <div className="loading-overlay-content flex flex-col items-center gap-5">
        <p className="text-sm font-semibold tracking-wide text-brand-navy">Loading…</p>
        <div className="loading-spinner" aria-hidden="true" />
      </div>
    </div>
  );
}
