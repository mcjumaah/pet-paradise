import { sql } from "../db";

export type Price = {
	id: number;
	value: number;
	productId: number;
};

export const findAll = async () => {
	try {
		const result = await sql({ query: `SELECT * FROM price` });

		return result as Price[];
	} catch (error) {
		return error;
	}
};

export const findById = async (id: string) => {
	try {
		const result = (await sql({
			query: `SELECT * FROM price WHERE id = ?`,
			values: [id],
		})) as Price[];

		return result.length === 1 ? result[0] : null;
	} catch (error) {
		return error;
	}
};

export const save = async (data: Pick<Price, "value" | "productId">) => {
	try {
		const result = (await sql({
			query: `
        INSERT INTO price (
          value, 
					product_id
        ) VALUES (?, ?) 
        RETURNING *
			`,
			values: [data.value, data.productId],
		})) as Price[];

		return result.length === 1 ? result[0] : null;
	} catch (error) {
		return error;
	}
};

export const update = async (id: string, data: Pick<Price, "value" | "productId">) => {
	try {
		await sql({
			query: `
				UPDATE price 
				SET 
					name = ?, 
					selection_id = ?, 
					price_id = ?
				WHERE id = ?
			`,
			values: [data.value, data.productId, id],
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
