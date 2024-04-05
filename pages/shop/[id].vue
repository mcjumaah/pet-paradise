<template>
	<div class="product-page">
		<section class="product-page--path bg-body-3 py-4">
			<PagePathDisplay class="container" :finalPathTitle="product?.name" isOnPoductPage />
		</section>

		<section class="bg-body-2 pt-4">
			<div class="product-preview-action py-5 bg-white">
				<div class="container d-flex column-gap-5 justify-content-center">
					<ProductImagePreview :images="(product?.images as string[])" />

					<div class="product-action d-flex flex-column">
						<div>
							<h5 class="poppins-medium">{{ product?.name }}</h5>
							<p>{{ formattedSoldNum }} <span class="text-muted">Sold</span></p>
							<div class="bg-body-2 text-primary px-3 py-2 poppins-semibold fs-2">{{ product?.price }}</div>
						</div>

						<div class="pt-4">
							<VariantsSelects :selections="product?.selections" v-model="selectedSelections" />
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script setup lang="ts">
import type { SelectedVariant } from "~/components/VariantsSelects.vue";

const route = useRoute();

const product = useDummyProducts().value.find((product) => {
	if (product.id === parseInt(route.params.id as string)) {
		return product;
	}
});

const selectedSelections = ref<SelectedVariant[]>([]);

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

const formattedSoldNum = computed(() => {
	let num = product?.soldNum;

	if (num && num >= 1000) {
		return Math.floor(num / 1000) + "K+";
	} else {
		return num?.toString() || num;
	}
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
