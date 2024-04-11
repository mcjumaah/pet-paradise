import * as productModel from "../model/product";
import * as priceModel from "../model/price";
import * as varietyModel from "../model/variety";
import * as selectionModel from "../model/selection";
import { ProductProjection, ProductsPaginationProjection } from "../projections/productProjections";
import { PriceProjection } from "../projections/priceProjections";
import { mapObjectToClass } from "../utils/entityFieldsUtil";

async function getProductPrice(productId: number) {
	const priceArr = (await priceModel.findAllByProductId(productId.toString())) as priceModel.Price[];
	let priceValueArr: number[] = [];

	if (priceArr) {
		priceArr.forEach((price) => {
			if (price.value) {
				priceValueArr.push(price.value);
			}
		});
	}

	return priceValueArr.length > 0
		? {
				min: Math.min(...priceValueArr),
				max: Math.max(...priceValueArr),
		  }
		: null;
}

export const getProducts = async (id: string, pageNum: string = "0") => {
	let result: ProductProjection | ProductsPaginationProjection;

	if (id) {
		result = (await productModel.findById(id)) as ProductProjection;
		const priceModelArr = (await priceModel.findAllByProductId(id.toString())) as priceModel.Price[];
		result.price = priceModelArr as any[] as PriceProjection[];

		for (let [index, price] of result.price.entries()) {
			const variety = (await varietyModel.findById(priceModelArr[index].varietyId.toString())) as varietyModel.Variety;
			const selection = (await selectionModel.findById(variety.selectionId.toString())) as selectionModel.ProductSelection;
			price.selection = {
				name: selection.name,
				variety: variety.name,
			};

			result.price[index] = await mapObjectToClass(price, PriceProjection);
		}
		result = await mapObjectToClass(result, ProductProjection);
	} else {
		result = (await productModel.findAll(pageNum)) as ProductsPaginationProjection;

		for (const product of result.content) {
			product.price = await getProductPrice(product.id);
		}
	}

	return result;
};
