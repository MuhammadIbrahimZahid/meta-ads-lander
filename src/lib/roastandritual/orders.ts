import type { RoastAndRitualCart } from "./cart";
import { getProductById, type RoastAndRitualProduct } from "./products";

export type RoastAndRitualCustomer = {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
};

export type RoastAndRitualOrderItem = {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  subtotal: number;
};

export type RoastAndRitualOrder = {
  id: string;
  createdAt: string;
  customer: RoastAndRitualCustomer;
  items: RoastAndRitualOrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  currency: "PKR";
  status: "pending";
};

const ORDERS_STORAGE_KEY = "roastandritual-orders";

function loadOrders(): RoastAndRitualOrder[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const stored = localStorage.getItem(ORDERS_STORAGE_KEY);

    if (!stored) {
      return [];
    }

    return JSON.parse(stored) as RoastAndRitualOrder[];
  } catch {
    return [];
  }
}

function saveOrders(orders: RoastAndRitualOrder[]): void {
  localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
}

export function createOrder(
  cart: RoastAndRitualCart,
  customer: RoastAndRitualCustomer,
): RoastAndRitualOrder {
  const items: RoastAndRitualOrderItem[] = cart.items.flatMap((item) => {
    const product: RoastAndRitualProduct | undefined = getProductById(
      item.productId,
    );

    if (!product) {
      return [];
    }

    return [
      {
        productId: product.id,
        productName: product.name,
        price: product.price,
        quantity: item.quantity,
        subtotal: product.price * item.quantity,
      },
    ];
  });

  const subtotal = items.reduce((total, item) => total + item.subtotal, 0);

  const shipping = subtotal > 0 ? 200 : 0;

  const order: RoastAndRitualOrder = {
    id: `RR-${Date.now()}`,
    createdAt: new Date().toISOString(),
    customer,
    items,
    subtotal,
    shipping,
    total: subtotal + shipping,
    currency: "PKR",
    status: "pending",
  };

  const orders = loadOrders();

  saveOrders([...orders, order]);

  return order;
}

export function getOrderById(orderId: string): RoastAndRitualOrder | undefined {
  const orders = loadOrders();

  return orders.find((order) => order.id === orderId);
}
