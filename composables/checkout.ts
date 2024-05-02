import type { ProductItemProjection } from "~/server/projections/productItemProjections";

export type CheckoutItem = Omit<ProductItemProjection, "status"> & {
	productItemId?: number;
	origin: "cart" | "buy-now";
};

export const useCheckoutItems = () => {
	return useState<CheckoutItem[]>("checkout-items", () => []);
};

export function usePerItemTotalPrice(item: ProductItemProjection | CheckoutItem) {
	return item.price * item.quantity;
}

export function useItemsArrTotalPrice(items: ProductItemProjection[] | CheckoutItem[], idArr?: number[]) {
	let total = 0;
	items.forEach((item) => {
		if (!idArr || idArr.includes(item.id)) {
			total = total + usePerItemTotalPrice(item);
		}
	});
	return total;
}
