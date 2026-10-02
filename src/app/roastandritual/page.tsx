import Link from "next/link";
import { products } from "@/lib/roastandritual/products";

export default function RoastAndRitualHome() {
  const product = products[0];

  return (
    <main className="min-h-screen bg-[#f5f0e8] text-[#211a15]">
      <header className="border-b border-[#211a15]/10 bg-[#f5f0e8]">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Link
            href="/roastandritual"
            className="text-xl font-semibold tracking-tight"
          >
            Roast & Ritual
          </Link>

          <Link
            href="/roastandritual/cart"
            className="rounded-full border border-[#211a15]/20 px-5 py-2.5 text-sm font-medium transition hover:bg-[#211a15] hover:text-white"
          >
            Cart
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#8b5e3c]">
              Specialty Coffee
            </p>

            <h1 className="mt-5 max-w-xl text-5xl font-semibold tracking-[-0.04em] sm:text-6xl">
              Coffee worth slowing down for.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-[#211a15]/60">
              Carefully crafted coffee for everyday rituals. Start with our
              signature House Blend.
            </p>

            <Link
              href={`/roastandritual/product?id=${product.id}`}
              className="mt-8 inline-flex rounded-full bg-[#211a15] px-7 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#352920]"
            >
              Shop House Blend
            </Link>
          </div>

          <div className="overflow-hidden rounded-3xl bg-[#d9c6b2]">
            <div className="flex aspect-square items-center justify-center p-10">
              <div className="flex h-64 w-64 items-center justify-center rounded-full bg-[#211a15] text-center text-white shadow-2xl">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-white/50">
                    Roast & Ritual
                  </p>
                  <p className="mt-3 text-3xl font-semibold">House Blend</p>
                  <p className="mt-1 text-sm text-white/50">250g</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-[#211a15]/10">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="max-w-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#8b5e3c]">
              Featured Coffee
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              {product.name}
            </h2>

            <p className="mt-4 text-[#211a15]/60">{product.description}</p>
          </div>

          <div className="mt-10 flex flex-col gap-6 rounded-2xl border border-[#211a15]/10 bg-white/40 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-semibold">{product.name}</p>
              <p className="mt-1 text-sm text-[#211a15]/50">
                {product.category}
              </p>
            </div>

            <div className="flex items-center gap-5">
              <span className="text-xl font-semibold">
                PKR {product.price.toLocaleString()}
              </span>

              <Link
                href={`/roastandritual/product?id=${product.id}`}
                className="rounded-full bg-[#211a15] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#352920]"
              >
                View product
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#211a15]/10">
        <div className="mx-auto max-w-6xl px-6 py-8 text-sm text-[#211a15]/50">
          © 2026 Roast & Ritual
        </div>
      </footer>
    </main>
  );
}
