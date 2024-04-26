import { NuxtAuthHandler } from "#auth";
import CredentialsProvider from "next-auth/providers/credentials";
import * as customerModel from "../../model/customer";

export default NuxtAuthHandler({
	pages: {
		signIn: "/login",
	},
	providers: [
		// @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
		CredentialsProvider.default({
			name: "Credentials",
			async authorize(credentials: any) {
				const user = await customerModel.findOneByCredential({
					email: credentials?.email,
					password: credentials?.password,
				});

				if (user) {
					return {
						name: `${user.firstName} ${user.middleName ? user.middleName.charAt(0).toUpperCase() + "." : ""} ${
							user.lastName
						}`,
						email: user.email,
					};
				} else {
					throw createError({
						statusCode: 401,
						statusMessage: "Invalid credentials provided",
					});
				}
			},
		}),
	],
});
