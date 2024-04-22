import { Pagination } from "../utils/paginationUtil";
import { PriceProjection } from "./priceProjections";

export interface ProductInterface {
	id: number;
	sku: string;
	name: string;
	stock: number;
	soldNum: number;
	prices: PriceProjection[];
	images: string[];
}
export interface ProductSummaryInterface extends Omit<ProductInterface, "prices"> {
	price: {
		min: number;
		max: number;
	} | null;
}
export interface ProductsPaginationInterface {
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
		public images: string[]
	) {
		this.id = id;
		this.sku = sku;
		this.name = name;
		this.stock = stock;
		this.soldNum = soldNum;
		this.prices = prices;
		this.images = images;
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
export class ProductsPaginationProjection implements ProductsPaginationInterface {
	constructor(public content: ProductSummaryProjection[], public pagination: Pagination) {
		this.content = content;
		this.pagination = pagination;
	}
}
