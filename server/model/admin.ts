import { sql } from "../db";
import { keysToCamelCase } from "../utils/entityFieldsUtil";
import { Pagination } from "../utils/paginationUtil";

export type Admin = {
	id: number;
	firstName: string;
	lastName: string;
	middleName: string;
	email: string;
	password: string;
	phoneNumber: string;
};

export type AdminDTO = Omit<Admin, "id">;

export type AdminPaginated = {
	content: Admin[];
	pagination: Pagination;
};

export const findAll = async (pageNum: number = 0) => {
	try {
		const { result, pagination } = await paginationSql(pageNum, `SELECT * FROM admin`);

		return keysToCamelCase({
			content: result as Admin[],
			pagination: pagination,
		}) as AdminPaginated;
	} catch (error) {
		throw error;
	}
};

export const findById = async (id: number) => {
	try {
		const result = keysToCamelCase(
			await sql({
				query: `SELECT * FROM admin WHERE id = ?`,
				values: [id],
			})
		) as Admin[];

		return result.length === 1 ? result[0] : null;
	} catch (error) {
		throw error;
	}
};

export const findOneByCredential = async (data: Pick<Admin, "email" | "password">) => {
	try {
		const result = keysToCamelCase(
			await sql({
				query: `SELECT * FROM admin WHERE email = ? AND password = ?`,
				values: [data.email, data.password],
			})
		) as Admin[];

		return result.length === 1 ? result[0] : null;
	} catch (error) {
		throw error;
	}
};

export const save = async (data: AdminDTO) => {
	try {
		await sql({
			query: `
				INSERT INTO admin (
					first_name, 
					last_name, 
					middle_name, 
					email, 
					password, 
					phone_number
				) 
				VALUES (?, ?, ?, ?, ?, ?)
			`,
			values: [data.firstName, data.lastName, data.middleName, data.email, data.password, data.phoneNumber],
		});

		const result = keysToCamelCase(
			await sql({
				query: `SELECT * FROM admin WHERE id = LAST_INSERT_ID()`,
			})
		) as Admin[];

		return result.length === 1 ? result[0] : null;
	} catch (error) {
		throw error;
	}
};

export const update = async (id: number, data: AdminDTO) => {
	try {
		await sql({
			query: `
				UPDATE admin 
				SET 
					first_name = ?, 
					last_name = ?, 
					middle_name = ?, 
					email = ?, 
					password = ?, 
					phone_number = ? 
				WHERE id = ?
			`,
			values: [data.firstName, data.lastName, data.middleName, data.email, data.password, data.phoneNumber],
		});

		return await findById(id);
	} catch (error) {
		throw error;
	}
};

export const deleteById = async (id: number) => {
	try {
		await sql({
			query: `DELETE FROM admin WHERE id = ?`,
			values: [id],
		});

		return true;
	} catch (error) {
		throw error;
	}
};
