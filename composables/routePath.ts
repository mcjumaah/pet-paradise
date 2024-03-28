export const useRoutePathArr = () => {
	const route = useRoute();

	const pathArr = computed<string[]>(() => {
		return route.path.split("/").filter(Boolean);
	});

	return pathArr;
};

export const useRoutePathTitle = (pathIndex = 0) => {
	const pathTitle = computed(() => {
		let title = useRoutePathArr().value[pathIndex] || "Home";
		return title.charAt(0).toUpperCase() + title.slice(1);
	});

	return pathTitle;
};
