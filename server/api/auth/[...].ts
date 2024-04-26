import { NuxtAuthHandler } from "#auth";
import CredentialsProvider from "next-auth/providers/credentials";
import * as customerModel from "../../model/customer";
import { CustomerProjection } from "~/server/projections/customerProjections";

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
					const formattedUser = await mapObjectToClass(user, CustomerProjection);
					console.log(formattedUser);
					return {
						name: `${formattedUser.firstName} ${
							formattedUser.middleName ? formattedUser.middleName.charAt(0).toUpperCase() + "." : ""
						} ${formattedUser.lastName}`,
						email: formattedUser.email,
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
