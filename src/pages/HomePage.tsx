import { useGetHomepageQuery } from "@/features/homepage/api/homepageApi";
import { APP_TAGLINE } from "@/shared/config/constants";
import { PageSeo } from "@/shared/lib/seo/PageSeo";
import MarketingSection from "@/widgets/marketing-section/MarketingSection";
import PageHero from "@/widgets/page-hero/PageHero";

export default function HomePage() {
  const { data: home, isLoading, isError } = useGetHomepageQuery();

  const title = home?.hero_title ?? "Welcome";
  const subtitle = home?.hero_subtitle?.trim() || APP_TAGLINE;

  return (
    <>
      <PageSeo
        cms={home?.seo}
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

      <PageHero
        eyebrow={home?.hero_eyebrow}
        title={title}
        description={subtitle}
        ctaText={home?.hero_button_text ?? "Get in touch"}
        ctaLink={home?.hero_button_link ?? "/contact"}
        imageSrc={home?.hero_image}
        imageAlt={home?.hero_image_alt}
      />

      {isError && (
        <MarketingSection
          spacing="compact"
          html="<p>CMS API unavailable — showing static fallbacks. Start your Django API or set <code>VITE_API_BASE_URL</code>.</p>"
        />
      )}

      <MarketingSection
        heading={home?.about_heading ?? "About this template"}
        html={
          home?.about_body ??
          "<p>Content loads from <code>GET /website/homepage/</code>. Pages compose <code>widgets/</code>; CMS logic lives in <code>features/homepage</code>.</p>"
        }
      />
    </>
  );
}
