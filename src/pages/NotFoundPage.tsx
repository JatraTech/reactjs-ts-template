import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { PageSeo } from "@/shared/lib/seo/PageSeo";

export default function NotFoundPage() {
  return (
    <>
      <PageSeo
        canonicalPath="/404"
        fallbackTitle="Page Not Found"
        fallbacks={{ description: "The page you requested could not be found." }}
        robots="noindex, nofollow"
        allowWithoutData
      />

      <div className="mx-auto flex max-w-lg flex-col items-center px-6 py-24 text-center">
        <p className="text-7xl font-bold text-brand-primary">404</p>
        <h1 className="mt-4 text-2xl font-bold text-brand-navy">Page not found</h1>
        <p className="mt-2 text-brand-navy/70">Check the URL or return to the homepage.</p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 bg-brand-primary px-6 py-3 text-sm font-semibold text-white hover:bg-brand-primary-dark"
        >
          <ArrowLeft size={16} aria-hidden />
          Home
        </Link>
      </div>
    </>
  );
}
