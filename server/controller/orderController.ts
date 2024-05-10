import { H3Event } from "h3";
import * as orderService from "../services/orderService";

export const getOrders = async (event: H3Event) => {
	try {
		const { customerId, pageNum } = getQuery(event);

		const result = await orderService.getOrders(customerId as number, pageNum as number);

		return {
			data: result,
		};
	} catch {
		throw createError({
			statusCode: 500,
			statusMessage: "Something went wrong",
		});
	}
};
