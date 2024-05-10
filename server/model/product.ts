import { sql } from "../db";
import { keysToCamelCase } from "../utils/entityFieldsUtil";
import { paginationSql } from "../utils/paginationUtil";

export type Product = {
	id: number;
	sku: string;
	name: string;
	stock: number;
	images: string[];
	soldNum: number;
};

export type ProductDTO = Pick<Product, "sku" | "name" | "stock" | "images" | "soldNum">;

export const findAll = async (pageNum: number = 0) => {
	try {
		const { result, pagination } = await paginationSql(pageNum, `SELECT * FROM product`);

		return keysToCamelCase({
			content: result as Product[],
			pagination: pagination,
		});
	} catch (error) {
		throw error;
	}
};

export const findById = async (id: string) => {
	try {
		const result = keysToCamelCase(
			await sql({
				query: `SELECT * FROM product WHERE id = ?`,
				values: [id],
			})
		) as Product[];

		return result.length === 1 ? result[0] : null;
	} catch (error) {
		throw error;
	}
};

export const save = async (data: ProductDTO) => {
	try {
		await sql({
			query: `
        INSERT INTO product (
          sku, 
          name, 
					stock, 
					images, 
					sold_num
        ) VALUES (?, ?, ?, ?, ?)`,
			values: [data.sku, data.name, data.stock, data.images, data.soldNum],
		});

		const result = keysToCamelCase(
			await sql({
				query: `SELECT * FROM product WHERE id = LAST_INSERT_ID()`,
			})
		) as Product[];

		return result.length === 1 ? result[0] : null;
	} catch (error) {
		throw error;
	}
};

export const update = async (id: string, data: ProductDTO) => {
	try {
		await sql({
			query: `
      UPDATE product 
      SET 
        sku = ?, 
        name = ?, 
				stock = ?, 
				images = ?, 
				sold_num = ? 
      WHERE id = ?`,
			values: [data.sku, data.name, data.stock, data.images, data.soldNum, id],
		});

		return await findById(id);
	} catch (error) {
		throw error;
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
		throw error;
	}
};
