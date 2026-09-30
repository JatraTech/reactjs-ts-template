import { cn } from "@/shared/lib/cn";

const HTML_TAG_PATTERN = /<[a-z][\s\S]*>/i;

type RichTextContentProps = {
  content?: string | null;
  className?: string;
};

export function RichTextContent({ content, className }: RichTextContentProps) {
  if (!content?.trim()) return null;

  if (HTML_TAG_PATTERN.test(content)) {
    return (
      <div
        className={cn("rich-text space-y-4 text-brand-navy/85 leading-relaxed", className)}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  }

  return (
    <div className={cn("space-y-4 text-brand-navy/85 leading-relaxed", className)}>
      {content.split(/\n\n+/).map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </div>
  );
}
