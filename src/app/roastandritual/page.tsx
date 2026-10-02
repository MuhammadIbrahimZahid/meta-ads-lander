import Link from "next/link";
import { products } from "@/lib/roastandritual/products";
import Image from "next/image";

export default function RoastAndRitualHome() {
  const featuredProduct = products[0];

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
              href={`/roastandritual/product?id=${featuredProduct.id}`}
              className="mt-8 inline-flex rounded-full bg-[#211a15] px-7 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#352920]"
            >
              Shop House Blend
            </Link>
          </div>

          <Link
            href={`/roastandritual/product?id=${featuredProduct.id}`}
            className="group overflow-hidden rounded-3xl bg-[#d9c6b2]"
          >
            <div className="relative aspect-square p-8">
              <Image
                src={featuredProduct.image}
                alt={featuredProduct.name}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-contain transition duration-500 group-hover:scale-105"
              />
            </div>
          </Link>
        </div>
      </section>

      <section className="border-t border-[#211a15]/10">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="max-w-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#8b5e3c]">
              Our Coffee
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Find your next favorite.
            </h2>

            <p className="mt-4 text-[#211a15]/60">
              Explore our specialty coffee range, from everyday blends to
              coffees made for discovery.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/roastandritual/product?id=${product.id}`}
                className="group overflow-hidden rounded-2xl border border-[#211a15]/10 bg-white/40 transition hover:-translate-y-1 hover:bg-white/60"
              >
                <div className="overflow-hidden bg-[#d9c6b2]">
                  <div className="relative aspect-square p-8">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(min-width: 640px) 50vw, 100vw"
                      className="object-contain transition duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#8b5e3c]">
                    {product.category}
                  </p>

                  <h3 className="mt-2 text-xl font-semibold">{product.name}</h3>

                  <p className="mt-3 text-sm leading-6 text-[#211a15]/60">
                    {product.description}
                  </p>

                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-lg font-semibold">
                      PKR {product.price.toLocaleString()}
                    </span>

                    <span className="rounded-full bg-[#211a15] px-5 py-2.5 text-sm font-semibold text-white transition group-hover:bg-[#352920]">
                      View product
                    </span>
                  </div>
                </div>
              </Link>
            ))}
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
