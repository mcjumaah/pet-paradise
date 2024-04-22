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

export const getPriceSelectionsVariety = async (priceId: number) => {
	const varieties = await varietyModel.findAllByPriceId(priceId.toString());

	const formattedVarieties = await Promise.all(
		varieties.map(async (variety) => {
			const selection = await selectionModel.findById(variety.selectionId.toString());

			if (selection) {
				return { name: selection.name, variety: variety.name };
			}
		})
	);

	return formattedVarieties.filter((item) => typeof item !== "undefined") as { name: string; variety: string }[];
};
