import camelcaseKeys from "camelcase-keys";

export type Prettify<T> = {
	[K in keyof T]: T[K];
} & {};

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

export async function mapObjectArrayToClass<T>(objArr: any[], classConstructor: { new (...args: any[]): T }): Promise<T[]> {
	let resultArr: T[] = [];

	for (let obj of objArr) {
		resultArr.push(await mapObjectToClass(obj, classConstructor));
	}

	return resultArr;
}
