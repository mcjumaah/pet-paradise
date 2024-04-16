import { sql } from "../db";
import { keysToCamelCase } from "../utils/entityFieldsUtil";
import { PaginationSql, paginationSql } from "../utils/paginationUtil";

export type Product = {
	id: number;
	sku: string;
	name: string;
	stock: number;
	images: string[];
	soldNum: number;
	cartId: number;
};

export const findAll = async (pageNum: string = "0") => {
	try {
		const { result, pagination } = await paginationSql(pageNum, `SELECT * FROM product`);

		return keysToCamelCase({
			content: result as Product[],
			pagination: pagination,
		});
	} catch (error) {
		return error;
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
		return error;
	}
};

export const save = async (data: Pick<Product, "sku" | "name" | "stock" | "images" | "soldNum">) => {
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
		return error;
	}
};

export const update = async (id: string, data: Pick<Product, "sku" | "name" | "stock" | "images" | "soldNum">) => {
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
