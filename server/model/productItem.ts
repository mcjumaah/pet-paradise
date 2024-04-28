import { sql } from "../db";
import { keysToCamelCase } from "../utils/entityFieldsUtil";
import { Pagination, paginationSql } from "../utils/paginationUtil";

export type ProductItem = {
	id: number;
	status: "ON_CART" | "ON_ORDER";
	quantity: number;
	totalPrice: number;
	productId: number;
	priceId: number;
	orderId: number | null;
	cartId: number | null;
};

export type ProductItemDTO = Pick<
	ProductItem,
	"status" | "quantity" | "totalPrice" | "productId" | "priceId" | "orderId" | "cartId"
>;

export type ProductItemPaginated = {
	content: ProductItem[];
	pagination: Pagination;
};

export const findAll = async (pageNum: string = "0") => {
	try {
		const { result, pagination } = await paginationSql(pageNum, `SELECT * FROM product_item`);

		return keysToCamelCase({
			content: result as ProductItem[],
			pagination: pagination,
		}) as ProductItemPaginated;
	} catch (error) {
		throw error;
	}
};

export const findAllByCartId = async (cartId: string, pageNum: string = "0") => {
	try {
		const { result, pagination } = await paginationSql(pageNum, `SELECT * FROM product_item WHERE cart_id = ?`, [cartId]);

		return keysToCamelCase({
			content: result as ProductItem[],
			pagination: pagination,
		}) as ProductItemPaginated;
	} catch (error) {
		throw error;
	}
};

export const countAllByCartId = async (cartId: string) => {
	try {
		const result = keysToCamelCase(
			(await sql({
				query: `SELECT COUNT(*) AS item_count FROM product_item WHERE cart_id = ?`,
				values: [cartId],
			})) as any[]
		) as { itemCount: number }[];

		return result.length === 1 ? result[0].itemCount : 0;
	} catch (error) {
		throw error;
	}
};

export const findById = async (id: number) => {
	try {
		const result = keysToCamelCase(
			await sql({
				query: `SELECT * FROM product_item WHERE id = ?`,
				values: [id],
			})
		) as ProductItem[];

		return result.length === 1 ? result[0] : null;
	} catch (error) {
		throw error;
	}
};

export const findOneInCartByPriceId = async (cartId: number, priceId: number) => {
	try {
		const result = keysToCamelCase(
			await sql({
				query: `SELECT * FROM product_item WHERE cart_id = ? AND price_id = ?`,
				values: [cartId, priceId],
			})
		) as ProductItem[];

		return result.length === 1 ? result[0] : null;
	} catch (error) {
		throw error;
	}
};

export const save = async (data: ProductItemDTO) => {
	try {
		await sql({
			query: `
				INSERT INTO product_item (
					status, 
					quantity, 
					total_price, 
					product_id, 
					price_id, 
					order_id, 
					cart_id
				) VALUES (?, ?, ?, ?, ?, ?, ?)
			`,
			values: [data.status, data.quantity, data.totalPrice, data.productId, data.priceId, data.orderId, data.cartId],
		});

		const result = keysToCamelCase(
			await sql({
				query: `SELECT * FROM product_item WHERE id = LAST_INSERT_ID()`,
			})
		) as ProductItem[];

		if (result.length === 1) {
			return result[0];
		} else {
			throw createError({
				statusCode: 404,
				statusMessage: "`productItem` Not Found",
				message: "Something went wrong. Can't find created `productItem`.",
			});
		}
	} catch (error) {
		throw error;
	}
};

export const update = async (id: number, data: ProductItemDTO) => {
	try {
		await sql({
			query: `
				UPDATE product_item 
				SET 
					status = ?, 
					quantity = ?, 
					total_price = ?, 
					product_id = ?, 
					price_id = ?, 
					order_id = ?, 
					cart_id = ? 
				WHERE id = ?
			`,
			values: [data.status, data.quantity, data.totalPrice, data.productId, data.priceId, data.orderId, data.cartId, id],
		});

		return await findById(id);
	} catch (error) {
		throw error;
	}
};

export const deleteById = async (id: number) => {
	try {
		await sql({
			query: `DELETE FROM product_item WHERE id = ?`,
			values: [id],
		});

		return true;
	} catch (error) {
		throw error;
	}
};
