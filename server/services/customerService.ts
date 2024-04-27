import * as customerModel from "../model/customer";
import * as cartModel from "../model/cart";
import { CustomerProjection } from "../projections/customerProjections";

export const getCustomer = async (id?: string, email?: string) => {
	let customer: CustomerProjection | null;

	if (id || email) {
		customer = await customerModel.findOneByIdAndEmail(id, email);
	} else {
		throw createError({
			statusCode: 400,
			statusMessage: "Bad Request",
			message: "Please double-check supplied parameters.",
		});
	}

	return validateIsCustomerFound(customer);
};

export const createCustomer = async (customerDto: customerModel.CustomerDTO) => {
	const notRequiredField = ["middleName"];

	for (const key in customerDto) {
		if (
			customerDto.hasOwnProperty(key) &&
			customerDto[key as keyof typeof customerDto].trim() === "" &&
			!notRequiredField.includes(key)
		) {
			throw createError({
				statusCode: 400,
				statusMessage: `Incomplete Request Form`,
				message: `Missing value for \`${key}\` field.`,
			});
		} else if (key === "email") {
			validateIsStringEmail(customerDto[key]);
		} else if (key === "password") {
			const passwordValidation = validatePassword(customerDto[key]);
			if (!passwordValidation.isStrong) {
				throw createError({
					statusCode: 400,
					statusMessage: `Weak Password`,
					message: `Supplied password is weak.`,
				});
			}
		} else if (key === "phoneNumber") {
			validateIsStringPhoneNumber(customerDto[key]);
		}
	}

	const createdCustomer = await validateIsCustomerFound(await customerModel.save(customerDto));
	const cart = await cartModel.save({ itemCount: 0, customerId: createdCustomer.id });
	if (!cart) {
		throw createError({
			statusCode: 404,
			statusMessage: "Cart Not Found",
			message: "Something went wrong when assigning cart for created customer.",
		});
	}

	return createdCustomer;
};

export const validateNewEmail = async (email: string) => {
	let customer: CustomerProjection | null;

	validateIsStringEmail(email);
	customer = await customerModel.findOneByEmail(email);

	return {
		available: customer === null,
		customer: customer ?? null,
	};
};
