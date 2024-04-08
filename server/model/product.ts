import { sql } from "../db";

export type Product = {
	id: number;
	sku: string;
	name: string;
	price: string;
	stock: number;
	images: string[];
	soldNum: number;
	itemCategoryId: number;
	petCategoryId: number;
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

export const save = async (data: Pick<Product, "sku" | "name" | "price" | "itemCategoryId" | "petCategoryId">) => {
	try {
		const result = (await sql({
			query: `
        INSERT INTO product (
          sku, 
          name, 
          price, 
          itemCategoryId, 
          petCategoryId
        ) VALUES (?, ?, ?, ?, ?)
        RETURNING *`,
			values: [data.sku, data.name, data.price, data.itemCategoryId, data.petCategoryId],
		})) as Product[];

		return result.length === 1 ? result[0] : null;
	} catch (error) {
		return error;
	}
};

export const update = async (
	id: string,
	data: Pick<Product, "sku" | "name" | "price" | "itemCategoryId" | "petCategoryId">
) => {
	try {
		await sql({
			query: `
      UPDATE product 
      SET 
        sku = ?, 
        name = ?, 
        price = ?, 
        itemCategoryId = ?, 
        petCategoryId = ? 
      WHERE id = ?`,
			values: [data.sku, data.name, data.price, data.itemCategoryId, data.petCategoryId, id],
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
