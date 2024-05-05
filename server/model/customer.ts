import { sql } from "../db";
import { keysToCamelCase } from "../utils/entityFieldsUtil";
import { paginationSql } from "../utils/paginationUtil";

export type Gender = "MALE" | "FEMALE" | "OTHER";

export type Customer = {
	id: number;
	username: string;
	firstName: string;
	lastName: string;
	middleName?: string;
	email: string;
	password: string;
	address: string;
	phoneNumber: string;
	gender: Gender;
	birthDate: string;
};

export type CustomerDTO = Pick<
	Customer,
	| "username"
	| "firstName"
	| "lastName"
	| "middleName"
	| "email"
	| "password"
	| "address"
	| "phoneNumber"
	| "gender"
	| "birthDate"
>;

export type CustomerUpdateDTO = Omit<CustomerDTO, "email" | "password">;

export const findAll = async (pageNum: number = 0) => {
	try {
		const { result, pagination } = await paginationSql(pageNum, `SELECT * FROM customer`);

		return keysToCamelCase({
			content: result as Customer[],
			pagination: pagination,
		});
	} catch (error) {
		throw error;
	}
};

export const findById = async (id: number) => {
	try {
		const result = keysToCamelCase(
			await sql({
				query: `SELECT * FROM customer WHERE id = ?`,
				values: [id],
			})
		) as Customer[];

		return result.length === 1 ? result[0] : null;
	} catch (error) {
		throw error;
	}
};

export const findOneByEmail = async (email: string) => {
	try {
		const result = keysToCamelCase(
			await sql({
				query: `SELECT * FROM customer WHERE email = ?`,
				values: [email],
			})
		) as Customer[];

		return result.length === 1 ? result[0] : null;
	} catch (error) {
		throw error;
	}
};

export const findOneByIdAndEmail = async (id: number | null = null, email: string | null = null) => {
	try {
		const result = keysToCamelCase(
			await sql({
				query: `
					SELECT * FROM customer 
					WHERE 
						(? IS NULL OR id = ?) 
						AND (? IS NULL OR email = ?)
				`,
				values: [id, id, email, email],
			})
		) as Customer[];

		return result.length === 1 ? result[0] : null;
	} catch (error) {
		throw error;
	}
};

export const findOneByCredential = async (data: Pick<Customer, "email" | "password">) => {
	try {
		const result = keysToCamelCase(
			await sql({
				query: `SELECT * FROM customer WHERE email = ? AND password = ?`,
				values: [data.email, data.password],
			})
		) as Customer[];

		return result.length === 1 ? result[0] : null;
	} catch (error) {
		throw error;
	}
};

export const save = async (data: CustomerDTO) => {
	try {
		await sql({
			query: `
				INSERT INTO customer (
					username, 
					first_name, 
					last_name, 
					middle_name, 
					email, 
					password, 
					address, 
					phone_number, 
					gender, 
					birth_date
				) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
			`,
			values: [
				data.username,
				data.firstName,
				data.lastName,
				data.middleName,
				data.email,
				data.password,
				data.address,
				data.phoneNumber,
				data.gender,
				data.birthDate,
			],
		});

		const result = keysToCamelCase(
			await sql({
				query: `SELECT * FROM customer WHERE id = LAST_INSERT_ID()`,
			})
		) as Customer[];

		return result.length === 1 ? result[0] : null;
	} catch (error) {
		throw error;
	}
};

export const update = async (id: number, data: Omit<CustomerDTO, "email" | "password">) => {
	try {
		await sql({
			query: `
				UPDATE customer 
				SET 
					username = ?, 
					first_name = ?, 
					last_name = ?, 
					middle_name = ?, 
					address = ?, 
					phone_number = ?, 
					gender = ?, 
					birth_date = ? 
				WHERE id = ?
			`,
			values: [
				data.username,
				data.firstName,
				data.lastName,
				data.middleName,
				data.address,
				data.phoneNumber,
				data.gender,
				data.birthDate,
				id,
			],
		});

		return await findById(id);
	} catch (error) {
		throw error;
	}
};

export const deleteById = async (id: number) => {
	try {
		await sql({
			query: `DELETE FROM customer WHERE id = ?`,
			values: [id],
		});

		return true;
	} catch (error) {
		throw error;
	}
};
