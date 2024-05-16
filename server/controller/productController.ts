import { H3Event } from "h3";
import * as productModel from "../model/product";
import * as orderModel from "../model/order";
import * as productService from "../services/productService";

export const getProducts = async (event: H3Event) => {
	try {
		const { pet, item, pageNum, search } = getQuery(event);

		const result = await productService.getProducts(pageNum as number, search as string, pet as number, item as number);

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

export const getProduct = async (event: H3Event) => {
	try {
		const queryParam = getQuery(event);

		const result = await productService.getProduct(queryParam.id as number);

		return {
			data: result,
		};
	} catch (error) {
		throw error;
	}
};

export const createProduct = async (event: H3Event) => {
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

export const editProduct = async (event: H3Event) => {
	try {
		const queryParam = getQuery(event);
		const body = await readBody(event);

		const result = await productModel.update(queryParam.id as number, {
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

export const deleteProduct = async (event: H3Event) => {
	try {
		const { id } = getQuery(event);

		const result = await productModel.deleteById(id as number);

		if (result) {
			return {
				data: {
					code: 200,
					statusMessage: "OK",
					message: "Successfully deleted Product",
					body: result,
				},
			};
		} else {
			throw createError({
				statusCode: 500,
				statusMessage: "Something went wrong",
			});
		}
	} catch (error) {
		throw createError({
			statusCode: 500,
			statusMessage: "Something went wrong",
			message: error as string,
		});
	}
};

export const addToCart = async (event: H3Event) => {
	try {
		const body = await readBody(event);
		const requestBody = {
			productId: body.productId,
			priceId: body.priceId,
			quantity: body.quantity,
			cartId: body.cartId,
		};

		const result = await productService.addToCart(requestBody);

		return {
			data: {
				statusCode: 200,
				statusMessage: "OK",
				message: "Successfully added to cart.",
				body: result,
			},
		};
	} catch (error) {
		throw error;
	}
};

export const orderCheckout = async (event: H3Event) => {
	try {
		const body = await readBody(event);
		const requestBody: orderModel.OrderCheckoutDTO = {
			productItemsId: body.productItemsId,
			paymentMethod: body.paymentMethod,
			address: body.address,
			zipCode: body.zipCode,
			country: body.country,
			customerId: body.customerId,
		};

		const result = await productService.orderCheckout(requestBody);

		return {
			data: {
				statusCode: 200,
				statusMessage: "OK",
				message: "Successfully ordered.",
				body: result,
			},
		};
	} catch (error) {
		throw error;
	}
};
