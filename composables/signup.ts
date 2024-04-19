export const useSignupCredentials = () => {
	return useState<{ email: string; password: string }>("signup-credentials", () => {
		return { email: "test@mail.com", password: "StrongPass123!" };
	});
};
