import * as productItemModel from "../model/productItem";
import * as productModel from "../model/product";
import * as priceModel from "../model/price";
import * as cartModel from "../model/cart";
import * as priceService from "./priceService";
import { ProductItemProjection, ProductItemsPaginatedProjection } from "../projections/productItemProjections";

export const getCart = async (customerId: number) => {
	const cart = await cartModel.findOneByCustomerId(customerId);
	if (!cart) {
		throw createError({
			statusCode: 404,
			statusMessage: "Cart Not Found",
			message: "Customer may not have connected cart.",
		});
	}

	const updatedCart = await updateCartCount(cart?.id);

	return updatedCart;
};

export const getCartItems = async (cartId: number) => {
	const productItems = await productItemModel.findAllByCartId(cartId.toString());
	const productItemsProjection = await mapObjectArrayToClass(productItems.content, ProductItemProjection);

	for (let [index, productItem] of productItems.content.entries()) {
		const product = await productModel.findById(productItem.productId.toString());
		const price = await priceModel.findById(productItem.priceId);

		if (product) {
			productItemsProjection[index].name = product?.name;
			productItemsProjection[index].previewImage = product?.images[0];
		} else {
			throw createError({
				statusCode: 404,
				statusMessage: "Related `product` Not Found",
				message: "`product` related to `productItem` may not Exist.",
			});
		}

		if (price) {
			productItemsProjection[index].price = price?.value;
		} else {
			throw createError({
				statusCode: 404,
				statusMessage: "Related `price` Not Found",
				message: "`price` related to `productItem` may not Exist.",
			});
		}

		productItemsProjection[index].selection = await priceService.getPriceSelectionsVariety(productItem.priceId);
	}

	const cartItems: ProductItemsPaginatedProjection = {
		content: productItemsProjection,
		pagination: productItems.pagination,
	};

	return cartItems;
};

export const deleteCartItem = async (productItemId: number) => {
	const productItem = await productItemModel.findById(productItemId);
	if (!productItem || !productItem.cartId) {
		throw createError({
			statusCode: 404,
			statusMessage: "Product Item Not Found",
			message: "Cart item with the provided id may not exist.",
		});
	}

	const isCartItemDeleted = await productItemModel.deleteById(productItemId);
	const updatedCart = await updateCartCount(productItem.cartId);

	if (isCartItemDeleted) {
		return {
			cart: updatedCart,
		};
	} else {
		throw createError({
			statusCode: 404,
			statusMessage: "Delete Unsuccessful",
			message: "Cart item with the provided id may not exist.",
		});
	}
};

export const updateCartCount = async (cartId: number) => {
	const cart = await cartModel.findById(cartId);
	if (!cart) {
		throw createError({
			statusCode: 404,
			statusMessage: "Cart Not Found",
			message: "No cart found with the provided `cartId`.",
		});
	}

	const cartItemCount = await productItemModel.countAllByCartId(cartId);

	const updatedCart = await cartModel.update(cartId, {
		itemCount: cartItemCount,
		customerId: cart?.customerId,
	});

	return updatedCart;
};

export const updateCartCountByCustomerId = async (customerId: number) => {
	const cart = await cartModel.findOneByCustomerId(customerId);
	if (!cart) {
		throw createError({
			statusCode: 404,
			statusMessage: "Cart Not Found",
			message: "No cart found with the provided `customerId`.",
		});
	}

	const updatedCart = await updateCartCount(cart.id);

	return updatedCart;
};

export const updateCartItemQuantity = async (productItemId: number, quantity: number) => {
	const productItem = await productItemModel.findById(productItemId);
	if (!productItem) {
		throw createError({
			statusCode: 404,
			statusMessage: "Product Item Not Found",
			message: "Cart item with the provided id may not exist.",
		});
	}
	const productItemUnitPrice = await priceModel.findById(productItem.priceId);
	if (!productItemUnitPrice) {
		throw createError({
			statusCode: 404,
			statusMessage: "Price Not Found",
			message: "Cart item does not have a price.",
		});
	}

	const newTotalPrice = productItemUnitPrice?.value * quantity;
	const updatedCartItem = await productItemModel.updateQuantity(productItemId, quantity, newTotalPrice);

	return updatedCartItem;
};
