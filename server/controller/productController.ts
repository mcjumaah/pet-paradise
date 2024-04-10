import { H3Event } from "h3";
import * as productModel from "../model/product";
import { getProducts } from "../services/productService";

export interface ProductProjection {
	id: number;
	sku: string;
	name: string;
	price: {
		min: number;
		max: number;
	} | null;
	stock: number;
	images: string[];
	soldNum: number;
	cartId: number;
}
export interface ProductsPaginationProjection {
	content: ProductProjection[];
	pagination: Object;
}

export const find = async (event: H3Event) => {
	try {
		const queryParam = getQuery(event);

		const result = await getProducts(queryParam.id as string, queryParam.pageNum as number);

		return {
			data: result,
		};
	} catch {
		throw createError({
			statusCode: 500,
			statusMessage: "Something went wrong",
		});
	}
};

export const save = async (event: H3Event) => {
	try {
		const body = await readBody(event);

		const result = await productModel.save({
			sku: body.sku,
			name: body.name,
			stock: body.stock || 0,
			images: body.images || null,
			soldNum: body.soldNum || 0,
		});

		return {
			data: result,
		};
	} catch {
		throw createError({
			statusCode: 500,
			statusMessage: "Something went wrong",
		});
	}
};

export const update = async (event: H3Event) => {
	try {
		const queryParam = getQuery(event);
		const body = await readBody(event);

		const result = await productModel.update(queryParam.id as string, {
			sku: body.sku,
			name: body.name,
			stock: body.stock,
			images: body.images,
			soldNum: body.soldNum,
		});

		return {
			data: result,
		};
	} catch {
		throw createError({
			statusCode: 500,
			statusMessage: "Something went wrong",
		});
	}
};

export const deleteById = async (event: H3Event) => {
	try {
		const body = await readBody(event);
		const queryParam = getQuery(event);

		const result = await productModel.deleteById(queryParam.id as string);

		if (result) {
			return {
				data: {
					code: 204,
					message: "Successfully deleted",
				},
			};
		} else {
			return {
				data: result,
			};
		}
	} catch {
		throw createError({
			statusCode: 500,
			statusMessage: "Something went wrong",
		});
	}
};
