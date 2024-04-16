import { H3Event } from "h3";
import * as customerModel from "../model/costumer";

export const findAll = async (event: H3Event) => {
	try {
		const queryParam = getQuery(event);

		const result = await customerModel.findAll(queryParam.pageNum as string);

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

export const save = async (event: H3Event) => {
	try {
		const body = await readBody(event);

		const result = await customerModel.save({
			firstName: body.firstName,
			lastName: body.lastName,
			middleName: body.middleName,
			email: body.email,
			password: body.password,
			address: body.address,
			phoneNumber: body.phoneNumber,
		});

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

export const update = async (event: H3Event) => {
	try {
		const queryParam = getQuery(event);
		const body = await readBody(event);

		const result = await customerModel.update(queryParam.id as string, {
			firstName: body.firstName,
			lastName: body.lastName,
			middleName: body.middleName,
			email: body.email,
			password: body.password,
			address: body.address,
			phoneNumber: body.phoneNumber,
		});

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

export const deleteById = async (event: H3Event) => {
	try {
		const queryParam = getQuery(event);

		const result = await customerModel.deleteById(queryParam.id as string);

		if (result) {
			return {
				data: {
					code: 204,
					message: "Successfully deleted Customer",
				},
			};
		} else {
			return {
				data: result,
			};
		}
	} catch {
		throw createError({
			statusCode: 500,
			statusMessage: "Something went wrong",
		});
	}
};
