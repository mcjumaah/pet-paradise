export interface CreateError {
	url: string;
	statusCode: number;
	statusMessage: string;
	message: string;
	stack: string;
}

export default function formatFetchErrorResponseData(error: unknown) {
	const errorWithResponse = error as { response?: { _data?: any } };
	if (errorWithResponse.response?._data) {
		return errorWithResponse.response._data as CreateError;
	} else {
		const errorMsg = "Can't format FetchError";
		console.log(errorMsg);
		alert(errorMsg);
	}
}
