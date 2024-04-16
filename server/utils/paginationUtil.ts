import { sql } from "../db";

export type Pagination = {
	pageNumber: number;
	pageSize: number;
	totalElements: number;
	totalPages: number;
	isLastPage: boolean;
};

export type PaginationSql = {
	result: any[];
	pagination: Pagination;
};

export const paginationSql: (pageNum: string | undefined, paginationQuery: string) => Promise<PaginationSql> = async (
	pageNum = "0",
	paginationQuery
) => {
	try {
		const pageNumInt = parseInt(pageNum);
		const pageSize = 10;
		const offset = pageNumInt * pageSize;

		const result = (await sql({
			query: `${paginationQuery} LIMIT ? OFFSET ?`,
			values: [pageSize.toString(), offset.toString()],
		})) as any[];

		const totalCountRows = (await sql({
			query: `SELECT COUNT(*) AS total FROM customer`,
		})) as any[];
		const totalCount = totalCountRows[0].total;
		const totalPages = Math.ceil(totalCount / pageSize);

		return {
			result,
			pagination: {
				pageNumber: pageNumInt,
				pageSize: pageSize,
				totalElements: result.length,
				totalPages: totalPages,
				isLastPage: pageNumInt === totalPages - 1,
			},
		};
	} catch (error) {
		throw error;
	}
};
