<template>
	<NuxtLayout :name="layoutName">
		<NuxtPage />
	</NuxtLayout>
</template>

<script setup lang="ts">
import type { LayoutKey } from "#build/types/layouts";

export type Pagination = {
	currentPage: number;
	totalPages: number;
};

const { $routePathHelper: routePath } = useNuxtApp();
const pathArr = routePath().arr;

const pathTitle = computed(() => {
	return routePath().title();
});
const basePathTitle = computed(() => {
	return routePath().title(0);
});
const computedTitle = computed(() => {
	return `${pathTitle.value} – Pet Paradise`;
});
useSeoMeta({
	title: computedTitle,
	ogTitle: computedTitle,
});

const computedLayout = ref<LayoutKey | false>("default");
const layoutName = computed<LayoutKey | false>(() => {
	let withNoHeaders = ["Home", "Signup", "Login"];
	let isPerProductPage = basePathTitle.value === "Shop" && pathArr.value.length === 2 && pathTitle.value !== "Cart";
	let isSignupLoginPage = basePathTitle.value === "Signup" || basePathTitle.value === "Login";

	if (isSignupLoginPage) {
		computedLayout.value = "login-signup";
	} else if (basePathTitle.value === "Account") {
		computedLayout.value = "account";
	} else if (basePathTitle.value === "Admin" && pathTitle.value !== "Login") {
		computedLayout.value = "admin";
	} else if (basePathTitle.value === "Admin" && pathTitle.value === "Login") {
		computedLayout.value = false;
	} else if (!isPerProductPage && !withNoHeaders.includes(pathTitle.value)) {
		computedLayout.value = "with-header";
	} else {
		computedLayout.value = "default";
	}
	return computedLayout.value;
});
</script>

<style scoped></style>
