import { sql } from "../db";
import { keysToCamelCase } from "../utils/entityFieldsUtil";

export type Variety = {
	id: number;
	name: string;
	selectionId: number;
	productItemId: number;
	priceId: number;
};

export type VarietyDTO = Pick<Variety, "name" | "selectionId" | "productItemId" | "priceId">;

export const findAll = async () => {
	try {
		const result = await sql({ query: `SELECT * FROM variety` });

		return keysToCamelCase(result) as Variety[];
	} catch (error) {
		throw error;
	}
};

export const findAllByPriceId = async (priceId: string) => {
	try {
		const result = await sql({
			query: `SELECT * FROM variety WHERE price_id = ?`,
			values: [priceId],
		});

		return keysToCamelCase(result) as Variety[];
	} catch (error) {
		throw error;
	}
};

export const findAllBySelectionId = async (selectionId: string) => {
	try {
		const result = await sql({
			query: `SELECT * FROM variety WHERE selection_id = ?`,
			values: [selectionId],
		});

		return keysToCamelCase(result) as Variety[];
	} catch (error) {
		throw error;
	}
};

export const findById = async (id: string) => {
	try {
		const result = keysToCamelCase(
			await sql({
				query: `SELECT * FROM variety WHERE id = ?`,
				values: [id],
			})
		) as Variety[];

		return result.length === 1 ? result[0] : null;
	} catch (error) {
		throw error;
	}
};

export const save = async (data: VarietyDTO) => {
	try {
		await sql({
			query: `
				INSERT INTO variety (
					name, 
					selection_id, 
					product_item_id, 
					price_id
				) VALUES (?, ?, ?, ?)
			`,
			values: [data.name, data.selectionId, data.productItemId, data.priceId],
		});

		const result = keysToCamelCase(
			await sql({
				query: `SELECT * FROM variety WHERE id = LAST_INSERT_ID()`,
			})
		) as Variety[];

		return result.length === 1 ? result[0] : null;
	} catch (error) {
		throw error;
	}
};

export const update = async (id: string, data: VarietyDTO) => {
	try {
		await sql({
			query: `
				UPDATE variety 
				SET 
					name = ?, 
					selection_id = ?, 
					product_item_id = ?, 
					price_id = ? 
				WHERE id = ?
			`,
			values: [data.name, data.selectionId, data.productItemId, data.priceId, id],
		});

		return await findById(id);
	} catch (error) {
		throw error;
	}
};

export const deleteById = async (id: string) => {
	try {
		await sql({
			query: `DELETE FROM variety WHERE id = ?`,
			values: [id],
		});

		return true;
	} catch (error) {
		throw error;
	}
};
