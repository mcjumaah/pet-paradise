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
