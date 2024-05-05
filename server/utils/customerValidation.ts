import * as customerModel from "../model/customer";
import { CustomerProjection } from "../projections/customerProjections";

export const validateIsCustomerFound = (customer: customerModel.Customer | null) => {
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

export interface PasswordValidation {
	isStrong: boolean;
	breakdown: {
		hasLowerCase: boolean;
		hasUpperCase: boolean;
		hasDigit: boolean;
		hasSpecialChar: boolean;
		hasMinLength: boolean;
	};
}
export const validatePassword = (potentialPassword: string) => {
	const breakdown = {
		hasLowerCase: /[a-z]/.test(potentialPassword),
		hasUpperCase: /[A-Z]/.test(potentialPassword),
		hasDigit: /\d/.test(potentialPassword),
		hasSpecialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(potentialPassword),
		hasMinLength: potentialPassword.length >= 8,
	};

	return {
		isStrong:
			breakdown.hasLowerCase &&
			breakdown.hasUpperCase &&
			breakdown.hasDigit &&
			breakdown.hasSpecialChar &&
			breakdown.hasMinLength,
		breakdown,
	} as PasswordValidation;
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
