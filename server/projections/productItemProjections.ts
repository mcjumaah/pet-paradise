import { SelectionOnPriceProjection } from "./selectionProjection";

export interface ProductItemInterface {
	id: number;
	status: "ON_CART" | "ON_ORDER";
	name: string;
	price: number;
	quantity: number;
	totalPrice: number;
	selection: SelectionOnPriceProjection[];
	previewImage: string | null;
}

export interface ProductItemsPaginatedInterface {
	content: ProductItemProjection[];
	pagination: Pagination;
}

export class ProductItemProjection implements ProductItemInterface {
	constructor(
		public id: number,
		public status: "ON_CART" | "ON_ORDER",
		public name: string,
		public price: number,
		public quantity: number,
		public totalPrice: number,
		public selection: SelectionOnPriceProjection[],
		public previewImage: string | null
	) {
		this.id = id;
		this.status = status;
		this.name = name;
		this.price = price;
		this.quantity = quantity;
		this.totalPrice = totalPrice;
		this.selection = selection;
		this.previewImage = previewImage;
	}
}

export class ProductItemsPaginatedProjection implements ProductItemsPaginatedInterface {
	constructor(public content: ProductItemProjection[], public pagination: Pagination) {
		this.content = content;
		this.pagination = pagination;
	}
}
