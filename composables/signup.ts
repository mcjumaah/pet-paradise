export const useCheckoutItems = () => {
	return useState<{ email: string; password: string }>("signup-credentials", () => {
		return { email: "", password: "" };
	});
};

export function validateStringForEmail(email: string) {
	let pattern = /^[^\s@]+@[^\s@]+\.com$/;

	return pattern.test(email);
}
