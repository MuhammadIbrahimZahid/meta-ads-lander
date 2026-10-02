"use client";

import Link from "next/link";
import { useState } from "react";
import {
  getProductById,
  type RoastAndRitualProduct,
} from "@/lib/roastandritual/products";
import {
  addToCart,
  getCartItemCount,
  type RoastAndRitualCart,
  EMPTY_CART,
} from "@/lib/roastandritual/cart";

const CART_STORAGE_KEY = "roastandritual-cart";

function loadCart(): RoastAndRitualCart {
  if (typeof window === "undefined") {
    return EMPTY_CART;
  }

  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);

    if (!stored) {
      return EMPTY_CART;
    }

    return JSON.parse(stored) as RoastAndRitualCart;
  } catch {
    return EMPTY_CART;
  }
}

export default function RoastAndRitualProductPage() {
  // Lazy initialization means the cart is loaded during the initial
  // client render instead of requiring an effect + setState.
  const [cart, setCart] = useState<RoastAndRitualCart>(() => loadCart());
  const [added, setAdded] = useState(false);

  const product = getProductById("RR-01");

  if (!product) {
    return (
      <main className="min-h-screen bg-[#f5f0e8] px-6 py-24 text-[#211a15]">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-semibold">Product not found</h1>

          <Link
            href="/roastandritual"
            className="mt-6 inline-block text-sm font-medium underline"
          >
            Back to Roast & Ritual
          </Link>
        </div>
      </main>
    );
  }

  function handleAddToCart(product: RoastAndRitualProduct) {
    const updatedCart = addToCart(cart, product, 1);

    setCart(updatedCart);
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updatedCart));

    setAdded(true);
  }

  const cartCount = getCartItemCount(cart);

  return (
    <main className="min-h-screen bg-[#f5f0e8] text-[#211a15]">
      <header className="border-b border-[#211a15]/10">
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
            {cartCount > 0 && (
              <span className="ml-2 rounded-full bg-[#211a15] px-2 py-0.5 text-xs text-white">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-16 lg:py-24">
        <Link
          href="/roastandritual"
          className="text-sm text-[#211a15]/50 transition hover:text-[#211a15]"
        >
          ← Back to shop
        </Link>

        <div className="mt-10 grid gap-14 lg:grid-cols-2 lg:items-center">
          <div className="overflow-hidden rounded-3xl bg-[#d9c6b2]">
            <div className="flex aspect-square items-center justify-center p-10">
              <div className="flex h-72 w-72 items-center justify-center rounded-full bg-[#211a15] text-center text-white shadow-2xl">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-white/50">
                    Roast & Ritual
                  </p>

                  <p className="mt-4 text-4xl font-semibold">House Blend</p>

                  <p className="mt-2 text-sm text-white/50">250g</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#8b5e3c]">
              {product.category}
            </p>

            <h1 className="mt-4 text-5xl font-semibold tracking-[-0.04em] sm:text-6xl">
              {product.name}
            </h1>

            <p className="mt-6 text-lg leading-8 text-[#211a15]/60">
              {product.description}
            </p>

            <div className="mt-8 text-3xl font-semibold">
              PKR {product.price.toLocaleString()}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => handleAddToCart(product)}
                className="rounded-full bg-[#211a15] px-7 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#352920]"
              >
                {added ? "Added to cart ✓" : "Add to cart"}
              </button>

              {added && (
                <Link
                  href="/roastandritual/cart"
                  className="rounded-full border border-[#211a15]/20 px-7 py-3.5 text-center text-sm font-semibold transition hover:bg-[#211a15] hover:text-white"
                >
                  View cart
                </Link>
              )}
            </div>

            <div className="mt-10 border-t border-[#211a15]/10 pt-8">
              <div className="grid gap-5 sm:grid-cols-3">
                <div>
                  <p className="text-sm font-semibold">250g</p>
                  <p className="mt-1 text-xs text-[#211a15]/50">Pack size</p>
                </div>

                <div>
                  <p className="text-sm font-semibold">RR-01</p>
                  <p className="mt-1 text-xs text-[#211a15]/50">Product ID</p>
                </div>

                <div>
                  <p className="text-sm font-semibold">PKR</p>
                  <p className="mt-1 text-xs text-[#211a15]/50">Currency</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
