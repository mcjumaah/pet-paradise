import { H3Event } from "h3";
import * as cartModel from "../model/cart";

export const getCarts = async (event: H3Event) => {
	try {
		const queryParam = getQuery(event);

		const result = await cartModel.findAll(queryParam.pageNum as string);

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

export const getCart = async (event: H3Event) => {
	try {
		const queryParam = getQuery(event);

		const result = await cartModel.findById(queryParam.id as string);

		return {
			data: result,
		};
	} catch (error) {
		throw error;
	}
};

export const createCart = async (event: H3Event) => {
	try {
		const body = await readBody(event);
		const cartRequest = {
			itemCount: body.itemCount,
			customerId: body.customerId,
		};

		const result = await cartModel.save(cartRequest);

		return {
			data: result,
		};
	} catch (error) {
		throw error;
	}
};

export const editCart = async (event: H3Event) => {
	try {
		const queryParam = getQuery(event);
		const body = await readBody(event);
		const cartRequest = {
			itemCount: body.itemCount,
			customerId: body.customerId,
		};

		const result = await cartModel.update(queryParam.id as string, cartRequest);

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

export const deleteCart = async (event: H3Event) => {
	try {
		const queryParam = getQuery(event);

		const result = await cartModel.deleteById(queryParam.id as string);

		if (result) {
			return {
				data: {
					statusCode: 204,
					message: "Successfully deleted Customer",
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
