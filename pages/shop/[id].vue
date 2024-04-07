<template>
	<div class="product-page">
		<nav class="product-page--path bg-body-3 py-4">
			<PagePathDisplay class="container" :finalPathTitle="product?.name" isOnPoductPage />
		</nav>

		<main class="d-flex flex-column row-gap-4 bg-body-2 pt-4">
			<section class="product-preview-action py-5 bg-white">
				<div class="container d-flex column-gap-5 justify-content-center">
					<ProductImagePreview :images="(product?.images as string[])" />

					<div class="product-action d-flex flex-column row-gap-4">
						<div>
							<h5 class="poppins-medium">{{ product?.name }}</h5>
							<p>{{ formattedSoldNum }} <span class="text-muted">Sold</span></p>
							<div class="bg-body-2 text-primary px-3 py-2 poppins-semibold fs-2">{{ product?.price }}</div>
						</div>

						<div class="selects px-4 text-muted d-flex flex-column row-gap-4">
							<VarietiesSelects :selections="product?.selections" v-model="selectedSelections" />
							<div class="d-flex column-gap-4">
								<label class="pt-2" for="product-quantity-select-wrapper">Quantity</label>
								<div id="product-quantity-select-wrapper" class="d-flex w-100 column-gap-3 row-gap-2 flex-wrap">
									<QuantitySelect class="product-quantity-select" v-model="quantity" />
									<span class="text-nowrap align-self-center">203415 pieces available</span>
								</div>
							</div>
						</div>

						<div class="final-action d-flex column-gap-3 pt-3 px-4">
							<button
								class="add-to-cart btn btn-outline-primary d-flex w-100 p-2 align-items-center justify-content-center text-start column-gap-2 poppins-medium transition-all"
								type="button"
								@click="addToCart()"
							>
								<svg class="flex-shrink-0" xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24">
									<path
										d="M11.5 9h2V6h3V4h-3V1h-2v3h-3v2h3m-4 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2Zm10 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2Zm-9.8-3.2v-.1l.9-1.7H16c.7 0 1.4-.4 1.7-1l3.9-7-1.7-1-3.9 7H9L4.8 2H1.5v2h2l3.6 7.6L5.7 14c-.1.3-.2.6-.2 1 0 1.1.9 2 2 2h12v-2H7.9c-.1 0-.2-.1-.2-.2Z"
									/>
								</svg>
								Add To Cart
							</button>
							<NuxtLink
								to="/shop/cart/checkout"
								class="buy-now btn btn-primary w-100 p-2 transition-all"
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
						<h4 class="text-muted">Additional Information</h4>
					</div>
					<p class="description-text whitespace-pre-line">{{ product?.description.text }}</p>
					<div class="description-images d-flex flex-wrap justify-content-center gap-4">
						<img v-for="(img, index) in product?.description.images" :src="img" />
					</div>
				</div>
			</section>
		</main>
	</div>
</template>

<script setup lang="ts">
const route = useRoute();

const product = useDummyProducts().value.find((product) => {
	if (product.id === parseInt(route.params.id as string)) {
		return product;
	}
});
const cartItems = useDummyCartItems();
const checkoutItems = useCheckoutItems();

const selectedSelections = ref<SelectedVariety[]>([]);
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
const neededProductDetailsToMove = computed(() => {
	let productDetails = (({ name, price, images }) => ({ name, price, images }))(product as Product);
	return productDetails;
});

function addToCart() {
	let latestProductInCart = cartItems.value[cartItems.value.length - 1];

	let productToAdd = {
		id: latestProductInCart.id + 1,
		...neededProductDetailsToMove.value,
		selectedVariety: selectedSelections.value,
		quantity: quantity.value,
	};

	cartItems.value.push(productToAdd);
}
async function setToBuyNow() {
	let latestProductInCart = cartItems.value[cartItems.value.length - 1];

	let productToAdd = {
		id: latestProductInCart.id + 1,
		...neededProductDetailsToMove.value,
		selectedVariety: selectedSelections.value,
		quantity: quantity.value,
	};

	checkoutItems.value.push(productToAdd);
}

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
}
</style>
