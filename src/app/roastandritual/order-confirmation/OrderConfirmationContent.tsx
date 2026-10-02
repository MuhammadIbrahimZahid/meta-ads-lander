"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useSyncExternalStore } from "react";
import {
  getOrderById,
  type RoastAndRitualOrder,
} from "@/lib/roastandritual/orders";

function subscribeToBrowser() {
  return () => {};
}

function getBrowserSnapshot() {
  return true;
}

function getServerSnapshot() {
  return false;
}

export default function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order");

  const hydrated = useSyncExternalStore(
    subscribeToBrowser,
    getBrowserSnapshot,
    getServerSnapshot,
  );

  const order: RoastAndRitualOrder | null =
    hydrated && orderId ? (getOrderById(orderId) ?? null) : null;

  if (!hydrated) {
    return (
      <main className="min-h-screen bg-[#f5f0e8] px-6 py-20 text-[#211a15]">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[#211a15]/50">Loading order...</p>
        </div>
      </main>
    );
  }

  if (!order) {
    return (
      <main className="min-h-screen bg-[#f5f0e8] px-6 py-20 text-[#211a15]">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#8b5e3c]">
            Roast & Ritual
          </p>

          <h1 className="mt-4 text-4xl font-semibold">Order not found</h1>

          <p className="mt-4 text-[#211a15]/60">
            We couldn&apos;t find the order you&apos;re looking for.
          </p>

          <Link
            href="/roastandritual"
            className="mt-8 inline-flex rounded-full bg-[#211a15] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#352920]"
          >
            Back to Roast & Ritual
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f5f0e8] px-6 py-16 text-[#211a15]">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#8b5e3c]/10 text-2xl text-[#8b5e3c]">
            ✓
          </div>

          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-[#8b5e3c]">
            Roast & Ritual
          </p>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight">
            Order confirmed
          </h1>

          <p className="mt-4 text-[#211a15]/60">
            Thank you, {order.customer.name}. Your order has been received.
          </p>

          <p className="mt-2 text-sm text-[#211a15]/40">Order #{order.id}</p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <section className="rounded-2xl border border-[#211a15]/10 bg-white/40 p-6">
            <h2 className="text-lg font-semibold">Order details</h2>

            <div className="mt-6 space-y-4">
              {order.items.map((item) => (
                <div
                  key={item.productId}
                  className="flex items-start justify-between gap-4"
                >
                  <div>
                    <p className="text-sm font-medium">{item.productName}</p>

                    <p className="mt-1 text-xs text-[#211a15]/45">
                      Qty: {item.quantity}
                    </p>
                  </div>

                  <p className="text-sm text-[#211a15]/70">
                    PKR {item.subtotal.toLocaleString()}
                  </p>
                </div>
              ))}
            </div>

            <div className="my-6 border-t border-[#211a15]/10" />

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-[#211a15]/50">
                <span>Subtotal</span>
                <span>PKR {order.subtotal.toLocaleString()}</span>
              </div>

              <div className="flex justify-between text-[#211a15]/50">
                <span>Shipping</span>
                <span>PKR {order.shipping.toLocaleString()}</span>
              </div>

              <div className="flex justify-between border-t border-[#211a15]/10 pt-4 text-base font-semibold">
                <span>Total</span>
                <span>PKR {order.total.toLocaleString()}</span>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-[#211a15]/10 bg-white/40 p-6">
            <h2 className="text-lg font-semibold">Delivery details</h2>

            <div className="mt-6 space-y-4 text-sm">
              <div>
                <p className="text-[#211a15]/40">Name</p>
                <p className="mt-1">{order.customer.name}</p>
              </div>

              <div>
                <p className="text-[#211a15]/40">Email</p>
                <p className="mt-1">{order.customer.email}</p>
              </div>

              <div>
                <p className="text-[#211a15]/40">Phone</p>
                <p className="mt-1">{order.customer.phone}</p>
              </div>

              <div>
                <p className="text-[#211a15]/40">Address</p>
                <p className="mt-1">{order.customer.address}</p>
              </div>

              <div>
                <p className="text-[#211a15]/40">City</p>
                <p className="mt-1">{order.customer.city}</p>
              </div>
            </div>
          </section>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/roastandritual"
            className="inline-flex rounded-full bg-[#211a15] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#352920]"
          >
            Continue shopping
          </Link>
        </div>
      </div>
    </main>
  );
}
