import { H3Event } from "h3";
import * as customerModel from "../model/customer";
import * as customerService from "../services/customerService";

export const findAll = async (event: H3Event) => {
	try {
		const queryParam = getQuery(event);

		const result = await customerModel.findAll(queryParam.pageNum as number);

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

		const result = await customerService.getCustomer(queryParam.id as number, queryParam.email as string);

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
		const customerRequest: customerModel.CustomerDTO = {
			username: body.username,
			firstName: body.firstName,
			lastName: body.lastName,
			middleName: body.middleName,
			email: body.email,
			password: body.password,
			address: body.address,
			phoneNumber: body.phoneNumber,
			gender: body.gender,
			birthDate: body.birthDate,
		};

		const result = await customerService.createCustomer(customerRequest);

		return {
			data: result,
		};
	} catch (error) {
		throw error;
	}
};

export const editCustomer = async (event: H3Event) => {
	try {
		const queryParam = getQuery(event);
		const body = await readBody(event);
		const requestBody: customerModel.CustomerUpdateDTO = {
			username: body.username,
			firstName: body.firstName,
			lastName: body.lastName,
			middleName: body.middleName,
			gender: body.gender,
			birthDate: body.birthDate,
		};

		const result = await customerService.editCustomer(queryParam.id as number, requestBody);

		return {
			data: {
				statusCode: 200,
				statusMessage: "OK",
				message: "Successfully edited customer information.",
				body: result,
			},
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

		const result = await customerModel.deleteById(queryParam.id as number);

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
