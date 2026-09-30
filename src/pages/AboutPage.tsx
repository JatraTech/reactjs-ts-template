import { PageSeo } from "@/shared/lib/seo/PageSeo";
import { APP_FULL_NAME, APP_TAGLINE } from "@/shared/config/constants";

export default function AboutPage() {
  return (
    <>
      <PageSeo
        canonicalPath="/about"
        fallbackTitle="About"
        fallbacks={{
          title: `About — ${APP_FULL_NAME}`,
          description: `Learn more about ${APP_FULL_NAME}. ${APP_TAGLINE}`,
        }}
        allowWithoutData
      />

      <div className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-3xl font-bold text-brand-navy">About</h1>
        <p className="mt-4 text-brand-navy/80">
          Replace this page with CMS-driven content (e.g. <code>GET /website/about/</code>) or keep
          it static. The routing and <code>PageSeo</code> pattern are the important parts of the
          template.
        </p>
      </div>
    </>
  );
}
