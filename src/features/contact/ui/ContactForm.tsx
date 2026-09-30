import { useState } from "react";
import { Send } from "lucide-react";

import { useSubmitContactMutation } from "@/features/contact/api/contactApi";
import { cn } from "@/shared/lib/cn";

const inputClass =
  "w-full border border-gray-300 px-4 py-3.5 focus:border-brand-primary focus:outline-none";

export function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitContact, { isLoading, isError }] = useSubmitContactMutation();

  const update = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitContact(form).unwrap();
      setSubmitted(true);
    } catch {
      /* error state shown below */
    }
  };

  if (submitted) {
    return (
      <div className="bg-green-50 p-8 text-center">
        <p className="text-lg font-semibold text-green-800">Thank you!</p>
        <p className="mt-2 text-green-700">We will be in touch shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        required
        placeholder="Full name *"
        value={form.name}
        onChange={update("name")}
        aria-label="Full name"
        className={inputClass}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <input
          required
          type="email"
          placeholder="Email *"
          value={form.email}
          onChange={update("email")}
          aria-label="Email"
          className={inputClass}
        />
        <input
          placeholder="Phone"
          value={form.phone}
          onChange={update("phone")}
          aria-label="Phone"
          className={inputClass}
        />
      </div>
      <input
        placeholder="Company"
        value={form.company}
        onChange={update("company")}
        aria-label="Company"
        className={inputClass}
      />
      <textarea
        required
        rows={5}
        placeholder="Message *"
        value={form.message}
        onChange={update("message")}
        aria-label="Message"
        className={cn(inputClass, "resize-y")}
      />
      {isError && (
        <p className="text-sm text-red-600" role="alert">
          Something went wrong. Check the API URL and contact endpoint in your backend.
        </p>
      )}
      <button
        type="submit"
        disabled={isLoading}
        className="inline-flex items-center gap-2 bg-brand-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-primary-dark disabled:opacity-60"
      >
        <Send size={16} aria-hidden />
        {isLoading ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
