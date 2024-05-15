import { H3Event } from "h3";
import * as adminModel from "../model/admin";

export const getAdmin = async (event: H3Event) => {
	try {
		const { email, password } = getHeaders(event);

		const result = await adminModel.findOneByCredential({ email: email as string, password: password as string });

		return {
			data: result,
		};
	} catch {
		throw createError({
			statusCode: 500,
			statusMessage: "Something went wrong",
		});
	}
};
