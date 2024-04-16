import * as productModel from "../model/product";
import * as priceModel from "../model/price";
import * as priceService from "./priceService";
import {
	ProductProjection,
	ProductSummaryProjection,
	ProductsPaginationProjection,
} from "../projections/productProjections";
import { PriceProjection } from "../projections/priceProjections";
import { mapObjectToClass } from "../utils/entityFieldsUtil";

export const getProducts = async (pageNum: string = "0") => {
	const result = (await productModel.findAll(pageNum)) as ProductsPaginationProjection;

	for (const [index, product] of result.content.entries()) {
		product.price = await priceService.getProductPriceSummary(product.id);

		result.content[index] = await mapObjectToClass(product, ProductSummaryProjection);
	}

	return result;
};

export const getProduct = async (id: string) => {
	let result = (await productModel.findById(id)) as ProductProjection;
	const priceModelArr = (await priceModel.findAllByProductId(id.toString())) as priceModel.Price[];
	result.price = priceModelArr as any[] as PriceProjection[];

	for (let [index, price] of result.price.entries()) {
		price.selection = await priceService.getPriceSelectionVariety(priceModelArr[index].varietyId);

		result.price[index] = await mapObjectToClass(price, PriceProjection);
	}

	result = await mapObjectToClass(result, ProductProjection);

	return result;
};
