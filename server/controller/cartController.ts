import { H3Event } from "h3";
import * as cartModel from "../model/cart";
import * as cartService from "../services/cartService";

export const getCarts = async (event: H3Event) => {
	try {
		const queryParam = getQuery(event);

		const result = await cartModel.findAll(queryParam.pageNum as number);

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

		const result = await cartService.getCart(queryParam.customerId as number);

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

		const result = await cartService.deleteCartItem(queryParam.productItemId as number);

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

export const updateCartItemQuantity = async (event: H3Event) => {
	try {
		const body = await readBody(event);
		const cartItemRequest = {
			productItemId: body.cartItemId as number,
			quantity: body.quantity as number,
		};

		const result = await cartService.updateCartItemQuantity(cartItemRequest.productItemId, cartItemRequest.quantity);

		return {
			data: {
				statusCode: 200,
				statusMessage: "Successfully Updated Quantity",
				message: "Successfully updated cart item's quantity.",
				body: result,
			},
		};
	} catch (error) {
		throw error;
	}
};
