import { sql } from "../db";

export type ProductSelection = {
	id: number;
	name: string;
	productId: number;
};

export const findAll = async () => {
	try {
		const result = await sql({ query: `SELECT * FROM selection` });

		return result as ProductSelection[];
	} catch (error) {
		return error;
	}
};

export const findById = async (id: string) => {
	try {
		const result = (await sql({
			query: `SELECT * FROM selection WHERE id = ?`,
			values: [id],
		})) as ProductSelection[];

		return result.length === 1 ? result[0] : null;
	} catch (error) {
		return error;
	}
};

export const save = async (data: Pick<ProductSelection, "name" | "productId">) => {
	try {
		await sql({
			query: `
        INSERT INTO selection ( 
          name, 
          product_id
        ) VALUES (?, ?)`,
			values: [data.name, data.productId],
		});

		const result = (await sql({
			query: `SELECT * FROM selection WHERE id = LAST_INSERT_ID()`,
		})) as ProductSelection[];

		return result.length === 1 ? result[0] : null;
	} catch (error) {
		return error;
	}
};

export const update = async (id: string, data: Pick<ProductSelection, "name" | "productId">) => {
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
		return error;
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
		return error;
	}
};
