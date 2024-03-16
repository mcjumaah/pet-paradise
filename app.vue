<template>
	<NuxtLayout :name="layoutName">
		<NuxtPage />
	</NuxtLayout>
</template>

<script setup lang="ts">
import type { LayoutKey } from "#build/types/layouts";

const route = useRoute();
const computedTitle = computed(() => {
	let currentPath = route.path;
	let firstHalf = currentPath.replace("/", "").charAt(0).toUpperCase() + currentPath.slice(2);
	return `${firstHalf ? firstHalf : "Home"} – Pet Paradise`;
});
useSeoMeta({
	title: computedTitle,
	ogTitle: computedTitle,
});

const computedLayout = ref<LayoutKey>("default");
const layoutName = computed<false | LayoutKey>(() => {
	let withNoHeaders = ["/", "/signup", "/login"];

	if (route.path == "/signup" || route.path == "/login") {
		computedLayout.value = "login-signup";
	} else if (!withNoHeaders.includes(route.path)) {
		computedLayout.value = "with-header";
	} else {
		computedLayout.value = "default";
	}
	return computedLayout.value;
});
</script>

<style scoped></style>
