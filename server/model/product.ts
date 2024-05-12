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

export type ProductPaginated = {
	content: Product[];
	pagination: Pagination;
};

export const findAll = async (pageNum: number = 0, search: string = "", pet?: number, item?: number) => {
	try {
		search = `%${search}%`;
		const { result, pagination } = await paginationSql(
			pageNum,
			`
				SELECT * FROM product p 
					JOIN product_has_pet_category p_pc ON p_pc.product_id = p.id 
					JOIN product_has_item_category p_ic ON p_ic.product_id = p.id 
				WHERE (? = '%%' OR p.name LIKE ?) 
					AND (? IS NULL OR p_pc.pet_category_id = ?) 
					AND (? IS NULL OR p_ic.item_category_id = ?)
			`,
			[search, search, pet ?? null, pet ?? null, item ?? null, item ?? null]
		);

		console.log(result);

		return keysToCamelCase({
			content: result as Product[],
			pagination: pagination,
		}) as ProductPaginated;
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
