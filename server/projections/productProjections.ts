import { Pagination } from "../utils/paginationUtil";
import { DescriptionProjection } from "./descriptionProjection";
import { PriceProjection } from "./priceProjections";
import { SelectionProjection } from "./selectionProjection";

export interface ProductInterface {
	id: number;
	sku: string;
	name: string;
	stock: number;
	soldNum: number;
	prices: PriceProjection[];
	selections: SelectionProjection[];
	images: string[];
	description: DescriptionProjection;
}
export interface ProductSummaryInterface extends Omit<ProductInterface, "prices" | "selections" | "description"> {
	price: {
		min: number;
		max: number;
	} | null;
}
export interface ProductsPaginatedInterface {
	content: ProductSummaryProjection[];
	pagination: Pagination;
}

export class ProductProjection implements ProductInterface {
	constructor(
		public id: number,
		public sku: string,
		public name: string,
		public stock: number,
		public soldNum: number,
		public prices: PriceProjection[],
		public selections: SelectionProjection[],
		public images: string[],
		public description: DescriptionProjection
	) {
		this.id = id;
		this.sku = sku;
		this.name = name;
		this.stock = stock;
		this.soldNum = soldNum;
		this.prices = prices;
		this.selections = selections;
		this.images = images;
		this.description = description;
	}
}
export class ProductSummaryProjection implements ProductSummaryInterface {
	constructor(
		public id: number,
		public sku: string,
		public name: string,
		public stock: number,
		public soldNum: number,
		public price: {
			min: number;
			max: number;
		} | null,
		public images: string[]
	) {
		this.id = id;
		this.sku = sku;
		this.name = name;
		this.stock = stock;
		this.soldNum = soldNum;
		this.price = price;
		this.images = images;
	}
}
export class ProductsPaginatedProjection implements ProductsPaginatedInterface {
	constructor(public content: ProductSummaryProjection[], public pagination: Pagination) {
		this.content = content;
		this.pagination = pagination;
	}
}
