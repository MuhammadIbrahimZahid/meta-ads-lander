"use client";

import { useEffect } from "react";

export default function ProductPage() {
  useEffect(() => {
    window.dataLayer = window.dataLayer || [];

    window.dataLayer.push({
      event: "view_item",
      content_name: "SignalFlow Pro",
      content_category: "Marketing Analytics",
      content_id: "signalflow-pro",
      value: 99,
      currency: "USD",
    });
  }, []);

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <section className="mx-auto flex min-h-screen max-w-5xl items-center px-6 py-24 lg:px-8">
        <div className="grid w-full gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-300">
              SignalFlow Pro
            </p>

            <h1 className="mt-5 text-5xl font-semibold tracking-[-0.04em] sm:text-6xl">
              Marketing analytics without the guesswork.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-white/50">
              SignalFlow Pro helps marketing teams understand which campaigns,
              audiences, and customer actions are actually driving growth.
            </p>

            <div className="mt-8 flex items-end gap-3">
              <span className="text-4xl font-semibold">$99</span>
              <span className="pb-1 text-sm text-white/40">/ month</span>
            </div>

            <button
              type="button"
              className="mt-8 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black transition hover:-translate-y-0.5 hover:bg-white/90"
            >
              Start free trial →
            </button>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/4 p-2 shadow-2xl shadow-violet-950/30">
            <div className="rounded-xl border border-white/10 bg-[#111111] p-7">
              <p className="text-sm text-white/40">SignalFlow Pro</p>

              <div className="mt-8 space-y-4">
                {[
                  "Campaign performance tracking",
                  "Customer journey insights",
                  "Cross-channel attribution",
                  "Real-time marketing dashboards",
                ].map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/3 p-4"
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-violet-500/10 text-violet-300">
                      ✓
                    </span>

                    <span className="text-sm text-white/70">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-xl border border-violet-400/20 bg-violet-500/10 p-5">
                <p className="text-sm font-medium text-violet-200">
                  Built for modern marketing teams
                </p>

                <p className="mt-2 text-sm leading-6 text-white/40">
                  Connect your website activity, advertising data, and customer
                  actions in one place.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
