import type { CartItem } from "~/pages/shop/cart/index.vue";

export const useCheckoutItems = () => {
	return useState<CartItem[]>("checkout-items", () => []);
};

export function usePerItemTotalPrice(item: CartItem) {
	return parseInt(item.price.slice(1)) * item.quantity;
}

export function useItemsArrTotalPrice(items: CartItem[], idArr?: number[]) {
	let total = 0;
	items.forEach((item) => {
		if (!idArr || idArr.includes(item.id)) {
			total = total + usePerItemTotalPrice(item);
		}
	});
	return total;
}
