import { sql } from "../db";
import { keysToCamelCase } from "../utils/entityFields";

export type Price = {
	id: number;
	value: number;
	productId: number;
	varietyId: number;
};

export const findAll = async () => {
	try {
		const result = await sql({ query: `SELECT * FROM price` });

		return keysToCamelCase(result) as Price[];
	} catch (error) {
		return error;
	}
};

export const findAllByProductId = async (productId: string) => {
	try {
		const result = keysToCamelCase(
			await sql({
				query: `SELECT * FROM price WHERE product_id = ?`,
				values: [productId],
			})
		) as Price[];

		return result;
	} catch (error) {
		return error;
	}
};

export const findById = async (id: string) => {
	try {
		const result = keysToCamelCase(
			await sql({
				query: `SELECT * FROM price WHERE id = ?`,
				values: [id],
			})
		) as Price[];

		return result.length === 1 ? result[0] : null;
	} catch (error) {
		return error;
	}
};

export const save = async (data: Pick<Price, "value" | "productId" | "varietyId">) => {
	try {
		await sql({
			query: `
				INSERT INTO price (
					value, 
					product_id, 
					variety_id
				) 
				VALUES (?, ?, ?)
			`,
			values: [data.value, data.productId, data.varietyId],
		});

		const result = keysToCamelCase(
			await sql({
				query: `SELECT * FROM price WHERE id = LAST_INSERT_ID()`,
			})
		) as Price[];

		return result.length === 1 ? result[0] : null;
	} catch (error) {
		return error;
	}
};

export const update = async (id: string, data: Pick<Price, "value" | "productId" | "varietyId">) => {
	try {
		await sql({
			query: `
				UPDATE price 
				SET 
					name = ?, 
					product_id = ?, 
					variety_id = ? 
				WHERE id = ?
			`,
			values: [data.value, data.productId, data.varietyId, id],
		});

		return await findById(id);
	} catch (error) {
		return error;
	}
};

export const deleteById = async (id: string) => {
	try {
		await sql({
			query: `DELETE FROM price WHERE id = ?`,
			values: [id],
		});

		return true;
	} catch (error) {
		return error;
	}
};
