export function convertFromCamelCase(camelString: string, format: "kebab" | "title"): string {
	const words = camelString.replace(/([a-z0-9])([A-Z])/g, "$1 $2").split(" ");

	if (format === "kebab") {
		return words.join("-").toLowerCase();
	} else if (format === "title") {
		const titleCaseWords = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1));
		return titleCaseWords.join(" ");
	} else {
		throw new Error("Invalid format. Use 'kebab' or 'title'.");
	}
}

export const kebabToTitleCase = (kebabString: string) => {
	const words = kebabString.split("-");

	const titleWords = words.map((word) => {
		const firstLetter = word.charAt(0).toUpperCase();
		const restOfWord = word.slice(1).toLowerCase();
		return firstLetter + restOfWord;
	});

	return titleWords.join(" ");
};
