import { Suspense } from "react";
import ProductContent from "./ProductContent";

export default function RoastAndRitualProductPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#f5f0e8] px-6 py-20 text-[#211a15]">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[#211a15]/50">Loading product...</p>
          </div>
        </main>
      }
    >
      <ProductContent />
    </Suspense>
  );
}
