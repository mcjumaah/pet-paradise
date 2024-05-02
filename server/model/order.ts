import { sql } from "../db";
import { keysToCamelCase } from "../utils/entityFieldsUtil";

export type OrderPayMethods = "COD";

export type Order = {
	id: number;
	orderDate: string;
	totalPrice: number;
	paymentDate?: number;
	paymentMethod: OrderPayMethods;
	customerId: number;
};

export type OrderDTO = Pick<Order, "orderDate" | "totalPrice" | "paymentDate" | "paymentMethod" | "customerId">;

export const findAll = async () => {
	try {
		const result = await sql({ query: `SELECT * FROM order` });

		return keysToCamelCase(result) as Order[];
	} catch (error) {
		throw error;
	}
};

export const findById = async (id: number) => {
	try {
		const result = keysToCamelCase(
			await sql({
				query: `SELECT * FROM order WHERE id = ?`,
				values: [id],
			})
		) as Order[];

		return result.length === 1 ? result[0] : null;
	} catch (error) {
		throw error;
	}
};

export const save = async (data: OrderDTO) => {
	try {
		await sql({
			query: `
				INSERT INTO order (
					order_date, 
					total_price, 
					payment_date, 
					payment_method, 
					customer_id
				) VALUES (?, ?, ?, ?, ?)
			`,
			values: [data.orderDate, data.totalPrice, data.paymentDate, data.paymentMethod, data.customerId],
		});

		const result = keysToCamelCase(
			await sql({
				query: `SELECT * FROM order WHERE id = LAST_INSERT_ID()`,
			})
		) as Order[];

		return result.length === 1 ? result[0] : null;
	} catch (error) {
		throw error;
	}
};

export const update = async (id: number, data: OrderDTO) => {
	try {
		await sql({
			query: `
				UPDATE order 
				SET 
					order_date = ?, 
					total_price = ?, 
					payment_date = ?, 
					payment_method = ?, 
					customer_id = ?, 
				WHERE id = ?
			`,
			values: [data.orderDate, data.totalPrice, data.paymentDate, data.paymentMethod, data.customerId, id],
		});

		return await findById(id);
	} catch (error) {
		throw error;
	}
};

export const deleteById = async (id: number) => {
	try {
		await sql({
			query: `DELETE FROM order WHERE id = ?`,
			values: [id],
		});

		return true;
	} catch (error) {
		throw error;
	}
};
