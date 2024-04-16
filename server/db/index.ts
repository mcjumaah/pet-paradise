import mysql from "mysql2/promise";

interface Options {
	query: string;
	values?: any[];
}

const pool = mysql.createPool({
	host: "localhost",
	port: 3306,
	user: "root",
	database: "pet_paradise",
	password: "mcj_root123",
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0,
	enableKeepAlive: true,
	keepAliveInitialDelay: 0,
});

export const sql = async ({ query, values }: Options) => {
	const [rows] = await pool.execute(query, values);

	return rows;
};
