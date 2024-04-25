import * as productModel from "../model/product";
import * as priceModel from "../model/price";
import * as selectionModel from "../model/selection";
import * as varietyModel from "../model/variety";
import * as descriptionModel from "../model/description";
import * as productItemModel from "../model/productItem";
import * as priceService from "./priceService";
import {
	ProductProjection,
	ProductSummaryProjection,
	ProductsPaginationProjection,
} from "../projections/productProjections";
import { PriceProjection } from "../projections/priceProjections";
import { SelectionProjection } from "../projections/selectionProjection";
import { DescriptionProjection } from "../projections/descriptionProjection";
import { CustomerDTO } from "../model/customer";

export const getProducts = async (pageNum: string = "0") => {
	const result = (await productModel.findAll(pageNum)) as ProductsPaginationProjection;

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

	const selectedVarietyPrice = await priceModel.findById(productItemDto.priceId.toString());
	if (selectedVarietyPrice) {
		productItemDto.totalPrice = selectedVarietyPrice?.value * productItemDto.quantity;
	} else {
		throw createError({
			statusCode: 404,
			statusMessage: "`price` Not Found",
			message: "Supplied `priceId` does not exist.",
		});
	}

	const result = await productItemModel.save(productItemDto);

	return result;
};
