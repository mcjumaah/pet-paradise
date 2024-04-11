import { Pagination } from "../db";
import { PriceProjection } from "./priceProjections";

export interface ProductInterface {
	id: number;
	sku: string;
	name: string;
	price: PriceProjection[];
	stock: number;
	images: string[];
	soldNum: number;
	cartId: number;
}
export interface ProductSummaryInterface extends Omit<ProductInterface, "price"> {
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
		public price: PriceProjection[],
		public stock: number,
		public images: string[],
		public soldNum: number,
		public cartId: number
	) {
		this.id = id;
		this.sku = sku;
		this.name = name;
		this.price = price;
		this.stock = stock;
		this.images = images;
		this.soldNum = soldNum;
		this.cartId = cartId;
	}
}
export class ProductSummaryProjection implements ProductSummaryInterface {
	constructor(
		public id: number,
		public sku: string,
		public name: string,
		public price: {
			min: number;
			max: number;
		} | null,
		public stock: number,
		public images: string[],
		public soldNum: number,
		public cartId: number
	) {
		this.id = id;
		this.sku = sku;
		this.name = name;
		this.price = price;
		this.stock = stock;
		this.images = images;
		this.soldNum = soldNum;
		this.cartId = cartId;
	}
}
export class ProductsPaginationProjection implements ProductsPaginationInterface {
	constructor(public content: ProductSummaryProjection[], public pagination: Pagination) {
		this.content = content;
		this.pagination = pagination;
	}
}
