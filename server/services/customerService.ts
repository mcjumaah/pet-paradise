import * as customerModel from "../model/customer";
import { CustomerProjection } from "../projections/customerProjections";

export const getCustomer = async (id?: string, email?: string) => {
	let customer: CustomerProjection | null;

	if (id && !email) {
		customer = await customerModel.findById(id);
	} else if (email && !id) {
		customer = await customerModel.findOneByEmail(email);
	} else {
		throw createError({
			statusCode: 400,
			statusMessage: "Bad Request",
		});
	}

	return mapObjectToClass(customer, CustomerProjection);
};
