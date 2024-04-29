import * as productItemModel from "../model/productItem";
import * as productModel from "../model/product";
import * as priceModel from "../model/price";
import * as cartModel from "../model/cart";
import * as priceService from "./priceService";
import * as productService from "./productService";
import { ProductItemProjection, ProductItemsPaginatedProjection } from "../projections/productItemProjections";

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

	const isCartItemDeleted = await productItemModel.deleteById(productItemId);

	let updatedCart: cartModel.Cart | null = null;
	if (productItem?.cartId) {
		updatedCart = await productService.updateCartCount(productItem.cartId);
	}

	if (isCartItemDeleted) {
		return {
			cart: updatedCart,
		};
	} else {
		throw createError({
			statusCode: 404,
			statusMessage: "Delete Unsuccessful",
			message: "Cart item with the provided id does not exist.",
		});
	}
};
