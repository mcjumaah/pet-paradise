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

						<div class="selects pt-4 px-4 text-muted d-flex flex-column row-gap-4">
							<VariantsSelects :selections="product?.selections" v-model="selectedSelections" />
							<div class="d-flex column-gap-4">
								<label class="pt-2" for="product-quantity-select-wrapper">Quantity</label>
								<div id="product-quantity-select-wrapper" class="d-flex w-100 column-gap-3 row-gap-2 flex-wrap">
									<QuantitySelect class="product-quantity-select" v-model="quantity" />
									<span class="text-nowrap align-self-center">203415 pieces available</span>
								</div>
							</div>
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
const quantity = ref<number>(1);

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

	.product-action > .selects {
		:deep(label) {
			width: 35%;
			min-width: fit-content;

			@media (min-width: 1200px) {
				width: 25%;
			}
			@media (min-width: 1400px) {
				width: 17.5%;
			}
		}

		.product-quantity-select {
			max-width: 7rem;
		}
	}
}
</style>
