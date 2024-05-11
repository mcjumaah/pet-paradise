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

export const paginationSql = async (pageNum = 0, paginationQuery: string, paginationValues: any[] | null = null) => {
	try {
		const pageSize = 10;
		const offset = pageNum * pageSize;

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

		type TotalCount = { total: number }[];
		let totalCountRows: TotalCount;

		if (paginationValues) {
			totalCountRows = (await sql({
				query: `${formatSQLQueryForCount(paginationQuery)}`,
				values: paginationValues,
			})) as any[] as TotalCount;
		} else {
			totalCountRows = (await sql({
				query: `${formatSQLQueryForCount(paginationQuery)}`,
			})) as any[] as TotalCount;
		}

		const totalCount = totalCountRows[0].total;
		const totalPages = Math.ceil(totalCount / pageSize);

		return {
			result,
			pagination: {
				pageNumber: pageNum,
				pageSize: pageSize,
				totalElements: result.length,
				totalPages: totalPages,
				isLastPage: pageNum === totalPages - 1,
			},
		};
	} catch (error) {
		throw error;
	}
};

function formatSQLQueryForCount(query: string) {
	let queryPieces = query.split("\n");

	for (let i = 0; i < queryPieces.length; i++) {
		queryPieces[i] = queryPieces[i].replace("*", "COUNT(*) AS total");
	}

	let formattedQueryString = queryPieces.join("\n");

	return formattedQueryString;
}
