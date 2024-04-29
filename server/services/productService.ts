import * as productModel from "../model/product";
import * as priceModel from "../model/price";
import * as selectionModel from "../model/selection";
import * as varietyModel from "../model/variety";
import * as descriptionModel from "../model/description";
import * as productItemModel from "../model/productItem";
import * as priceService from "./priceService";
import * as cartService from "./cartService";
import { ProductProjection, ProductSummaryProjection, ProductsPaginatedProjection } from "../projections/productProjections";
import { PriceProjection } from "../projections/priceProjections";
import { SelectionProjection } from "../projections/selectionProjection";
import { DescriptionProjection } from "../projections/descriptionProjection";

export const getProducts = async (pageNum: string = "0") => {
	const result = (await productModel.findAll(pageNum)) as ProductsPaginatedProjection;

	for (const [index, product] of result.content.entries()) {
		product.price = await priceService.getProductPriceSummary(product.id);

		result.content[index] = await mapObjectToClass(product, ProductSummaryProjection);
	}

	return result;
};

export const getProduct = async (id: string) => {
	let result = (await productModel.findById(id)) as any as ProductProjection;
	const priceModelArr = await priceModel.findAllByProductId(id.toString());
	if (priceModelArr.length <= 0) {
		throw createError({
			statusCode: 404,
			statusMessage: "`prices` Field Not Found",
			message: "Product missing values for `prices` field.",
		});
	}

	const selectionModelArr = await selectionModel.findAllByProductId(id.toString());

	if (result) {
		// For `prices` field
		result.prices = priceModelArr as any[] as PriceProjection[];

		for (let [index, price] of result.prices.entries()) {
			price.selections = await priceService.getPriceSelectionsVariety(priceModelArr[index].id);

			result.prices[index] = await mapObjectToClass(price, PriceProjection);
		}

		// For `selections` field
		result.selections = selectionModelArr as any[] as SelectionProjection[];

		for (let [index, selection] of result.selections.entries()) {
			selection.varieties = (await varietyModel.findAllBySelectionId(selectionModelArr[index].id.toString())).map(
				(variety) => variety.name
			);

			result.selections[index] = await mapObjectToClass(selection, SelectionProjection);
		}

		const description = await descriptionModel.findOneByProductId(id);
		if (!description) {
			throw createError({
				statusCode: 404,
				statusMessage: "`description` Field Not Found",
				message: "Product missing values for `description` field.",
			});
		}
		result.description = await mapObjectToClass(description, DescriptionProjection);

		// Finishing Touches
		result = await mapObjectToClass(result, ProductProjection);
	}

	return result;
};

export const addToCart = async (requestBody: { productId: number; priceId: number; quantity: number; cartId: number }) => {
	const productItemDto: productItemModel.ProductItemDTO = {
		status: "ON_CART",
		quantity: requestBody.quantity,
		totalPrice: 0,
		productId: requestBody.productId,
		priceId: requestBody.priceId,
		orderId: null,
		cartId: requestBody.cartId,
	};

	if (!productItemDto.cartId) {
		throw createError({
			statusCode: 422,
			statusMessage: "Unprocessable Entity",
			message: "Request payload object doesn't have value for `cartId`",
		});
	}

	// Set `totalPrice`
	const selectedVarietyPrice = await priceModel.findById(productItemDto.priceId);
	if (selectedVarietyPrice) {
		productItemDto.totalPrice = selectedVarietyPrice?.value * productItemDto.quantity;
	} else {
		throw createError({
			statusCode: 404,
			statusMessage: "`price` Not Found",
			message: "Supplied `priceId` does not exist.",
		});
	}

	const similarProductItemInCart = await productItemModel.findOneInCartByPriceId(
		productItemDto.cartId,
		productItemDto.priceId
	);

	let savedProductItem: productItemModel.ProductItem | null = null;
	if (similarProductItemInCart) {
		productItemDto.quantity = productItemDto.quantity + similarProductItemInCart.quantity;
		productItemDto.totalPrice = productItemDto.totalPrice + similarProductItemInCart.totalPrice;
		savedProductItem = await productItemModel.update(similarProductItemInCart.id, productItemDto);
	} else {
		savedProductItem = await productItemModel.save(productItemDto);
	}

	const updatedCart = await cartService.updateCartCount(productItemDto.cartId);

	return { productItem: savedProductItem, cart: updatedCart ? updatedCart : null };
};
