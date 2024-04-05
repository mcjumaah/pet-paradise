import type { CartItem as CheckoutItem } from "./dummyCartItems";

export const useCheckoutItems = () => {
	return useState<CheckoutItem[]>("checkout-items", () => []);
};

export function usePerItemTotalPrice(item: CheckoutItem) {
	return parseInt(item.price.slice(1)) * item.quantity;
}

export function useItemsArrTotalPrice(items: CheckoutItem[], idArr?: number[]) {
	let total = 0;
	items.forEach((item) => {
		if (!idArr || idArr.includes(item.id)) {
			total = total + usePerItemTotalPrice(item);
		}
	});
	return total;
}
