import { Link } from "react-router-dom";

import { useGetHomepageQuery } from "@/features/website/api/websiteApi";
import { APP_TAGLINE } from "@/shared/config/constants";
import { PageSeo } from "@/shared/lib/seo/PageSeo";
import { Img } from "@/shared/ui/Img";
import { RichTextContent } from "@/shared/ui/RichTextContent";

export default function HomePage() {
  const { data: home, isLoading, isError } = useGetHomepageQuery();

  const title = home?.hero_title ?? "Welcome";
  const subtitle = home?.hero_subtitle ?? APP_TAGLINE;

  return (
    <>
      <PageSeo
        cms={home}
        canonicalPath="/"
        fallbackTitle="Home"
        fallbacks={{
          title,
          description: home?.about_body ?? subtitle,
          image: home?.hero_image,
        }}
        isLoading={isLoading}
        allowWithoutData
      />

      <section className="bg-brand-navy px-6 py-20 text-white md:py-28">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2 md:items-center">
          <div>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">{title}</h1>
            <p className="mt-4 text-lg text-white/85">{subtitle}</p>
            <Link
              to="/contact"
              className="mt-8 inline-block bg-brand-primary px-6 py-3 text-sm font-semibold text-white hover:bg-brand-primary-dark"
            >
              Get in touch
            </Link>
            {isError && (
              <p className="mt-4 text-sm text-amber-200">
                CMS API unavailable — showing static fallbacks. Start your Django API or update{" "}
                <code className="rounded bg-white/10 px-1">VITE_API_BASE_URL</code>.
              </p>
            )}
          </div>
          {home?.hero_image && (
            <Img
              src={home.hero_image}
              alt={home.hero_image_alt ?? ""}
              className="aspect-[4/3] w-full rounded-lg object-cover"
              loading="eager"
              fetchPriority="high"
            />
          )}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-16">
        <h2 className="text-2xl font-bold text-brand-navy">
          {home?.about_heading ?? "About this template"}
        </h2>
        <RichTextContent
          content={
            home?.about_body ??
            "<p>This page loads content from <code>GET /website/homepage/</code>. Replace copy via Backstage or your CMS.</p>"
          }
          className="mt-4"
        />
      </section>
    </>
  );
}
