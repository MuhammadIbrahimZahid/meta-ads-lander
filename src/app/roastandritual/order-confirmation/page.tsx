import { Suspense } from "react";
import OrderConfirmationContent from "./OrderConfirmationContent";

export default function OrderConfirmationPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#f5f0e8] px-6 py-20 text-[#211a15]">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[#211a15]/50">Loading order...</p>
          </div>
        </main>
      }
    >
      <OrderConfirmationContent />
    </Suspense>
  );
}
