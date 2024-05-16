import * as orderModel from "../model/order";
import * as productItemModel from "../model/productItem";
import * as productModel from "../model/product";
import * as priceModel from "../model/price";
import * as priceService from "./priceService";
import { OrderProjection } from "../projections/orderProjections";
import { ProductItemProjection } from "../projections/productItemProjections";

export const getOrders = async (customerId: number, pageNum: number = 0) => {
	const orders = await orderModel.findByCustomerId(customerId, pageNum);
	const ordersProjection = await mapObjectArrayToClass(orders.content, OrderProjection);

	for (const [index, orderProjection] of ordersProjection.entries()) {
		ordersProjection[index].orderTotalPrice = orders.content[index].totalPrice;

		const productItems = await productItemModel.findAllByOrderId(orderProjection.id);
		const productItemsProjection = await mapObjectArrayToClass(productItems.content, ProductItemProjection);

		for (let [index, productItem] of productItems.content.entries()) {
			const product = await productModel.findById(productItem.productId);
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

		ordersProjection[index].orderItems = productItemsProjection;
	}

	const resultOrder = {
		content: ordersProjection,
		pagination: orders.pagination,
	};

	return resultOrder;
};
