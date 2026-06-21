"use client";

import { useState } from "react";
import { ArrowUpRight, CheckCircle2, Loader2 } from "lucide-react";

type NewsletterFormProps = {
  ctaLabel: string;
};

export function NewsletterForm({ ctaLabel }: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "done">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;

    setStatus("submitting");
    setError(null);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "newsletter" }),
      });
      if (!res.ok) throw new Error("subscribe failed");
      setStatus("done");
      setEmail("");
    } catch {
      setStatus("idle");
      setError("Couldn't subscribe right now. Please try again.");
    }
  }

  if (status === "done") {
    return (
      <p className="inline-flex items-center gap-2 rounded-2xl bg-white/10 px-6 py-3.5 text-base font-semibold text-white">
        <CheckCircle2 className="size-5 text-emerald-400" />
        You&apos;re subscribed — you&apos;ll be updated with all the latest notifications.
      </p>
    );
  }

  return (
    <div className="flex w-full max-w-md flex-col items-center gap-2">
      <form
        onSubmit={handleSubmit}
        className="flex w-full flex-col items-stretch gap-3 sm:flex-row"
      >
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          name="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full rounded-2xl border border-white/20 bg-white/10 px-5 py-3.5 text-base text-white placeholder:text-white/50 outline-none focus:border-[#ffc31a]"
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl bg-[#ffc31a] px-6 py-3.5 text-base font-semibold text-black transition-colors hover:bg-brand-gold disabled:cursor-wait disabled:opacity-80"
        >
          {status === "submitting" ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Subscribing…
            </>
          ) : (
            <>
              {ctaLabel}
              <ArrowUpRight className="size-4" aria-hidden />
            </>
          )}
        </button>
      </form>
      {error ? (
        <p className="text-sm font-medium text-red-300">{error}</p>
      ) : null}
    </div>
  );
}
