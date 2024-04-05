export const useDummyProducts = () => {
	return useState("dummy-products", () => [
		{
			id: 1,
			name: "Dr Shiba Happy Tummy Healthy Dog Treats Snack - Dog Multivitamins - Dog Food for Digestive Care",
			price: "₱499",
			images: [
				"/images/shop-products/01/01.jpg",
				"/images/shop-products/01/02.jpg",
				"/images/shop-products/01/03.jpg",
				"/images/shop-products/01/04.jpg",
				"/images/shop-products/01/05.jpg",
				"/images/shop-products/01/06.jpg",
				"/images/shop-products/01/07.jpg",
				"/images/shop-products/01/08.jpg",
			],
			soldNum: 30125,
			selections: [{ name: "Flavour", varieties: ["Beef", "Duck", "Salmon", "Suprise Me!"] }],
		},
		{
			id: 2,
			name: "PEDIGREE DentaStix for Puppy – Dental Treats for Puppy, 56g. Daily Puppy Treats for Healthy Gums",
			price: "₱71",
			images: ["/images/shop-products/02/01.png"],
			soldNum: 30125,
			selections: [{ name: "Flavour", varieties: ["Beef", "Duck", "Salmon", "Suprise Me!"] }],
		},
		{
			id: 3,
			name: "Dr. Shiba Happy Tummy Taster Pack - Beef 40g  Dog Treats Snack - Dog Food for Digestive Care",
			price: "₱99",
			images: ["/images/shop-products/03/01.png"],
			soldNum: 30125,
			selections: [{ name: "Flavour", varieties: ["Beef", "Duck", "Salmon", "Suprise Me!"] }],
		},
		{
			id: 4,
			name: "Mandaue Foam Dog Bed",
			price: "₱735",
			images: ["/images/shop-products/04/01.png"],
			soldNum: 30125,
			selections: [{ name: "Flavour", varieties: ["Beef", "Duck", "Salmon", "Suprise Me!"] }],
		},
		{
			id: 5,
			name: "BATTERY CAGE (3 DOOR/4 DOOR/5 DOOR) - Mr.Chuck",
			price: "₱990 - ₱1,290",
			images: ["/images/shop-products/05/01.png"],
			soldNum: 30125,
			selections: [{ name: "Flavour", varieties: ["Beef", "Duck", "Salmon", "Suprise Me!"] }],
		},
		{
			id: 6,
			name: "Rojeco 3.2L Cat Drinking Fountain Filters 304 Stainless Steel Pet Fountains Filter Replacement",
			price: "₱329 - ₱629",
			images: ["/images/shop-products/06/01.png"],
			soldNum: 30125,
			selections: [{ name: "Flavour", varieties: ["Beef", "Duck", "Salmon", "Suprise Me!"] }],
		},
		{
			id: 7,
			name: "Petcher Detick and Alprocide 1cc & 2cc with Free Syringe Anti Tick and Flea Spot on Treatment",
			price: "₱37 - ₱92",
			images: ["/images/shop-products/07/01.png"],
			soldNum: 30125,
			selections: [{ name: "Flavour", varieties: ["Beef", "Duck", "Salmon", "Suprise Me!"] }],
		},
		{
			id: 8,
			name: "Alonefire 9LED 395nm Aluminum Alloy Mini UV Flashlight Travel Cat Dog Urine Money Detector Torch For AAA Battery",
			price: "₱75 - ₱79",
			images: ["/images/shop-products/08/01.png"],
			soldNum: 30125,
			selections: [{ name: "Flavour", varieties: ["Beef", "Duck", "Salmon", "Suprise Me!"] }],
		},
		{
			id: 9,
			name: "Rojeco Cat Water Fountain Replaceable Activated Carbon Filters Filter For Pet Automatic Drinking",
			price: "₱179 - ₱529",
			images: ["/images/shop-products/09/01.png"],
			soldNum: 30125,
			selections: [{ name: "Flavour", varieties: ["Beef", "Duck", "Salmon", "Suprise Me!"] }],
		},
		{
			id: 10,
			name: "Alonefire 9LED 395nm Aluminum Alloy Mini UV Flashlight Travel Cat Dog Urine Money Detector Torch For AAA Battery",
			price: "₱859",
			images: ["/images/shop-products/10/01.png"],
			soldNum: 30125,
			selections: [{ name: "Flavour", varieties: ["Beef", "Duck", "Salmon", "Suprise Me!"] }],
		},
		{
			id: 11,
			name: "Alonefire 9LED 395nm Aluminum Alloy Mini UV Flashlight Travel Cat Dog Urine Money Detector Torch For AAA Battery",
			price: "₱859",
			images: ["/images/shop-products/11/01.png"],
			soldNum: 30125,
			selections: [{ name: "Flavour", varieties: ["Beef", "Duck", "Salmon", "Suprise Me!"] }],
		},
		{
			id: 12,
			name: "Alonefire 9LED 395nm Aluminum Alloy Mini UV Flashlight Travel Cat Dog Urine Money Detector Torch For AAA Battery",
			price: "₱859",
			images: ["/images/shop-products/12/01.png"],
			soldNum: 30125,
			selections: [{ name: "Flavour", varieties: ["Beef", "Duck", "Salmon", "Suprise Me!"] }],
		},
		{
			id: 13,
			name: "Alonefire 9LED 395nm Aluminum Alloy Mini UV Flashlight Travel Cat Dog Urine Money Detector Torch For AAA Battery",
			price: "₱859",
			images: ["/images/shop-products/13/01.png"],
			soldNum: 30125,
			selections: [{ name: "Flavour", varieties: ["Beef", "Duck", "Salmon", "Suprise Me!"] }],
		},
		{
			id: 14,
			name: "Alonefire 9LED 395nm Aluminum Alloy Mini UV Flashlight Travel Cat Dog Urine Money Detector Torch For AAA Battery",
			price: "₱859",
			images: ["/images/shop-products/14/01.png"],
			soldNum: 30125,
			selections: [{ name: "Flavour", varieties: ["Beef", "Duck", "Salmon", "Suprise Me!"] }],
		},
		{
			id: 15,
			name: "Alonefire 9LED 395nm Aluminum Alloy Mini UV Flashlight Travel Cat Dog Urine Money Detector Torch For AAA Battery",
			price: "₱859",
			images: ["/images/shop-products/15/01.png"],
			soldNum: 30125,
			selections: [{ name: "Flavour", varieties: ["Beef", "Duck", "Salmon", "Suprise Me!"] }],
		},
	]);
};

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
			let { id: _, selections: __, soldNum: ___, ...otherDetails } = product;
			let detailsForCart = {
				id: index,
				...otherDetails,
				quantity: useRandomInt(1, 5),
				selectedVariety: [
					{
						name: "Dummy Varieties Name",
						variety: "Dummy Variety",
					},
				],
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
