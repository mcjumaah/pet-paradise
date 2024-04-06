export interface SelectedVariety {
	name: string;
	variety: string;
}
export interface CartItem {
	id: number;
	name: string;
	price: string;
	images: string[];
	selectedVariety: SelectedVariety[];
	quantity: number;
}
export const useDummyCartItems = () => {
	let dummyCartItems: CartItem[] = [];

	useDummyProducts().value.forEach((product, index) => {
		if (index < 4) {
			let productDetails = (({ name, price, images }) => ({ name, price, images }))(product);

			let detailsForCart = {
				id: index,
				...productDetails,
				selectedVariety: [
					{
						name: "Dummy Varieties Name",
						variety: "Dummy Variety",
					},
				],
				quantity: useRandomInt(1, 5),
			};
			dummyCartItems.push(detailsForCart);
		}
	});

	return useState("dummy-cart-items", () => dummyCartItems);
};

export function useRandomInt(min: number, max: number) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
