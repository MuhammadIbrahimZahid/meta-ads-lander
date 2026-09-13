"use client";

import { SyntheticEvent, useState } from "react";
import { pushToDataLayer } from "@/lib/analytics";

export default function LeadPage() {
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const name = formData.get("name");
    const email = formData.get("email");

    const eventId = crypto.randomUUID();

    const response = await fetch("/api/lead", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        lead_source: "website",
        lead_form: "demo_request",
        event_id: eventId,
      }),
    });

    if (!response.ok) {
      console.error("Lead API failed:", response.status);
      return;
    }

    pushToDataLayer({
      event: "generate_lead",
      lead_source: "website",
      lead_form: "demo_request",
      event_id: eventId,
    });

    setSubmitted(true);
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] px-6 py-24 text-white">
      <div className="mx-auto max-w-xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-300">
          SignalFlow Analytics Lab
        </p>

        <h1 className="mt-4 text-4xl font-semibold tracking-tight">
          Request a demo
        </h1>

        <p className="mt-4 text-white/50">
          This page exists specifically to demonstrate lead tracking.
        </p>

        {!submitted ? (
          <form
            onSubmit={handleSubmit}
            className="mt-10 space-y-5 rounded-2xl border border-white/10 bg-white/3 p-6"
          >
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm text-white/70"
              >
                Name
              </label>

              <input
                id="name"
                name="name"
                type="text"
                required
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-violet-400"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm text-white/70"
              >
                Email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-violet-400"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-white px-5 py-3 font-semibold text-black transition hover:bg-white/90"
            >
              Request demo
            </button>
          </form>
        ) : (
          <div className="mt-10 rounded-2xl border border-emerald-400/20 bg-emerald-400/5 p-8">
            <p className="text-lg font-semibold text-emerald-300">
              Lead submitted.
            </p>

            <p className="mt-2 text-white/50">
              Now let&apos;s verify that the analytics event was actually sent.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
