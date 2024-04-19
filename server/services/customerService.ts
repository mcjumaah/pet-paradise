import * as customerModel from "../model/customer";
import { CustomerProjection } from "../projections/customerProjections";

export const getCustomer = async (id?: string, email?: string) => {
	let customer: CustomerProjection | null;

	if (id && !email) {
		customer = await customerModel.findById(id);
	} else if (email && !id) {
		validateIsStringEmail(email);
		customer = await customerModel.findOneByEmail(email);
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
				statusMessage: `Missing value for ${key}.`,
			});
		} else if (key === "email") {
			validateIsStringEmail(customerDto["email"]);
		} else if (key === "phoneNumber") {
			validateIsStringPhoneNumber(customerDto["phoneNumber"]);
		}
	}

	customerModel.save(customerDto);
};
