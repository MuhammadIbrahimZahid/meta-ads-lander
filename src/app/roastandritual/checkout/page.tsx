"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  createOrder,
  type RoastAndRitualCustomer,
} from "@/lib/roastandritual/orders";
import {
  getProducts,
  type RoastAndRitualProduct,
} from "@/lib/roastandritual/products";
import {
  EMPTY_CART,
  getCartSubtotal,
  type RoastAndRitualCart,
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

export default function CheckoutPage() {
  const router = useRouter();
  const products = getProducts();

  const [cart] = useState<RoastAndRitualCart>(() => loadCart());

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
  });

  const subtotal = getCartSubtotal(cart, products);
  const shipping = subtotal > 0 ? 200 : 0;
  const total = subtotal + shipping;

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const customer: RoastAndRitualCustomer = {
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      address: form.address.trim(),
      city: form.city.trim(),
    };

    const order = createOrder(cart, customer);

    localStorage.removeItem(CART_STORAGE_KEY);

    router.push(
      `/roastandritual/order-confirmation?order=${encodeURIComponent(
        order.id,
      )}`,
    );
  }

  if (cart.items.length === 0) {
    return (
      <main className="min-h-screen bg-[#f5f0e8] px-6 py-20 text-[#211a15]">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#8b5e3c]">
            Roast & Ritual
          </p>

          <h1 className="mt-4 text-4xl font-semibold">Your cart is empty</h1>

          <p className="mt-4 text-[#211a15]/60">
            Add some coffee before continuing to checkout.
          </p>

          <Link
            href="/roastandritual"
            className="mt-8 inline-flex rounded-full bg-[#211a15] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#352920]"
          >
            Browse coffee
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f5f0e8] px-6 py-12 text-[#211a15]">
      <div className="mx-auto max-w-6xl">
        <header className="mb-12 flex items-center justify-between border-b border-[#211a15]/10 pb-6">
          <Link
            href="/roastandritual"
            className="text-xl font-semibold tracking-tight"
          >
            Roast & Ritual
          </Link>

          <Link
            href="/roastandritual/cart"
            className="text-sm text-[#211a15]/50 transition hover:text-[#211a15]"
          >
            Back to cart
          </Link>
        </header>

        <div className="grid gap-10 lg:grid-cols-[1fr_400px]">
          <section>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#8b5e3c]">
              Checkout
            </p>

            <h1 className="mt-4 text-4xl font-semibold tracking-tight">
              Complete your order
            </h1>

            <form
              onSubmit={handleSubmit}
              className="mt-10 space-y-5 rounded-2xl border border-[#211a15]/10 bg-white/40 p-6"
            >
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm text-[#211a15]/60"
                >
                  Full name
                </label>

                <input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-[#211a15]/10 bg-white/60 px-4 py-3 text-[#211a15] outline-none transition placeholder:text-[#211a15]/30 focus:border-[#8b5e3c]"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm text-[#211a15]/60"
                >
                  Email
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-[#211a15]/10 bg-white/60 px-4 py-3 text-[#211a15] outline-none transition placeholder:text-[#211a15]/30 focus:border-[#8b5e3c]"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm text-[#211a15]/60"
                >
                  Phone
                </label>

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-[#211a15]/10 bg-white/60 px-4 py-3 text-[#211a15] outline-none transition placeholder:text-[#211a15]/30 focus:border-[#8b5e3c]"
                />
              </div>

              <div>
                <label
                  htmlFor="address"
                  className="mb-2 block text-sm text-[#211a15]/60"
                >
                  Delivery address
                </label>

                <input
                  id="address"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-[#211a15]/10 bg-white/60 px-4 py-3 text-[#211a15] outline-none transition placeholder:text-[#211a15]/30 focus:border-[#8b5e3c]"
                />
              </div>

              <div>
                <label
                  htmlFor="city"
                  className="mb-2 block text-sm text-[#211a15]/60"
                >
                  City
                </label>

                <input
                  id="city"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-[#211a15]/10 bg-white/60 px-4 py-3 text-[#211a15] outline-none transition placeholder:text-[#211a15]/30 focus:border-[#8b5e3c]"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-full bg-[#211a15] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#352920]"
              >
                Place order
              </button>
            </form>
          </section>

          <aside className="h-fit rounded-2xl border border-[#211a15]/10 bg-white/40 p-6">
            <h2 className="text-lg font-semibold">Order summary</h2>

            <div className="mt-6 space-y-4">
              {cart.items.map((item) => {
                const product: RoastAndRitualProduct | undefined =
                  products.find((candidate) => candidate.id === item.productId);

                if (!product) {
                  return null;
                }

                return (
                  <div
                    key={item.productId}
                    className="flex items-start justify-between gap-4"
                  >
                    <div>
                      <p className="text-sm font-medium">{product.name}</p>

                      <p className="mt-1 text-xs text-[#211a15]/45">
                        Qty: {item.quantity}
                      </p>
                    </div>

                    <p className="text-sm text-[#211a15]/70">
                      {product.currency}{" "}
                      {(product.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="my-6 border-t border-[#211a15]/10" />

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-[#211a15]/50">
                <span>Subtotal</span>
                <span>PKR {subtotal.toLocaleString()}</span>
              </div>

              <div className="flex justify-between text-[#211a15]/50">
                <span>Shipping</span>
                <span>PKR {shipping.toLocaleString()}</span>
              </div>

              <div className="flex justify-between border-t border-[#211a15]/10 pt-4 text-base font-semibold text-[#211a15]">
                <span>Total</span>
                <span>PKR {total.toLocaleString()}</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
