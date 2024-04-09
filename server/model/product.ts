import { sql } from "../db";

export type Product = {
	id: number;
	sku: string;
	name: string;
	stock: number;
	images: string[];
	soldNum: number;
	cartId: number;
};

export const findAll = async () => {
	try {
		const result = await sql({ query: `SELECT * FROM product` });

		return result as Product[];
	} catch (error) {
		return error;
	}
};

export const findById = async (id: string) => {
	try {
		const result = (await sql({
			query: `SELECT * FROM product WHERE id = ?`,
			values: [id],
		})) as Product[];

		return result.length === 1 ? result[0] : null;
	} catch (error) {
		return error;
	}
};

export const save = async (data: Pick<Product, "sku" | "name">) => {
	try {
		await sql({
			query: `
        INSERT INTO product (
          sku, 
          name
        ) VALUES (?, ?)`,
			values: [data.sku, data.name],
		});

		const result = (await sql({
			query: `SELECT * FROM product WHERE id = LAST_INSERT_ID()`,
		})) as Product[];

		return result.length === 1 ? result[0] : null;
	} catch (error) {
		return error;
	}
};

export const update = async (id: string, data: Pick<Product, "sku" | "name">) => {
	try {
		await sql({
			query: `
      UPDATE product 
      SET 
        sku = ?, 
        name = ? 
      WHERE id = ?`,
			values: [data.sku, data.name, id],
		});

		return await findById(id);
	} catch (error) {
		return error;
	}
};

export const deleteById = async (id: string) => {
	try {
		await sql({
			query: `DELETE FROM product WHERE id = ?`,
			values: [id],
		});

		return true;
	} catch (error) {
		return error;
	}
};
