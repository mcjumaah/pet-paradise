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

export const paginationSql: (
	pageNum: string | undefined,
	paginationQuery: string,
	paginationValues?: any[] | null
) => Promise<PaginationSql> = async (pageNum = "0", paginationQuery, paginationValues = null) => {
	try {
		const pageNumInt = parseInt(pageNum);
		const pageSize = 10;
		const offset = pageNumInt * pageSize;

		let result: any[];
		if (paginationValues) {
			result = (await sql({
				query: `${paginationQuery} LIMIT ? OFFSET ?`,
				values: [...paginationValues, pageSize.toString(), offset.toString()],
			})) as any[];
		} else {
			result = (await sql({
				query: `${paginationQuery} LIMIT ? OFFSET ?`,
				values: [pageSize.toString(), offset.toString()],
			})) as any[];
		}

		const totalCountRows = (await sql({
			query: `SELECT COUNT(*) AS total FROM customer`,
		})) as any[] as { total: number }[];
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
