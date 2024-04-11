import * as productModel from "../model/product";
import * as priceModel from "../model/price";
import * as varietyModel from "../model/variety";
import * as selectionModel from "../model/selection";
import { ProductProjection, ProductsPaginationProjection } from "../projections/productProjections";
import { PriceProjection } from "../projections/priceProjections";
import { mapObjectToClass } from "../utils/entityFieldsUtil";
import * as priceService from "./priceService";

export const getProducts = async (id: string, pageNum: string = "0") => {
	let result: ProductProjection | ProductsPaginationProjection;

	if (id) {
		result = (await productModel.findById(id)) as ProductProjection;
		const priceModelArr = (await priceModel.findAllByProductId(id.toString())) as priceModel.Price[];
		result.price = priceModelArr as any[] as PriceProjection[];

		for (let [index, price] of result.price.entries()) {
			price.selection = await priceService.getPriceSelectionVariety(priceModelArr[index].varietyId);

			result.price[index] = await mapObjectToClass(price, PriceProjection);
		}
		result = await mapObjectToClass(result, ProductProjection);
	} else {
		result = (await productModel.findAll(pageNum)) as ProductsPaginationProjection;

		for (const product of result.content) {
			product.price = await priceService.getProductPriceSummary(product.id);
		}
	}

	return result;
};
