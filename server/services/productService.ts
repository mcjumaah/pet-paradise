import * as productModel from "../model/product";
import * as priceModel from "../model/price";
import { ProductSummaryProjection, ProductsPaginationProjection } from "../projections/productProjections";

async function getProductPrice(productId: number) {
	const priceArr = (await priceModel.findAllByProductId(productId.toString())) as priceModel.Price[];
	console.log("priceArr", priceArr);
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
	let result: ProductSummaryProjection | ProductsPaginationProjection;

	if (id) {
		result = (await productModel.findById(id)) as ProductSummaryProjection;
		result.price = await getProductPrice(parseInt(id));
	} else {
		result = (await productModel.findAll(pageNum)) as ProductsPaginationProjection;

		for (const product of result.content) {
			product.price = await getProductPrice(product.id);
		}

		console.log("result.content[0].price: ", result.content[0].price);
	}

	return result;
};
