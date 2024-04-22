import { H3Event } from "h3";
import * as customerModel from "../model/customer";
import * as customerService from "../services/customerService";
import { CustomerProjection } from "../projections/customerProjections";

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

export const getCustomer = async (event: H3Event) => {
	try {
		const queryParam = getQuery(event);

		const result = await customerService.getCustomer(queryParam.id as string, queryParam.email as string);

		return {
			data: result,
		};
	} catch (error) {
		throw error;
	}
};

export const createCustomer = async (event: H3Event) => {
	try {
		const body = await readBody(event);
		const customerRequest = {
			firstName: body.firstName,
			lastName: body.lastName,
			middleName: body.middleName,
			email: body.email,
			password: body.password,
			address: body.address,
			phoneNumber: body.phoneNumber,
		};

		const result = await customerService.createCustomer(customerRequest);

		return {
			data: result,
		};
	} catch (error) {
		throw error;
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

export const deleteOne = async (event: H3Event) => {
	try {
		const queryParam = getQuery(event);

		const result = await customerModel.deleteById(queryParam.id as string);

		if (result) {
			return {
				data: {
					statusCode: 204,
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

export const validateNewEmail = async (event: H3Event) => {
	try {
		const queryParam = getQuery(event);

		const result = await customerService.validateNewEmail(queryParam.email as string);

		return {
			data: result,
		};
	} catch (error) {
		throw error;
	}
};

export const validateNewPassword = async (event: H3Event) => {
	try {
		const queryParam = getQuery(event);

		const result = validatePassword(queryParam.password as string);

		return {
			data: result,
		};
	} catch (error) {
		throw error;
	}
};
