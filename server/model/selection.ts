import { sql } from "../db";
import { keysToCamelCase } from "../utils/entityFieldsUtil";

export type ProductSelection = {
	id: number;
	name: string;
	productId: number;
};

export type ProductSelectionDTO = Pick<ProductSelection, "name" | "productId">;

export const findAll = async () => {
	try {
		const result = await sql({ query: `SELECT * FROM selection` });

		return keysToCamelCase(result) as ProductSelection[];
	} catch (error) {
		throw error;
	}
};

export const findAllByProductId = async (productId: number) => {
	try {
		const result = await sql({
			query: `SELECT * FROM selection WHERE product_id = ?`,
			values: [productId],
		});

		return keysToCamelCase(result) as ProductSelection[];
	} catch (error) {
		throw error;
	}
};

export const findById = async (id: string) => {
	try {
		const result = keysToCamelCase(
			await sql({
				query: `SELECT * FROM selection WHERE id = ?`,
				values: [id],
			})
		) as ProductSelection[];

		return result.length === 1 ? result[0] : null;
	} catch (error) {
		throw error;
	}
};

export const save = async (data: ProductSelectionDTO) => {
	try {
		await sql({
			query: `
        INSERT INTO selection ( 
          name, 
          product_id
        ) VALUES (?, ?)`,
			values: [data.name, data.productId],
		});

		const result = keysToCamelCase(
			await sql({
				query: `SELECT * FROM selection WHERE id = LAST_INSERT_ID()`,
			})
		) as ProductSelection[];

		return result.length === 1 ? result[0] : null;
	} catch (error) {
		throw error;
	}
};

export const update = async (id: string, data: ProductSelectionDTO) => {
	try {
		await sql({
			query: `
      UPDATE selection 
      SET 
        name = ?, 
        product_id = ? 
      WHERE id = ?`,
			values: [data.name, data.productId, id],
		});

		return await findById(id);
	} catch (error) {
		throw error;
	}
};

export const deleteById = async (id: string) => {
	try {
		await sql({
			query: `DELETE FROM selection WHERE id = ?`,
			values: [id],
		});

		return true;
	} catch (error) {
		throw error;
	}
};

export const deleteByProductId = async (productId: number) => {
	try {
		await sql({
			query: `DELETE FROM selection WHERE product_id = ?`,
			values: [productId],
		});

		return true;
	} catch (error) {
		throw error;
	}
};
