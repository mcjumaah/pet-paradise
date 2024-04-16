import { sql } from "../db";
import { keysToCamelCase } from "../utils/entityFieldsUtil";
import { PaginationSql, paginationSql } from "../utils/paginationUtil";

export type Customer = {
	id: number;
	firstName: string;
	lastName: string;
	middleName: string;
	email: string;
	password: string;
	address: string;
	phoneNumber: string;
};

export const findAll = async (pageNum: string = "0") => {
	try {
		const { result, pagination } = await paginationSql(pageNum, `SELECT * FROM customer`);

		return keysToCamelCase({
			content: result as Customer[],
			pagination: pagination,
		});
	} catch (error) {
		return error;
	}
};

export const findById = async (id: string) => {
	try {
		const result = keysToCamelCase(
			await sql({
				query: `SELECT * FROM customer WHERE id = ?`,
				values: [id],
			})
		) as Customer[];

		return result.length === 1 ? result[0] : null;
	} catch (error) {
		return error;
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
		return error;
	}
};

export const findOneByEmail = async (data: Pick<Customer, "email">) => {
	try {
		const result = keysToCamelCase(
			await sql({
				query: `SELECT * FROM customer WHERE email = ?`,
				values: [data.email],
			})
		) as Customer[];

		return result.length === 1 ? result[0] : null;
	} catch (error) {
		return error;
	}
};

export const save = async (
	data: Pick<Customer, "firstName" | "lastName" | "middleName" | "email" | "password" | "address" | "phoneNumber">
) => {
	try {
		await sql({
			query: `
				INSERT INTO customer (
					first_name, 
					last_name, 
					middle_name, 
					email, 
					password, 
					address, 
					phone_number
				) VALUES (?, ?, ?, ?, ?, ?, ?)
			`,
			values: [data.firstName, data.lastName, data.middleName, data.email, data.password, data.address, data.phoneNumber],
		});

		const result = keysToCamelCase(
			await sql({
				query: `SELECT * FROM customer WHERE id = LAST_INSERT_ID()`,
			})
		) as Customer[];

		return result.length === 1 ? result[0] : null;
	} catch (error) {
		return error;
	}
};

export const update = async (
	id: string,
	data: Pick<Customer, "firstName" | "lastName" | "middleName" | "email" | "password" | "address" | "phoneNumber">
) => {
	try {
		await sql({
			query: `
				UPDATE customer 
				SET 
					first_name = ?, 
					last_name = ?, 
					middle_name = ?, 
					email = ?, 
					password = ?, 
					address = ?, 
					phone_number = ? 
				WHERE id = ?
			`,
			values: [
				data.firstName,
				data.lastName,
				data.middleName,
				data.email,
				data.password,
				data.address,
				data.phoneNumber,
				id,
			],
		});

		return await findById(id);
	} catch (error) {
		return error;
	}
};

export const deleteById = async (id: string) => {
	try {
		await sql({
			query: `DELETE FROM customer WHERE id = ?`,
			values: [id],
		});

		return true;
	} catch (error) {
		return error;
	}
};
