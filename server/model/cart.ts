import { sql } from "../db";
import { keysToCamelCase } from "../utils/entityFieldsUtil";

export type Cart = {
	id: number;
	itemCount: number;
	customerId: number;
};

export type CartDTO = Pick<Cart, "itemCount" | "customerId">;

export const findAll = async () => {
	try {
		const result = await sql({ query: `SELECT * FROM cart` });

		return keysToCamelCase(result) as Cart[];
	} catch (error) {
		return error;
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
		return error;
	}
};

export const update = async (id: string, data: CartDTO) => {
	try {
		await sql({
			query: `
				UPDATE description 
				SET 
					item_count = ?, 
					customer_id = ? 
				WHERE id = ?
			`,
			values: [data.itemCount, data.customerId, id],
		});

		return await findById(id);
	} catch (error) {
		return error;
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
		return error;
	}
};
