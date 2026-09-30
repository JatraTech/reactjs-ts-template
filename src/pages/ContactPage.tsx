import { ContactForm } from "@/features/contact/ui/ContactForm";
import { PageSeo } from "@/shared/lib/seo/PageSeo";
import { APP_EMAIL } from "@/shared/config/constants";

export default function ContactPage() {
  return (
    <>
      <PageSeo
        canonicalPath="/contact"
        fallbackTitle="Contact"
        fallbacks={{
          title: "Contact",
          description: APP_EMAIL ? `Contact us at ${APP_EMAIL}` : "Get in touch with our team.",
        }}
        allowWithoutData
      />

      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-2">
        <div>
          <h1 className="text-3xl font-bold text-brand-navy">Contact</h1>
          <p className="mt-4 text-brand-navy/80">
            Submissions POST to <code>/core/contact-inquiries/</code> by default. Align the path in{" "}
            <code>features/contact/api/contactApi.ts</code> with your Django URLs.
          </p>
        </div>
        <ContactForm />
      </div>
    </>
  );
}
