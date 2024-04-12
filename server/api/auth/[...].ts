// file: ~/server/api/auth/[...].ts
import { NuxtAuthHandler } from "#auth";
import CredentialsProvider from "next-auth/providers/credentials";
import * as customerModel from "../../model/costumer";

export default NuxtAuthHandler({
	pages: {
		signIn: "/login",
	},
	providers: [
		// @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
		CredentialsProvider.default({
			name: "Credentials",
			async authorize(credentials: any) {
				const result = (await customerModel.findOneByCredential({
					email: credentials?.email,
					password: credentials?.password,
				})) as customerModel.Customer;

				if (result.id) {
					return result;
				} else {
					return { error: "Sign in failed. Check the details you provided are correct" };
				}
			},
		}),
	],
});
