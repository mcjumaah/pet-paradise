import { H3Event } from "h3";
import * as itemCategoryModel from "../model/itemCategory";

export const getCategories = async (event: H3Event) => {
	try {
		const { pageNum, search } = getQuery(event);

		const result = await itemCategoryModel.findAll(pageNum as number, search as string);

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
