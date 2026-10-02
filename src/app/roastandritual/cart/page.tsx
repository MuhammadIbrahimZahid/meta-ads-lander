"use client";

import Link from "next/link";
import { useState } from "react";
import {
  EMPTY_CART,
  getCartSubtotal,
  removeFromCart,
  updateCartItem,
  type RoastAndRitualCart,
} from "@/lib/roastandritual/cart";
import { products } from "@/lib/roastandritual/products";

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

export default function RoastAndRitualCartPage() {
  const [cart, setCart] = useState<RoastAndRitualCart>(() => loadCart());

  function saveCart(updatedCart: RoastAndRitualCart) {
    setCart(updatedCart);
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updatedCart));
  }

  function handleQuantityChange(productId: string, quantity: number) {
    const updatedCart = updateCartItem(cart, productId, quantity);
    saveCart(updatedCart);
  }

  function handleRemove(productId: string) {
    const updatedCart = removeFromCart(cart, productId);
    saveCart(updatedCart);
  }

  const subtotal = getCartSubtotal(cart, products);

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
            href="/roastandritual/product?id=RR-01"
            className="text-sm text-[#211a15]/60 transition hover:text-[#211a15]"
          >
            Continue shopping
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-16 lg:py-24">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#8b5e3c]">
            Your order
          </p>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            Shopping cart
          </h1>
        </div>

        {cart.items.length === 0 ? (
          <div className="mt-12 rounded-2xl border border-[#211a15]/10 bg-white/40 p-10 text-center">
            <h2 className="text-2xl font-semibold">Your cart is empty</h2>

            <p className="mx-auto mt-3 max-w-md text-[#211a15]/50">
              Add some coffee to your cart before continuing to checkout.
            </p>

            <Link
              href="/roastandritual/product?id=RR-01"
              className="mt-7 inline-flex rounded-full bg-[#211a15] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#352920]"
            >
              Shop House Blend
            </Link>
          </div>
        ) : (
          <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_360px]">
            <div className="space-y-4">
              {cart.items.map((item) => {
                const product = products.find(
                  (candidate) => candidate.id === item.productId,
                );

                if (!product) {
                  return null;
                }

                return (
                  <div
                    key={item.productId}
                    className="rounded-2xl border border-[#211a15]/10 bg-white/40 p-5 sm:p-6"
                  >
                    <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-5">
                        <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-xl bg-[#d9c6b2]">
                          <span className="text-center text-xs font-semibold uppercase tracking-widest text-[#211a15]/60">
                            House
                            <br />
                            Blend
                          </span>
                        </div>

                        <div>
                          <h2 className="font-semibold">{product.name}</h2>

                          <p className="mt-1 text-sm text-[#211a15]/50">
                            PKR {product.price.toLocaleString()} each
                          </p>

                          <button
                            type="button"
                            onClick={() => handleRemove(item.productId)}
                            className="mt-3 text-sm text-[#8b5e3c] underline-offset-4 hover:underline"
                          >
                            Remove
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-8 sm:justify-end">
                        <div className="flex items-center rounded-full border border-[#211a15]/15">
                          <button
                            type="button"
                            onClick={() =>
                              handleQuantityChange(
                                item.productId,
                                item.quantity - 1,
                              )
                            }
                            className="flex h-10 w-10 items-center justify-center text-lg"
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>

                          <span className="w-8 text-center text-sm font-medium">
                            {item.quantity}
                          </span>

                          <button
                            type="button"
                            onClick={() =>
                              handleQuantityChange(
                                item.productId,
                                item.quantity + 1,
                              )
                            }
                            className="flex h-10 w-10 items-center justify-center text-lg"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>

                        <p className="w-28 text-right font-semibold">
                          PKR {(product.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <aside className="h-fit rounded-2xl border border-[#211a15]/10 bg-white/50 p-6">
              <h2 className="text-xl font-semibold">Order summary</h2>

              <div className="mt-6 flex items-center justify-between border-b border-[#211a15]/10 pb-5">
                <span className="text-sm text-[#211a15]/50">Subtotal</span>

                <span className="font-semibold">
                  PKR {subtotal.toLocaleString()}
                </span>
              </div>

              <div className="mt-5 flex items-center justify-between">
                <span className="font-semibold">Total</span>

                <span className="text-xl font-semibold">
                  PKR {subtotal.toLocaleString()}
                </span>
              </div>

              <p className="mt-3 text-xs leading-5 text-[#211a15]/40">
                Shipping and final order details will be handled at checkout.
              </p>

              <Link
                href="/roastandritual/checkout"
                className="mt-7 flex w-full items-center justify-center rounded-full bg-[#211a15] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#352920]"
              >
                Proceed to checkout
              </Link>
            </aside>
          </div>
        )}
      </section>
    </main>
  );
}
