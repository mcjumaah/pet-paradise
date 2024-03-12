<template>
	<NuxtLayout>
		<NuxtPage />
	</NuxtLayout>
</template>

<script setup lang="ts">
const route = useRoute();
const currentPath = route.path;
const computedTitle = computed(() => {
	let firstHalf = currentPath.replace("/", "").charAt(0).toUpperCase() + currentPath.slice(2);
	return `${firstHalf} – Pet Paradise`;
});

useSeoMeta({
	title: computedTitle,
	ogTitle: computedTitle,
});
</script>

<style scoped></style>
