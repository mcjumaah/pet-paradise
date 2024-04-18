export const useSignupCredentials = () => {
	return useState<{ email: string; password: string }>("signup-credentials", () => {
		return { email: "test@mail.com", password: "test123" };
	});
};

export function validateStringForEmail(email: string) {
	let pattern = /^[^\s@]+@[^\s@]+\.com$/;

	return pattern.test(email);
}
