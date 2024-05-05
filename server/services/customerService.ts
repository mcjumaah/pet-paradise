import * as customerModel from "../model/customer";
import * as cartModel from "../model/cart";
import { CustomerProjection } from "../projections/customerProjections";
import { validateCustomerForm } from "../utils/customerValidation";

export const getCustomer = async (id?: number, email?: string) => {
	let customer: customerModel.Customer | null;

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
	await validateCustomerForm(customerDto);

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
	await validateIsStringEmail(email);
	const customer = await customerModel.findOneByEmail(email);

	return {
		available: customer === null,
		customer: customer ? mapObjectToClass(customer, CustomerProjection) : null,
	};
};

export const editCustomer = async (id: number, customerDto: customerModel.CustomerUpdateDTO) => {
	await validateCustomerForm(customerDto);

	if (await customerModel.findById(id)) {
		const result = await customerModel.update(id, customerDto);

		if (result) {
			return mapObjectToClass(result, CustomerProjection);
		} else {
			throw createError({
				statusCode: 404,
				statusMessage: "Customer Not Found",
				message: "No existing customer with the provided id value.",
			});
		}
	} else {
		throw createError({
			statusCode: 404,
			statusMessage: "Customer Not Found",
			message: "No existing customer with the provided id value.",
		});
	}
};
