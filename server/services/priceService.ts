import * as priceModel from "../model/price";
import * as varietyModel from "../model/variety";
import * as selectionModel from "../model/selection";

export const getProductPriceSummary = async (productId: number) => {
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
};

export const getPriceSelectionVariety = async (varietyId: number) => {
	const variety = (await varietyModel.findById(varietyId.toString())) as varietyModel.Variety;
	const selection = (await selectionModel.findById(variety.selectionId.toString())) as selectionModel.ProductSelection;

	return {
		name: selection.name,
		variety: variety.name,
	};
};
