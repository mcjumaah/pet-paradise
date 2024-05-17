<template>
	<div class="product-page">
		<nav class="product-page--path bg-body-3 py-4">
			<PagePathDisplay class="container" :finalPathTitle="product?.name" isOnPoductPage />
		</nav>

		<main v-if="!isFetchingProduct" class="d-flex flex-column row-gap-4 bg-body-2 pt-4">
			<section class="product-preview-action py-5 bg-white">
				<div class="container d-flex column-gap-5 justify-content-center">
					<ProductImagePreview :images="!isFetchingProduct ? (product?.images as string[]) :[]" />

					<div class="product-action d-flex flex-column row-gap-4">
						<div>
							<h5 class="poppins-medium">{{ product?.name }}</h5>
							<p>{{ formattedSoldNum }} <span class="text-muted">Sold</span></p>
							<div class="bg-body-2 text-primary px-3 py-2 poppins-semibold fs-2">{{ displayedPrice }}</div>
						</div>

						<div class="selects px-4 text-muted d-flex flex-column row-gap-4">
							<VarietiesSelects :selections="product?.selections" v-model="selectedVarieties" />
							<div class="d-flex column-gap-4">
								<label class="pt-2" for="product-quantity-select-wrapper">Quantity</label>
								<div id="product-quantity-select-wrapper" class="d-flex w-100 column-gap-3 row-gap-2 flex-wrap">
									<QuantitySelect class="product-quantity-select" v-model="quantity" />
									<span class="text-nowrap align-self-center">{{ product?.stock }} pieces available</span>
								</div>
							</div>
						</div>

						<div v-if="isInvalid" class="alert alert-danger" role="alert">Please select a variety first.</div>

						<div class="final-action d-flex column-gap-3 pt-3 px-4">
							<button
								class="add-to-cart btn btn-outline-primary d-flex w-100 p-2 align-items-center justify-content-center text-start column-gap-2 poppins-medium transition-all"
								type="button"
								@click="addToCart()"
								:disabled="isLoading"
							>
								<DynamicSpinnerLoader :loading="isLoading">
									<svg class="flex-shrink-0" xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24">
										<path
											d="M11.5 9h2V6h3V4h-3V1h-2v3h-3v2h3m-4 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2Zm10 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2Zm-9.8-3.2v-.1l.9-1.7H16c.7 0 1.4-.4 1.7-1l3.9-7-1.7-1-3.9 7H9L4.8 2H1.5v2h2l3.6 7.6L5.7 14c-.1.3-.2.6-.2 1 0 1.1.9 2 2 2h12v-2H7.9c-.1 0-.2-.1-.2-.2Z"
										/>
									</svg>
									Add To Cart
								</DynamicSpinnerLoader>
							</button>

							<NuxtLink
								to="/shop/cart/checkout"
								class="buy-now btn btn-primary w-100 p-2 transition-all"
								:class="isLoading ? ' disabled ' : ''"
								type="button"
								@click="setToBuyNow()"
							>
								Buy Now
							</NuxtLink>
						</div>
					</div>
				</div>
			</section>

			<section class="product-information py-5 bg-white">
				<div class="container d-flex flex-column row-gap-5">
					<div class="d-flex column-gap-5 poppins-medium">
						<h4 class="text-primary text-decoration-underline">Description</h4>
						<!-- <h4 class="text-muted">Additional Information</h4> -->
					</div>
					<p class="description-text whitespace-pre-line">{{ product?.description.text }}</p>
					<div class="description-images d-flex flex-wrap justify-content-center gap-4">
						<img v-for="(img, index) in product?.description.images" :key="`${index} - ${img.slice(0, 5)}...`" :src="img" />
					</div>
				</div>
			</section>
		</main>

		<div class="added-to-cart-toast-container toast-container position-fixed bottom-0 end-0 p-3">
			<div id="added-to-cart-toast" class="toast" role="alert" data-bs-delay="7500" aria-live="assertive" aria-atomic="true">
				<div class="toast-header bg-success-subtle">
					<SvgCart class="me-2" :height="20" :width="20" fill="var(--bs-success)" />
					<strong class="me-auto">Added To Cart!</strong>
					<small>Just now</small>
					<button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
				</div>
				<div class="toast-body">
					<NuxtLink
						to="/shop/cart"
						class="added-item-details line-clamp-2 mb-0 text-black text-decoration-none transition-all"
					>
						<span class="poppins-bold">{{ quantity }}x</span> of
						<span class="poppins-bold text-secondary-emphasis">{{
							selectedVarieties.length > 0 ? formattedVarieties : ""
						}}</span>
						-- {{ product?.name }}.
					</NuxtLink>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { Cart } from "~/server/model/cart";
import type { ProductItem } from "~/server/model/productItem";
import type { ProductProjection } from "~/server/projections/productProjections";
import type { SelectionOnPriceProjection } from "~/server/projections/selectionProjection";

type AddedItem = {
	data: {
		statusCode: number;
		statusMessage: string;
		message: string;
		body: {
			productItem: ProductItem;
			cart: Cart | null;
		};
	};
};

const route = useRoute();
const { $currentUserHelper, $Toast: Toast } = useNuxtApp();
const currentUserHelper = $currentUserHelper();
const checkoutItems = useCheckoutItems();

const {
	data: product,
	pending: isFetchingProduct,
	error: fetchProductError,
	execute: fetchProduct,
} = useFetch("/api/product", {
	method: "GET",
	query: { id: route.params.id },
	immediate: false,
	transform: (_product) => _product.data as ProductProjection,
});

const selectedVarieties = ref<SelectionOnPriceProjection[]>([]);
const quantity = ref<number>(1);
const productDescription = ref("");
const lastCartAddedItem = ref<AddedItem>();
const isLoading = ref(false);
const isInvalid = ref(false);
const addedToCartToast = ref<typeof Toast.prototype>();

const pageTitle = computed(() => {
	let maxLength = 20;
	let title: string;
	const name = product.value?.name;

	if (name) {
		title = name.length > maxLength ? name.slice(0, maxLength - 3) + "..." : name;
	} else {
		title = "Product";
	}

	return `${title} – Pet Paradise`;
});

const formattedSoldNum = computed(() => {
	let num = product.value?.soldNum;

	if (num && num >= 1000) {
		return Math.floor(num / 1000) + "K+";
	} else {
		return num?.toString() || num;
	}
});

const displayedPrice = computed(() => {
	const lowestPrice = Math.min(...(product.value?.prices || []).map((price) => parseFloat(price.value.toString())));
	const highestPrice = Math.max(...(product.value?.prices || []).map((price) => parseFloat(price.value.toString())));
	const priceRange = lowestPrice !== highestPrice ? `₱${lowestPrice} - ₱${highestPrice}` : `₱${lowestPrice}`;

	return product.value?.selections.length === selectedVarieties.value.length && selectedVarietiesPrice.value?.value
		? `₱${parseInt(selectedVarietiesPrice.value?.value.toString())}`
		: priceRange;
});

const selectedVarietiesPrice = computed(() => {
	const matchingPrice = product.value?.prices.find((price) => {
		const isEqual = price.selections.every((selection) => {
			return selectedVarieties.value.some((selectedVariety) => {
				return selection.name === selectedVariety.name && selection.variety === selectedVariety.variety;
			});
		});

		return isEqual;
	});

	return matchingPrice ?? null;
});

const itemToAdd = computed(() => {
	return {
		quantity: quantity.value,
		productId: product.value?.id,
		priceId: selectedVarietiesPrice.value?.id,
		cartId: currentUserHelper.cart.data?.id,
	};
});

const formattedVarieties = computed(() => {
	let formatted: string = "";

	for (let [index, selection] of selectedVarieties.value.entries()) {
		formatted =
			formatted +
			(index === 0 ? " " : "") +
			`${selection.name}: ${selection.variety}` +
			(index > selectedVarieties.value.length ? "," : "");
	}

	return formatted;
});

watch(selectedVarieties.value, () => {
	isInvalid.value = false;
});

watch(fetchProductError, (error) => {
	if (error) {
		alert(error);
	}
});

async function addToCart() {
	if (selectedVarietiesPrice.value) {
		try {
			isLoading.value = true;
			lastCartAddedItem.value = await $fetch("/api/product/to-cart", {
				method: "POST",
				body: itemToAdd.value,
			});

			await currentUserHelper.cart.fetch();
			setTimeout(() => {
				isLoading.value = false;
				addedToCartToast.value?.show();
			}, 750);
		} catch (error) {
			alert(error);
		}
	} else {
		isInvalid.value = true;
	}
}
async function setToBuyNow() {
	if (product.value && selectedVarietiesPrice.value) {
		checkoutItems.value.push({
			id: 1,
			productItemId: product.value.id,
			origin: "buy-now",
			name: product.value?.name,
			price: selectedVarietiesPrice.value?.value,
			quantity: itemToAdd.value.quantity,
			totalPrice: selectedVarietiesPrice.value?.value * itemToAdd.value.quantity,
			selection: selectedVarieties.value,
			previewImage: product.value.images ? product.value.images[0] : null,
		});
	}
}

onBeforeMount(async () => {
	await fetchProduct();
});

onMounted(async () => {
	addedToCartToast.value = Toast.getOrCreateInstance("#added-to-cart-toast");
});

useSeoMeta({
	title: pageTitle,
	ogTitle: pageTitle,
});
</script>

<style scoped>
.product-page {
	padding-top: 92px;

	section.product-preview-action {
		.product-action {
			.selects {
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
					height: 2.563rem;
					max-width: 7rem;
				}
			}

			.final-action {
				.btn {
					min-height: 2.75rem;
					max-width: 10.5rem;
				}

				.add-to-cart {
					fill: var(--bs-primary);
					background-color: var(--bs-primary-bg-subtle);

					&:hover {
						fill: white;
						color: white;
						background-color: var(--bs-primary-text-emphasis);
					}
				}
			}
		}
	}

	section.product-information {
		.description-images {
			img {
				aspect-ratio: 1 / 1;
				width: 45%;
			}
		}
	}

	.added-to-cart-toast-container {
		:deep(.added-item-details:hover) {
			color: var(--bs-primary) !important;
			text-decoration: underline !important;
		}
	}
}
</style>
