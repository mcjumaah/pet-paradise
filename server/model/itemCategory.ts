import { sql } from "../db";
import { keysToCamelCase } from "../utils/entityFieldsUtil";
import { paginationSql } from "../utils/paginationUtil";

export type ItemCategory = {
	id: number;
	name: string;
};

export type ItemCategoryDTO = Pick<ItemCategory, "name">;

export type ItemCategoryPaginated = {
	content: ItemCategory[];
	pagination: Pagination;
};

export const findAll = async (pageNum: number = 0, search: string = "") => {
	try {
		search = `%${search}%`;
		const { result, pagination } = await paginationSql(
			pageNum,
			`SELECT * FROM item_category WHERE (? = '%%' OR name LIKE ?)`,
			[search, search]
		);

		return keysToCamelCase({
			content: result as ItemCategory[],
			pagination: pagination,
		}) as ItemCategoryPaginated;
	} catch (error) {
		throw error;
	}
};

export const findById = async (id: number) => {
	try {
		const result = keysToCamelCase(
			await sql({
				query: `SELECT * FROM item_category WHERE id = ?`,
				values: [id],
			})
		) as ItemCategory[];

		return result.length === 1 ? result[0] : null;
	} catch (error) {
		throw error;
	}
};

export const save = async (data: ItemCategoryDTO) => {
	try {
		await sql({
			query: `
        INSERT INTO item_category (
          name
        ) VALUES (?)`,
			values: [data.name],
		});

		const result = keysToCamelCase(
			await sql({
				query: `SELECT * FROM item_category WHERE id = LAST_INSERT_ID()`,
			})
		) as ItemCategory[];

		return result.length === 1 ? result[0] : null;
	} catch (error) {
		throw error;
	}
};

export const update = async (id: number, data: ItemCategoryDTO) => {
	try {
		await sql({
			query: `
      UPDATE item_category 
      SET 
        name = ? 
      WHERE id = ?`,
			values: [data.name, id],
		});

		return await findById(id);
	} catch (error) {
		throw error;
	}
};

export const deleteById = async (id: number) => {
	try {
		await sql({
			query: `DELETE FROM item_category WHERE id = ?`,
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
			query: `DELETE FROM product_has_item_category WHERE product_id = ?`,
			values: [productId],
		});

		return true;
	} catch (error) {
		throw error;
	}
};
