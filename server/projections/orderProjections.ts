import { OrderPayMethods } from "../model/order";
import { ProductItemProjection } from "./productItemProjections";

export interface OrderInterface {
	id: number;
	orderDate: string;
	orderTotalPrice: number;
	paymentDate: string;
	paymentType: OrderPayMethods;
	orderItems: ProductItemProjection[];
}

export interface OrdersPaginatedInterface {
	content: OrderProjection[];
	pagination: Pagination;
}

export class OrderProjection implements OrderInterface {
	constructor(
		public id: number,
		public orderDate: string,
		public orderTotalPrice: number,
		public paymentDate: string,
		public paymentType: OrderPayMethods,
		public orderItems: ProductItemProjection[]
	) {
		this.id = id;
		this.orderDate = orderDate;
		this.orderTotalPrice = orderTotalPrice;
		this.paymentDate = paymentDate;
		this.paymentType = paymentType;
		this.orderItems = orderItems;
	}
}

export class OrdersPaginatedProjection implements OrdersPaginatedInterface {
	constructor(public content: OrderProjection[], public pagination: Pagination) {
		this.content = content;
		this.pagination = pagination;
	}
}
