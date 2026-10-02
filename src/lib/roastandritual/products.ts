export type RoastAndRitualProduct = {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  currency: "PKR";
  image: string;
  supportingImage?: string; // Optional property if you decide to display the gallery layouts later
};

export const products: RoastAndRitualProduct[] = [
  {
    id: "RR-01",
    name: "House Blend 250g",
    description:
      "A balanced specialty coffee made for easy, enjoyable everyday brewing. House Blend is designed for coffee drinkers who want better coffee without the complexity.",
    category: "Blends",
    price: 2200,
    currency: "PKR",
    image: "/images/House-Blend-250g-Product-Image.jpg",
    supportingImage: "/images/House-Blend-250g-Supporting-Image.jpg",
  },
  {
    id: "RR-02",
    name: "Single Origin 250g",
    description:
      "A distinctive speciality coffee with a characterful profile for drinkers who want to explore something beyond their everyday blend.",
    category: "Single Origin",
    price: 2800,
    currency: "PKR",
    image: "/images/Single-Origin-250g-Product-Image.jpg",
    supportingImage: "/images/Single-Origin-250g-Supporting-Image.jpg",
  },
  {
    id: "RR-03",
    name: "Espresso Blend 250g",
    description:
      "A specialty coffee blend designed for espresso brewing, with a balanced character that also works well for everyday milk-based coffee drinks.",
    category: "Blends",
    price: 2400,
    currency: "PKR",
    image: "/images/Espresso-Blend-250g-Product-Image.jpg",
    supportingImage: "/images/Espresso-Blend-250g-Supporting-Image.jpg",
  },
  {
    id: "RR-04",
    name: "Coffee Discovery Box",
    description:
      "A curated specialty coffee discovery experience for drinkers who want to explore different coffees and find new favorites.",
    category: "Discovery",
    price: 2500,
    currency: "PKR",
    image: "/images/Coffee-Discovery-Box-Product-Image.jpg",
    supportingImage: "/images/Coffee-Discovery-Box-Supporting-Image.jpg",
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
