<template>
	<div class="product-page">Product Page</div>
</template>

<script setup lang="ts">
const route = useRoute();

const product = useDummyProducts().value.find((product) => {
	if (product.id === parseInt(route.params.id as string)) {
		return product;
	}
});

const pageTitle = computed(() => {
	let maxLength = 10;
	let title: string;

	if (product?.name) {
		title = product?.name.length > maxLength ? product?.name.slice(0, length - 3) + "..." : product?.name;
	} else {
		title = "Product";
	}

	return `${title} – Pet Paradise`;
});

useSeoMeta({
	title: pageTitle,
	ogTitle: pageTitle,
});
</script>

<style scoped></style>
