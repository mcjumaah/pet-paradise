export default defineNuxtPlugin(() => {
	const route = useRoute();

	return {
		provide: {
			routePathHelper: () => {
				const getArr = () => {
					const pathArr = computed<string[]>(() => {
						return route.path.split("/").filter(Boolean);
					});

					return pathArr;
				};

				const getTitle = (pathIndex: number = getArr().value.length - 1) => {
					const pathTitle = computed(() => {
						let title = getArr().value[pathIndex] || "Home";

						return title.charAt(0).toUpperCase() + title.slice(1);
					});

					return pathTitle;
				};

				return { arr: getArr(), title: (pathIndex?: number) => getTitle(pathIndex) };
			},
		},
	};
});
