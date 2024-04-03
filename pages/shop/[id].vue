<template>
	<div class="product-page">
		<section class="product-page-path bg-body-3 py-4">
			<PagePathDisplay class="container" :finalPathTitle="product?.name" isOnPoductPage />
		</section>

		<section class="bg-body-2 pt-4"></section>
	</div>
</template>

<script setup lang="ts">
const route = useRoute();

const product = useDummyProducts().value.find((product) => {
	if (product.id === parseInt(route.params.id as string)) {
		return product;
	}
});

const pageTitle = computed(() => {
	let maxLength = 20;
	let title: string;

	if (product?.name) {
		title = product?.name.length > maxLength ? product?.name.slice(0, maxLength - 3) + "..." : product?.name;
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

<style scoped>
.product-page {
	padding-top: 92px;
}
</style>
