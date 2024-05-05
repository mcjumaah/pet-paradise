import { sql } from "../db";
import { keysToCamelCase } from "../utils/entityFieldsUtil";

export type Shipment = {
	id: number;
	shipmentDate: string;
	address: string;
	zipCode: number;
	country: string;
	customerId: number;
	orderId: number;
};

export type ShipmentDTO = Pick<Shipment, "shipmentDate" | "address" | "zipCode" | "country" | "customerId" | "orderId">;

export const findAll = async (pageNum: number = 0) => {
	try {
		const { result, pagination } = await paginationSql(pageNum, `SELECT * FROM \`shipment\``);

		return keysToCamelCase({
			content: result as Shipment[],
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
				query: `SELECT * FROM \`shipment\` WHERE id = ?`,
				values: [id],
			})
		) as Shipment[];

		return result.length === 1 ? result[0] : null;
	} catch (error) {
		throw error;
	}
};

export const save = async (data: ShipmentDTO) => {
	try {
		await sql({
			query: `
				INSERT INTO \`shipment\` (
					shipment_date, 
					address, 
					zip_code, 
					country, 
					customer_id, 
					order_id
				) VALUES (?, ?, ?, ?, ?, ?)
			`,
			values: [data.shipmentDate, data.address, data.zipCode, data.country, data.customerId, data.orderId],
		});

		const result = keysToCamelCase(
			await sql({
				query: `SELECT * FROM \`shipment\` WHERE id = LAST_INSERT_ID()`,
			})
		) as Shipment[];

		return result.length === 1 ? result[0] : null;
	} catch (error) {
		throw error;
	}
};

export const update = async (id: number, data: ShipmentDTO) => {
	try {
		await sql({
			query: `
				UPDATE \`shipment\` 
				SET 
					shipment_date = ?, 
					address = ?, 
					zip_code = ?, 
					country = ?, 
					customer_id = ?, 
					order_id = ? 
				WHERE id = ?
			`,
			values: [data.shipmentDate, data.address, data.zipCode, data.country, data.customerId, data.orderId, id],
		});

		return await findById(id);
	} catch (error) {
		throw error;
	}
};

export const deleteById = async (id: number) => {
	try {
		await sql({
			query: `DELETE FROM \`shipment\` WHERE id = ?`,
			values: [id],
		});

		return true;
	} catch (error) {
		throw error;
	}
};
