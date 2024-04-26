import * as productItemModel from "../model/productItem";
import * as productModel from "../model/product";
import * as priceModel from "../model/price";
import * as priceService from "./priceService";
import { ProductItemProjection, ProductItemsPaginatedInterface } from "../projections/productItemProjections";

export const getCartItems = async (cartId: number) => {
	const productItems = await productItemModel.findAllByCartId(cartId.toString());
	const productItemsProjection = await mapObjectArrayToClass(productItems.content, ProductItemProjection);

	console.log(productItems);

	for (let [index, productItem] of productItems.content.entries()) {
		const product = await productModel.findById(productItem.productId.toString());
		const price = await priceModel.findById(productItem.priceId.toString());

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

	const cartItems: ProductItemsPaginatedInterface = {
		content: productItemsProjection,
		pagination: productItems.pagination,
	};

	return cartItems;
};
