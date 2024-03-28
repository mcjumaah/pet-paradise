export const useRoutePathArr = () => {
	const route = useRoute();

	const pathArr = computed<string[]>(() => {
		return route.path.split("/").filter(Boolean);
	});

	return pathArr;
};

export const useBasePathTitle = () => {
	const basePathTitle = computed(() => {
		let basePath = useRoutePathArr().value[0] || "Home";
		return basePath.charAt(0).toUpperCase() + basePath.slice(1);
	});

	return basePathTitle;
};
