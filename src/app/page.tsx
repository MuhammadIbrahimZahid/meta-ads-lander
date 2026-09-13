import Link from "next/link";

const features = [
  {
    number: "01",
    title: "Know what converts",
    description:
      "See which campaigns, audiences, and landing pages are actually driving meaningful actions.",
  },
  {
    number: "02",
    title: "Connect every signal",
    description:
      "Bring your website activity and advertising data together so nothing important gets lost.",
  },
  {
    number: "03",
    title: "Make smarter decisions",
    description:
      "Turn marketing data into clear actions instead of guessing where your budget should go next.",
  },
];

const stats = [
  { value: "2.4×", label: "Average improvement in qualified leads" },
  { value: "38%", label: "Lower wasted ad spend" },
  { value: "24/7", label: "Visibility into campaign performance" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Navigation */}
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
          <a href="#" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-sm font-bold text-black">
              S
            </span>
            <span className="text-lg font-semibold tracking-tight">
              SignalFlow
            </span>
          </a>

          <nav className="hidden items-center gap-8 text-sm text-white/60 md:flex">
            <a href="#features" className="transition hover:text-white">
              Features
            </a>
            <a href="#how-it-works" className="transition hover:text-white">
              How it works
            </a>
            <a href="#results" className="transition hover:text-white">
              Results
            </a>
          </nav>

          <a
            href="#get-started"
            className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-white/90"
          >
            Get started
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute left-1/2 top-0 h-150 w-225 -translate-x-1/2 rounded-full bg-violet-600/20 blur-[140px]" />

        <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-24 lg:px-8 lg:pb-32 lg:pt-32">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/4 px-4 py-2 text-sm text-white/70">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Marketing intelligence for modern teams
            </div>

            <h1 className="text-5xl font-semibold tracking-[-0.04em] sm:text-6xl lg:text-7xl">
              Stop guessing.
              <br />
              <span className="bg-linear-to-r from-violet-300 via-white to-blue-300 bg-clip-text text-transparent">
                Start measuring.
              </span>
            </h1>

            <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-white/55 sm:text-xl">
              SignalFlow helps businesses understand which marketing efforts
              create real results — so you can spend less time guessing and more
              time growing.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/product"
                className="w-full rounded-full bg-white px-7 py-3.5 text-center text-sm font-semibold text-black transition hover:-translate-y-0.5 hover:bg-white/90 sm:w-auto"
              >
                View product →
              </Link>

              <Link
                href="/lead"
                className="w-full rounded-full border border-white/15 px-7 py-3.5 text-center text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/5 sm:w-auto"
              >
                Become a lead
              </Link>
            </div>
          </div>

          {/* Dashboard preview */}
          <div className="mx-auto mt-20 max-w-5xl">
            <div className="rounded-2xl border border-white/10 bg-white/4 p-2 shadow-2xl shadow-violet-950/30">
              <div className="rounded-xl border border-white/10 bg-[#111111] p-5 sm:p-7">
                <div className="mb-7 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white/50">
                      Campaign overview
                    </p>
                    <p className="mt-1 text-xl font-semibold">
                      Marketing performance
                    </p>
                  </div>

                  <div className="hidden rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/50 sm:block">
                    Last 30 days
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  {[
                    ["$24,840", "Revenue attributed", "+18.4%"],
                    ["1,284", "Qualified leads", "+24.7%"],
                    ["3.82×", "Return on ad spend", "+12.2%"],
                  ].map(([value, label, change]) => (
                    <div
                      key={label}
                      className="rounded-xl border border-white/10 bg-white/3 p-5"
                    >
                      <p className="text-2xl font-semibold tracking-tight">
                        {value}
                      </p>
                      <div className="mt-2 flex items-center justify-between gap-2">
                        <p className="text-sm text-white/40">{label}</p>
                        <span className="text-xs font-medium text-emerald-400">
                          {change}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 h-48 overflow-hidden rounded-xl border border-white/10 bg-white/2 p-5">
                  <div className="flex h-full items-end gap-2">
                    {[32, 42, 37, 54, 48, 61, 58, 72, 66, 81, 76, 92].map(
                      (height, index) => (
                        <div
                          key={index}
                          className="flex-1 rounded-t-sm bg-linear-to-t from-violet-600/50 to-violet-300"
                          style={{ height: `${height}%` }}
                        />
                      ),
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section id="results" className="border-y border-white/10 bg-white/2">
        <div className="mx-auto grid max-w-7xl divide-y divide-white/10 px-6 sm:grid-cols-3 sm:divide-x sm:divide-y-0 lg:px-8">
          {stats.map((stat) => (
            <div key={stat.label} className="px-6 py-10 text-center">
              <p className="text-4xl font-semibold tracking-tight">
                {stat.value}
              </p>
              <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-white/40">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-300">
            Built for clarity
          </p>

          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
            Your marketing data should answer questions.
          </h2>

          <p className="mt-5 text-lg leading-8 text-white/50">
            Stop jumping between disconnected dashboards. SignalFlow gives your
            team a clearer picture of what is working and what needs to change.
          </p>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-3">
          {features.map((feature) => (
            <article key={feature.number} className="bg-[#0d0d0d] p-8">
              <span className="text-sm font-medium text-violet-300">
                {feature.number}
              </span>

              <h3 className="mt-16 text-xl font-semibold">{feature.title}</h3>

              <p className="mt-4 text-sm leading-6 text-white/45">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section
        id="how-it-works"
        className="border-y border-white/10 bg-white/2"
      >
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-300">
                How it works
              </p>

              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
                Turn every interaction into a useful signal.
              </h2>

              <p className="mt-5 max-w-xl text-lg leading-8 text-white/50">
                Connect your marketing activity, understand customer actions,
                and use those insights to improve your campaigns.
              </p>
            </div>

            <div className="space-y-3">
              {[
                "Connect your website",
                "Capture meaningful customer actions",
                "Understand which campaigns perform",
                "Optimize your next decision",
              ].map((item, index) => (
                <div
                  key={item}
                  className="flex items-center gap-5 rounded-xl border border-white/10 bg-white/3 p-5"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-violet-500/10 text-sm font-semibold text-violet-300">
                    {index + 1}
                  </span>
                  <span className="font-medium text-white/80">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="mx-auto max-w-5xl px-6 py-24 text-center lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="mb-7 text-3xl text-violet-300">“</div>

          <blockquote className="text-2xl font-medium leading-relaxed tracking-tight text-white/90 sm:text-3xl">
            We stopped asking which ads looked good and started understanding
            which ads actually created customers.
          </blockquote>

          <div className="mt-8">
            <p className="text-sm font-semibold">Alex Morgan</p>
            <p className="mt-1 text-sm text-white/40">Growth Lead, Northstar</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="get-started" className="px-6 pb-24 lg:px-8">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-linear-to-br from-violet-600 to-indigo-700 px-6 py-16 text-center sm:px-12">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-black/10 blur-3xl" />

          <div className="relative mx-auto max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/60">
              Ready when you are
            </p>

            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
              Make your marketing measurable.
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-white/70">
              Start building a clearer picture of what drives growth.
            </p>

            <a
              href="mailto:hello@example.com"
              className="mt-8 inline-flex rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-violet-700 transition hover:-translate-y-0.5 hover:bg-white/90"
            >
              Get started →
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-sm text-white/40 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-xs font-bold text-black">
              S
            </span>
            <span>SignalFlow</span>
          </div>

          <p>© 2026 SignalFlow. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
