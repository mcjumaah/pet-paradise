import { sql } from "../db";
import { keysToCamelCase } from "../utils/entityFieldsUtil";
import { paginationSql } from "../utils/paginationUtil";

export type PetCategory = {
	id: number;
	name: string;
};

export type PetCategoryDTO = Pick<PetCategory, "name">;

export type PetCategoryPaginated = {
	content: PetCategory[];
	pagination: Pagination;
};

export const findAll = async (pageNum: number = 0, search: string = "") => {
	try {
		search = `%${search}%`;
		const { result, pagination } = await paginationSql(
			pageNum,
			`SELECT * FROM pet_category WHERE (? = '%%' OR name LIKE ?)`,
			[search, search]
		);

		return keysToCamelCase({
			content: result as PetCategory[],
			pagination: pagination,
		}) as PetCategoryPaginated;
	} catch (error) {
		throw error;
	}
};

export const findById = async (id: number) => {
	try {
		const result = keysToCamelCase(
			await sql({
				query: `SELECT * FROM pet_category WHERE id = ?`,
				values: [id],
			})
		) as PetCategory[];

		return result.length === 1 ? result[0] : null;
	} catch (error) {
		throw error;
	}
};

export const save = async (data: PetCategoryDTO) => {
	try {
		await sql({
			query: `
        INSERT INTO pet_category (
          name
        ) VALUES (?)`,
			values: [data.name],
		});

		const result = keysToCamelCase(
			await sql({
				query: `SELECT * FROM pet_category WHERE id = LAST_INSERT_ID()`,
			})
		) as PetCategory[];

		return result.length === 1 ? result[0] : null;
	} catch (error) {
		throw error;
	}
};

export const update = async (id: number, data: PetCategoryDTO) => {
	try {
		await sql({
			query: `
      UPDATE pet_category 
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
			query: `DELETE FROM pet_category WHERE id = ?`,
			values: [id],
		});

		return true;
	} catch (error) {
		throw error;
	}
};
