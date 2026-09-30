import PageContainer from "@/shared/ui/PageContainer";
import SmartLink from "@/shared/ui/SmartLink";
import LazyImage from "@/shared/ui/LazyImage";
import { cn } from "@/shared/lib/cn";

export interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
  imageSrc?: string | null;
  imageAlt?: string;
  priorityImage?: boolean;
  className?: string;
}

export default function PageHero({
  eyebrow,
  title,
  description,
  ctaText,
  ctaLink,
  imageSrc,
  imageAlt = "",
  priorityImage = true,
  className,
}: PageHeroProps) {
  const hasImage = Boolean(imageSrc?.trim());
  const showCta = Boolean(ctaText?.trim() && ctaLink?.trim());

  return (
    <section className={cn("bg-brand-navy py-16 text-white md:py-24", className)}>
      <PageContainer>
        <div
          className={cn(
            "grid gap-10",
            hasImage ? "md:grid-cols-2 md:items-center" : "max-w-3xl",
          )}
        >
          <div>
            {eyebrow?.trim() && (
              <p className="text-sm font-semibold uppercase tracking-wider text-white/70">{eyebrow}</p>
            )}
            <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">{title}</h1>
            {description?.trim() && <p className="mt-4 text-lg text-white/85">{description}</p>}
            {showCta && (
              <SmartLink
                href={ctaLink!}
                className="mt-8 inline-block bg-brand-primary px-6 py-3 text-sm font-semibold text-white hover:bg-brand-primary-dark"
              >
                {ctaText}
              </SmartLink>
            )}
          </div>
          {hasImage && (
            <LazyImage
              src={imageSrc!}
              alt={imageAlt}
              priority={priorityImage}
              className="aspect-[4/3] w-full rounded-lg object-cover"
            />
          )}
        </div>
      </PageContainer>
    </section>
  );
}
