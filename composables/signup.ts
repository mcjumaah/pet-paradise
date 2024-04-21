export const useSignupCredentials = () => {
	return useState<{ email: string; password: string }>("signup-credentials", () => {
		return { email: "", password: "" };
	});
};

export const useHasCreatedNewCustomerAccount = () => {
	return useState<boolean>("has-newly-created-customer-account", () => false);
};
