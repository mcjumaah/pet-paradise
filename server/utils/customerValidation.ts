import { CustomerProjection } from "../projections/customerProjections";

export const validateIsCustomerFound = (customer: CustomerProjection | null) => {
	if (customer) {
		return mapObjectToClass(customer, CustomerProjection);
	} else {
		throw createError({
			statusCode: 404,
			statusMessage: "Customer Not Found",
		});
	}
};

export const validateIsStringEmail = (potentialEmail: string) => {
	let pattern = /^[^\s@]+@[^\s@]+\.com$/;

	if (!pattern.test(potentialEmail)) {
		throw createError({
			statusCode: 400,
			statusMessage: `Invalid email`,
			message: "Please input a valid email address.",
		});
	}
};

export const validateIsStringPhoneNumber = (potentialPhoneNum: string) => {
	if (potentialPhoneNum.length === 11) {
		const prefix = potentialPhoneNum.substring(0, 2);
		if (prefix === "09") {
			return;
		}
	}

	throw createError({
		statusCode: 400,
		statusMessage: `Invalid phoneNumber`,
		message: "Please input a valid phone number.",
	});
};
