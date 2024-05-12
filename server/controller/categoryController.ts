import { H3Event } from "h3";
import * as itemCategoryModel from "../model/itemCategory";
import * as petCategoryModel from "../model/petCategory";

export const getItemTypes = async (event: H3Event) => {
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

export const getPetTypes = async (event: H3Event) => {
	try {
		const { pageNum, search } = getQuery(event);

		const result = await petCategoryModel.findAll(pageNum as number, search as string);

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
