<template>
	<NuxtLayout :name="layoutName">
		<NuxtPage />
	</NuxtLayout>
</template>

<script setup lang="ts">
import type { LayoutKey } from "#build/types/layouts";

const route = useRoute();
const { $routePathHelper: routePath } = useNuxtApp();

const pathTitle = computed(() => {
	return routePath().title().value;
});
const basePathTitle = computed(() => {
	return routePath().title(0).value;
});
const computedTitle = computed(() => {
	return `${pathTitle.value} – Pet Paradise`;
});
useSeoMeta({
	title: computedTitle,
	ogTitle: computedTitle,
});

const computedLayout = ref<LayoutKey>("default");
const layoutName = computed<false | LayoutKey>(() => {
	let withNoHeaders = ["/", "/signup", "/login"];

	if (route.path === "/signup" || route.path === "/login") {
		computedLayout.value = "login-signup";
	} else if (basePathTitle.value === "Account") {
		computedLayout.value = "account";
	} else if (!withNoHeaders.includes(route.path)) {
		computedLayout.value = "with-header";
	} else {
		computedLayout.value = "default";
	}
	return computedLayout.value;
});
</script>

<style scoped></style>
