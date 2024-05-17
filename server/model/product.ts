import moment from "moment";
import { sql } from "../db";
import { Prettify, keysToCamelCase } from "../utils/entityFieldsUtil";
import { paginationSql } from "../utils/paginationUtil";
import { DescriptionDTO } from "./description";
import { PriceProjection } from "../projections/priceProjections";

export type Product = {
	id: number;
	sku: string;
	name: string;
	stock: number;
	images: string[] | null;
	soldNum: number;
	deletedAt: string;
};

export type ProductDTO = Pick<Product, "sku" | "name" | "stock" | "images" | "soldNum">;

export type FullProductDTO = Prettify<
	ProductDTO & { description: Prettify<Omit<DescriptionDTO, "productId">> | null } & {
		prices: Prettify<Omit<PriceProjection, "id">>[];
		petCategoryIds: number[] | null;
		itemCategoryIds: number[] | null;
	}
>;

export type ProductPaginated = {
	content: Product[];
	pagination: Pagination;
};

export type ProductHasPetCategory = {
	productId: number;
	petCategoryId: number;
};

export type ProductHasItemCategory = {
	productId: number;
	itemCategoryId: number;
};

export const findAll = async (pageNum: number = 0, search: string = "", pet?: number, item?: number) => {
	try {
		search = `%${search}%`;
		const { result, pagination } = await paginationSql(
			pageNum,
			`
				SELECT DISTINCT	p.* 
					FROM product p 
				LEFT JOIN product_has_pet_category p_pc 
					ON p_pc.product_id = p.id 
				LEFT JOIN product_has_item_category p_ic 
					ON p_ic.product_id = p.id 
				WHERE (? = '%%' OR p.name LIKE ?) 
					AND (? IS NULL OR p_pc.pet_category_id = ?) 
					AND (? IS NULL OR p_ic.item_category_id = ?) 
					AND deleted_at IS NULL
			`,
			[search, search, pet ?? null, pet ?? null, item ?? null, item ?? null]
		);

		return keysToCamelCase({
			content: result as Product[],
			pagination: pagination,
		}) as ProductPaginated;
	} catch (error) {
		throw error;
	}
};

export const findById = async (id: number) => {
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

export const savePetCategory = async (productId: number, petCategoryId: number) => {
	try {
		await sql({
			query: `
        INSERT INTO product_has_pet_category (
          product_id, 
          pet_category_id
        ) VALUES (?, ?)`,
			values: [productId, petCategoryId],
		});

		const result = keysToCamelCase(
			await sql({
				query: `SELECT * FROM product_has_pet_category WHERE product_id = ? AND pet_category_id = ?`,
				values: [productId, petCategoryId],
			})
		) as ProductHasPetCategory[];

		return result.length === 1 ? result[0] : null;
	} catch (error) {
		throw error;
	}
};

export const saveItemCategory = async (productId: number, itemCategoryId: number) => {
	try {
		await sql({
			query: `
        INSERT INTO product_has_item_category (
          product_id, 
          item_category_id
        ) VALUES (?, ?)`,
			values: [productId, itemCategoryId],
		});

		const result = keysToCamelCase(
			await sql({
				query: `SELECT * FROM product_has_item_category WHERE product_id = ? AND item_category_id = ?`,
				values: [productId, itemCategoryId],
			})
		) as ProductHasPetCategory[];

		return result.length === 1 ? result[0] : null;
	} catch (error) {
		throw error;
	}
};

export const update = async (id: number, data: ProductDTO) => {
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
				WHERE id = ?
			`,
			values: [data.sku, data.name, data.stock, data.images, data.soldNum, id],
		});

		return await findById(id);
	} catch (error) {
		throw error;
	}
};

export const deleteById = async (id: number) => {
	try {
		const currentDate = moment().format("YYYY-MM-DD HH:mm:ss");

		await sql({
			query: `
				UPDATE product 
				SET 
					deleted_at = ? 
				WHERE id = ?
			`,
			values: [currentDate, id],
		});

		return await findById(id);
	} catch (error) {
		throw error;
	}
};

export const deletePetCategoriesByProductId = async (id: number) => {
	try {
		await sql({
			query: `DELETE FROM product_has_pet_category WHERE product_id = ?`,
			values: [id],
		});

		return true;
	} catch (error) {
		throw error;
	}
};

export const deleteItemCategoriesByProductId = async (id: number) => {
	try {
		await sql({
			query: `DELETE FROM product_has_item_category WHERE product_id = ?`,
			values: [id],
		});

		return true;
	} catch (error) {
		throw error;
	}
};
