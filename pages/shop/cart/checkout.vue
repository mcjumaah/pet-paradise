<template>
	<div class="checkout container py-4 d-flex flex-column row-gap-4">
		<section class="card bg-body-2">
			<div class="card-body d-flex flex-column px-5 py-4 row-gap-4">
				<div class="product-ordered-title-row d-flex justify-content-between">
					<div class="card-title w-75 align-self-center fs-5 poppins-medium">Product/s Checkout</div>
					<div class="grid w-50 text-center text-muted">
						<span class="g-col-4 d-flex justify-content-center">Unit Price</span>
						<span class="g-col-4 d-flex justify-content-center">Amount</span>
						<span class="g-col-4 d-flex justify-content-center">Item Subtotal</span>
					</div>
				</div>

				<div class="checkout-product-list d-flex flex-column row-gap-3">
					<div v-for="(item, index) in checkoutItems" class="checkout-item d-flex">
						<div class="d-flex align-items-center column-gap-4 w-75">
							<img :src="item.previewImage" class="product-image rounded" :alt="`Product #${item.id} Image`" />
							<p class="card-text">{{ item.name }}</p>
						</div>
						<div class="grid w-50 text-center text-muted align-items-center">
							<span class="g-col-4 d-flex justify-content-center">₱{{ item.price }}</span>
							<span class="g-col-4 d-flex justify-content-center">{{ item.quantity }}</span>
							<span class="g-col-4 d-flex justify-content-center text-primary">₱{{ item.totalPrice }}</span>
						</div>
					</div>
				</div>
			</div>
		</section>

		<section class="card bg-body-2">
			<div class="card-body px-5 py-4 d-flex flex-column align-items-end row-gap-2">
				<div class="grid text-end align-items-center w-50">
					<span class="g-col-8 text-muted">Merchadise Subtotal: </span>
					<span class="g-col-4">₱{{ totalCheckoutPrice }}</span>
				</div>
				<div class="grid text-end align-items-center w-50">
					<span class="g-col-8 text-muted">Shipping Total: </span>
					<span class="g-col-4">₱60</span>
				</div>
				<div class="grid text-end align-items-center w-50">
					<span class="g-col-8 text-muted">Total Payment: </span>
					<span class="g-col-4 poppins-medium fs-3 text-primary">₱{{ totalCheckoutPrice + 60 }}</span>
				</div>

				<button class="btn btn-primary mt-4 px-5" type="button">Place Order</button>
			</div>
		</section>
	</div>
</template>

<script setup lang="ts">
definePageMeta({
	middleware: [
		function () {
			if (useCheckoutItems().value.length <= 0) {
				return navigateTo("/shop/cart");
			}
		},
	],
});

const checkoutItems = useCheckoutItems();

const totalCheckoutPrice = computed(() => useItemsArrTotalPrice(checkoutItems.value));

onBeforeRouteLeave(() => {
	checkoutItems.value = [];
});
</script>

<style scoped lang="scss">
.checkout {
	.checkout-item {
		.product-image {
			height: 6.25rem;
			width: 6.25rem;
		}
	}
}
</style>
