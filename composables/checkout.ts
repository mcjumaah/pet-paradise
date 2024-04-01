import type { CartItem } from "~/pages/shop/cart/index.vue";

export const useCheckoutItems = () => {
	return useState<CartItem[]>("checkout-items", () => []);
};

export function useItemTotalPrice(item: CartItem) {
	return parseInt(item.price.slice(1)) * item.quantity;
}
