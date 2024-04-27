import type { ProductItemProjection } from "~/server/projections/productItemProjections";

export const useCheckoutItems = () => {
	return useState<ProductItemProjection[]>("checkout-items", () => []);
};

export function usePerItemTotalPrice(item: ProductItemProjection) {
	return item.price * item.quantity;
}

export function useItemsArrTotalPrice(items: ProductItemProjection[], idArr?: number[]) {
	let total = 0;
	items.forEach((item) => {
		if (!idArr || idArr.includes(item.id)) {
			total = total + usePerItemTotalPrice(item);
		}
	});
	return total;
}
