import { H3Event } from "h3";
import * as productModel from "../model/product";

export const findAll = async () => {
	try {
		const result = await productModel.findAll();

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

export const findById = async (event: H3Event) => {
	try {
		const result = await productModel.findById(event.context.params?.id as string);

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
			name: body.name,
			sku: body.sku,
			price: body.price,
			itemCategoryId: body.itemCategoryId,
			petCategoryId: body.petCategoryId,
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
		const body = await readBody(event);
		const result = await productModel.update(event.context.params?.id as string, {
			name: body.name,
			sku: body.sku,
			price: body.price,
			itemCategoryId: body.itemCategoryId,
			petCategoryId: body.petCategoryId,
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
		const result = await productModel.deleteById(event.context.params?.id as string);

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
