import { sql } from "../db";
import { keysToCamelCase } from "../utils/entityFieldsUtil";
import { Pagination } from "../utils/paginationUtil";

export type Cart = {
	id: number;
	itemCount: number;
	customerId: number;
};

export type CartDTO = Pick<Cart, "itemCount" | "customerId">;

export type CartPaginated = {
	content: Cart[];
	pagination: Pagination;
};

export const findAll = async (pageNum: string = "0") => {
	try {
		const { result, pagination } = await paginationSql(pageNum, `SELECT * FROM cart`);

		return keysToCamelCase({
			content: result as Cart[],
			pagination: pagination,
		}) as CartPaginated;
	} catch (error) {
		throw error;
	}
};

export const findById = async (id: string) => {
	try {
		const result = keysToCamelCase(
			await sql({
				query: `SELECT * FROM cart WHERE id = ?`,
				values: [id],
			})
		) as Cart[];

		return result.length === 1 ? result[0] : null;
	} catch (error) {
		throw error;
	}
};

export const findOneByCustomerId = async (customerId: string) => {
	try {
		const result = keysToCamelCase(
			await sql({
				query: `SELECT * FROM cart WHERE customer_id = ?`,
				values: [customerId],
			})
		) as Cart[];

		return result.length === 1 ? result[0] : null;
	} catch (error) {
		return error;
	}
};

export const save = async (data: CartDTO) => {
	try {
		await sql({
			query: `
				INSERT INTO cart (
					item_count, 
					customer_id
				) 
				VALUES (?, ?)
			`,
			values: [data.itemCount, data.customerId],
		});

		const result = keysToCamelCase(
			await sql({
				query: `SELECT * FROM cart WHERE id = LAST_INSERT_ID()`,
			})
		) as Cart[];

		return result.length === 1 ? result[0] : null;
	} catch (error) {
		throw error;
	}
};

export const update = async (id: string, data: CartDTO) => {
	try {
		await sql({
			query: `
				UPDATE cart 
				SET 
					item_count = ?, 
					customer_id = ? 
				WHERE id = ?
			`,
			values: [data.itemCount, data.customerId, id],
		});

		return await findById(id);
	} catch (error) {
		throw error;
	}
};

export const deleteById = async (id: string) => {
	try {
		await sql({
			query: `DELETE FROM cart WHERE id = ?`,
			values: [id],
		});

		return true;
	} catch (error) {
		throw error;
	}
};