import { Pagination } from "../db";
import { Price } from "../model/price";

export interface ProductSummaryProjection {
	id: number;
	sku: string;
	name: string;
	price: {
		min: number;
		max: number;
	} | null;
	stock: number;
	images: string[];
	soldNum: number;
	cartId: number;
}
export interface ProductProjection {
	id: number;
	sku: string;
	name: string;
	price: Price[];
	stock: number;
	images: string[];
	soldNum: number;
	cartId: number;
}
export interface ProductsPaginationProjection {
	content: ProductSummaryProjection[];
	pagination: Pagination;
}
