import camelcaseKeys from "camelcase-keys";

export const keysToCamelCase = (input: any) => {
	const options = {
		deep: true,
	};

	return camelcaseKeys(input, options);
};

export async function mapObjectToClass<T>(obj: any, classConstructor: { new (...args: any[]): T }): Promise<T> {
	let instance = new classConstructor();

	for (let key in instance) {
		if (obj.hasOwnProperty(key)) {
			instance[key] = await obj[key];
		}
	}

	return instance;
}
