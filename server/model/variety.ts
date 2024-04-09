import { sql } from "../db";

export type Variety = {
	id: number;
	name: string;
	selectionId: number;
	priceId: number;
};

export const findAll = async () => {
	try {
		const result = await sql({ query: `SELECT * FROM variety` });

		return result as Variety[];
	} catch (error) {
		return error;
	}
};

export const findById = async (id: string) => {
	try {
		const result = (await sql({
			query: `SELECT * FROM variety WHERE id = ?`,
			values: [id],
		})) as Variety[];

		return result.length === 1 ? result[0] : null;
	} catch (error) {
		return error;
	}
};

export const save = async (data: Pick<Variety, "name" | "selectionId" | "priceId">) => {
	try {
		await sql({
			query: `
				INSERT INTO variety (
					name, 
					selection_id, 
					price_id
				) VALUES (?, ?, ?)
			`,
			values: [data.name, data.selectionId, data.priceId],
		});

		const result = (await sql({
			query: `SELECT * FROM variety WHERE id = LAST_INSERT_ID()`,
		})) as Variety[];

		return result.length === 1 ? result[0] : null;
	} catch (error) {
		return error;
	}
};

export const update = async (id: string, data: Pick<Variety, "name" | "selectionId" | "priceId">) => {
	try {
		await sql({
			query: `
				UPDATE variety 
				SET 
					name = ?, 
					selection_id = ?, 
					price_id = ? 
				WHERE id = ?
			`,
			values: [data.name, data.selectionId, data.priceId, id],
		});

		return await findById(id);
	} catch (error) {
		return error;
	}
};

export const deleteById = async (id: string) => {
	try {
		await sql({
			query: `DELETE FROM variety WHERE id = ?`,
			values: [id],
		});

		return true;
	} catch (error) {
		return error;
	}
};
