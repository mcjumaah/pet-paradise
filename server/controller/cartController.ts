import { H3Event } from "h3";
import * as cartModel from "../model/cart";
import * as cartService from "../services/cartService";

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

		const result = await cartModel.findOneByCustomerId(queryParam.customerId as string);

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

		const result = await cartModel.update(queryParam.id as number, cartRequest);

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

		const result = await cartModel.deleteById(queryParam.id as number);

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

export const getCartItems = async (event: H3Event) => {
	try {
		const queryParam = getQuery(event);

		const result = await cartService.getCartItems(queryParam.cartId as number);

		return {
			data: result,
		};
	} catch (error) {
		throw error;
	}
};

export const deleteCartItem = async (event: H3Event) => {
	try {
		const queryParam = getQuery(event);

		const result = await cartService.deleteCartItem(queryParam.id as number);

		return {
			statusCode: 200,
			statusMessage: "Successfully Deleted",
			message: "Successfully deleted cart item.",
			data: result,
		};
	} catch (error) {
		throw error;
	}
};
