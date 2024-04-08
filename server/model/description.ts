import { sql } from "../db";

export type Description = {
	id: number;
	text: string;
	images: string[];
	productIt: number;
};
