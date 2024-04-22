import { sql } from "../db";
import { keysToCamelCase } from "../utils/entityFieldsUtil";

export type Description = {
	id: number;
	text: string;
	images: string[];
	productId: number;
};

export type DescriptionDTO = Pick<Description, "text" | "images" | "productId">;

export const findAll = async () => {
	try {
		const result = await sql({ query: `SELECT * FROM description` });

		return keysToCamelCase(result) as Description[];
	} catch (error) {
		return error;
	}
};

export const findById = async (id: string) => {
	try {
		const result = keysToCamelCase(
			await sql({
				query: `SELECT * FROM description WHERE id = ?`,
				values: [id],
			})
		) as Description[];

		return result.length === 1 ? result[0] : null;
	} catch (error) {
		return error;
	}
};

export const findOneByProductId = async (productId: string) => {
	try {
		const result = keysToCamelCase(
			await sql({
				query: `SELECT * FROM description WHERE product_id = ?`,
				values: [productId],
			})
		) as Description[];

		return result.length === 1 ? result[0] : null;
	} catch (error) {
		throw error;
	}
};

export const save = async (data: DescriptionDTO) => {
	try {
		await sql({
			query: `
				INSERT INTO description (
					text, 
					images, 
					product_id
				) 
				VALUES (?, ?, ?)
			`,
			values: [data.text, data.images, data.productId],
		});

		const result = keysToCamelCase(
			await sql({
				query: `SELECT * FROM description WHERE id = LAST_INSERT_ID()`,
			})
		) as Description[];

		return result.length === 1 ? result[0] : null;
	} catch (error) {
		return error;
	}
};

export const update = async (id: string, data: DescriptionDTO) => {
	try {
		await sql({
			query: `
				UPDATE description 
				SET 
					name = ?, 
					images = ?, 
					product_id = ? 
				WHERE id = ?
			`,
			values: [data.text, data.images, data.productId, id],
		});

		return await findById(id);
	} catch (error) {
		return error;
	}
};

export const deleteById = async (id: string) => {
	try {
		await sql({
			query: `DELETE FROM description WHERE id = ?`,
			values: [id],
		});

		return true;
	} catch (error) {
		return error;
	}
};
