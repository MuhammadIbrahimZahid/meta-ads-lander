import type { RoastAndRitualProduct } from "./products";

export type RoastAndRitualCartItem = {
  productId: string;
  quantity: number;
};

export type RoastAndRitualCart = {
  items: RoastAndRitualCartItem[];
};

export const EMPTY_CART: RoastAndRitualCart = {
  items: [],
};

export function addToCart(
  cart: RoastAndRitualCart,
  product: RoastAndRitualProduct,
  quantity = 1,
): RoastAndRitualCart {
  const existingItem = cart.items.find((item) => item.productId === product.id);

  if (existingItem) {
    return {
      items: cart.items.map((item) =>
        item.productId === product.id
          ? {
              ...item,
              quantity: item.quantity + quantity,
            }
          : item,
      ),
    };
  }

  return {
    items: [
      ...cart.items,
      {
        productId: product.id,
        quantity,
      },
    ],
  };
}

export function updateCartItem(
  cart: RoastAndRitualCart,
  productId: string,
  quantity: number,
): RoastAndRitualCart {
  if (quantity <= 0) {
    return removeFromCart(cart, productId);
  }

  return {
    items: cart.items.map((item) =>
      item.productId === productId
        ? {
            ...item,
            quantity,
          }
        : item,
    ),
  };
}

export function removeFromCart(
  cart: RoastAndRitualCart,
  productId: string,
): RoastAndRitualCart {
  return {
    items: cart.items.filter((item) => item.productId !== productId),
  };
}

export function clearCart(): RoastAndRitualCart {
  return EMPTY_CART;
}

export function getCartItemCount(cart: RoastAndRitualCart): number {
  return cart.items.reduce((total, item) => total + item.quantity, 0);
}

export function getCartSubtotal(
  cart: RoastAndRitualCart,
  products: RoastAndRitualProduct[],
): number {
  return cart.items.reduce((total, item) => {
    const product = products.find(
      (candidate) => candidate.id === item.productId,
    );

    if (!product) {
      return total;
    }

    return total + product.price * item.quantity;
  }, 0);
}
