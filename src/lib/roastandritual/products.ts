export type RoastAndRitualProduct = {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  currency: "PKR";
  image: string;
};

export const products: RoastAndRitualProduct[] = [
  {
    id: "RR-01",
    name: "House Blend 250g",
    description:
      "A balanced specialty coffee blend designed for everyday brewing.",
    category: "Blends",
    price: 2200,
    currency: "PKR",
    image: "/roastandritual/house-blend-250g.jpg",
  },
];

export function getProductById(
  productId: string,
): RoastAndRitualProduct | undefined {
  return products.find((product) => product.id === productId);
}

export function getProducts(): RoastAndRitualProduct[] {
  return products;
}
