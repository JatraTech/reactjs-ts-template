import { useGetAboutQuery } from "@/features/about/api/aboutApi";
import { APP_FULL_NAME, APP_TAGLINE } from "@/shared/config/constants";
import { PageSeo } from "@/shared/lib/seo/PageSeo";
import MarketingSection from "@/widgets/marketing-section/MarketingSection";
import PageHero from "@/widgets/page-hero/PageHero";

export default function AboutPage() {
  const { data, isLoading, isError } = useGetAboutQuery();

  const fallbackTitle = `About — ${APP_FULL_NAME}`;
  const fallbackDescription = `Learn more about ${APP_FULL_NAME}. ${APP_TAGLINE}`;

  return (
    <>
      <PageSeo
        cms={data?.seo}
        canonicalPath="/about"
        fallbackTitle="About"
        fallbacks={{
          title: data?.hero_title ?? fallbackTitle,
          description: data?.hero_subhead ?? fallbackDescription,
          image: data?.hero_image,
        }}
        isLoading={isLoading}
        allowWithoutData
      />

      {data ? (
        <>
          <PageHero
            eyebrow={data.hero_eyebrow}
            title={data.hero_title}
            description={data.hero_subhead}
            imageSrc={data.hero_image}
            imageAlt={data.hero_image_alt}
            priorityImage={false}
          />
          {(data.body_heading || data.body_html) && (
            <MarketingSection heading={data.body_heading} html={data.body_html} />
          )}
        </>
      ) : (
        !isLoading && (
          <MarketingSection
            heading="About"
            html={
              isError
                ? `<p>Could not load <code>/website/about/</code>. Wire the About page in Django or keep static copy here.</p>`
                : `<p>Replace this with CMS-driven content from <code>GET /website/about/</code>.</p><p>${fallbackDescription}</p>`
            }
          />
        )
      )}
    </>
  );
}
