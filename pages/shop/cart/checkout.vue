<template>
	<div class="checkout container py-4 d-flex flex-column row-gap-4">
		<section class="card bg-body-2">
			<div class="card-body px-5 py-4 d-flex flex-column gap-3">
				<p class="card-title fs-5 poppins-medium">Shipment Address</p>

				<div class="d-flex flex-wrap gap-4">
					<div class="address d-flex flex-column">
						<label for="checkout-shipment-address" class="form-label">Address:</label>
						<input type="text" id="checkout-shipment-address" class="form-control shadow-inner" v-model="shipment.address" />
					</div>
					<div class="zip-code d-flex flex-column">
						<label for="checkout-zip-code" class="form-label text-nowrap">Zip Code:</label>
						<input
							type="text"
							id="checkout-zip-code"
							class="form-control shadow-inner h-100 w-100"
							placeholder="Enter zip code"
							v-model="shipment.zipCode"
						/>
					</div>
					<div class="country d-flex flex-column">
						<label for="checkout-country" class="form-label">Country:</label>
						<input
							type="text"
							id="checkout-country"
							class="form-control shadow-inner h-100 w-100"
							v-model="shipment.country"
						/>
					</div>
				</div>
			</div>
		</section>

		<section class="card bg-body-2">
			<div class="card-body d-flex flex-column px-5 py-4 row-gap-4">
				<div class="product-ordered-title-row d-flex justify-content-between">
					<p class="card-title w-75 align-self-center fs-5 poppins-medium">Product/s Checkout</p>
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
							<span class="g-col-4 d-flex justify-content-center">₱{{ parseInt(item.price.toString()) }}</span>
							<span class="g-col-4 d-flex justify-content-center">{{ item.quantity }}</span>
							<span class="g-col-4 d-flex justify-content-center text-primary"
								>₱{{ parseInt(item.totalPrice.toString()) }}
							</span>
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
					<span class="g-col-4">₱{{ shippingFee }}</span>
				</div>
				<div class="grid text-end align-items-center w-50">
					<span class="g-col-8 text-muted">Total Payment: </span>
					<span class="g-col-4 poppins-medium fs-3 text-primary">₱{{ totalCheckoutPrice + shippingFee }}</span>
				</div>

				<div
					id="order-button-wrapper"
					class="mt-4"
					data-bs-toggle="tooltip"
					data-bs-title="Set Shipment Address First"
					data-bs-placement="left"
					tabindex="0"
				>
					<button
						class="btn btn-primary px-5"
						:class="isShipmentIncomplete || isPlacingOrder ? 'disabled' : ''"
						type="button"
						@click="placeOrder()"
					>
						<template v-if="!isPlacingOrder"> Place Order </template>
						<template v-else>
							<span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
							<span role="status">Placing Order...</span>
						</template>
					</button>
				</div>
			</div>
		</section>
	</div>
</template>

<script setup lang="ts">
import type { Order, OrderCheckoutDTO } from "~/server/model/order";
import type { Shipment } from "~/server/model/shipment";

definePageMeta({
	middleware: [
		function () {
			if (useCheckoutItems().value.length <= 0) {
				return navigateTo("/shop/cart");
			}
		},
	],
});

type ShipmentSetting = {
	address: string | undefined;
	zipCode: string;
	country: string;
	[key: string]: string | undefined;
};
type PlacedOrder = {
	statusCode: number;
	statusMessage: string;
	message: string;
	body: {
		order: Order;
		shipment: Shipment;
	};
};

const { $currentUserHelper, $Tooltip: Tooltip } = useNuxtApp();
const currentUserData = $currentUserHelper().userData;
const checkoutItems = useCheckoutItems();

const shipment = ref<ShipmentSetting>({
	address: currentUserData?.address,
	zipCode: "",
	country: "Philippines",
});
const shippingFee = ref(60);
const orderButtonTooltip = ref<typeof Tooltip.prototype>();
const isPlacingOrder = ref(false);
const placedOrder = ref<PlacedOrder>();

const totalCheckoutPrice = computed(() => useItemsArrTotalPrice(checkoutItems.value));

const isShipmentIncomplete = computed(() => {
	let isIncomplete = false;

	for (let key in shipment.value) {
		if (shipment.value.hasOwnProperty(key)) {
			if (!shipment.value[key]) {
				isIncomplete = true;
			}
		}
	}

	return isIncomplete;
});

const orderCheckoutPayload = computed(() => {
	const payload: OrderCheckoutDTO = {
		productItemsId: checkoutItems.value.map((item) => item.productItemId ?? 0),
		paymentMethod: "COD",
		address: shipment.value.address ?? "",
		zipCode: shipment.value.zipCode,
		country: shipment.value.country,
		customerId: currentUserData?.id || 0,
	};
	return payload;
});

watch(
	() => isShipmentIncomplete.value,
	(isIncomplete) => {
		if (isIncomplete) {
			orderButtonTooltip.value?.enable();
		} else {
			orderButtonTooltip.value?.disable();
		}
	}
);

async function placeOrder() {
	try {
		orderButtonTooltip.value?.disable();
		isPlacingOrder.value = true;

		placedOrder.value = await $fetch("/api/products/to-order", {
			method: "POST",
			body: orderCheckoutPayload.value,
		});

		setTimeout(async () => {
			isPlacingOrder.value = false;
			orderButtonTooltip.value?.enable();

			await nextTick();
			navigateTo("/account/my-purchase");
		}, 500);
	} catch (error) {
		alert(error);
	}
}

onMounted(() => {
	orderButtonTooltip.value = Tooltip.getOrCreateInstance("#order-button-wrapper");
});

onBeforeRouteLeave(() => {
	checkoutItems.value = [];
});
</script>

<style scoped lang="scss">
.checkout {
	.address {
		width: 32.5rem;
	}
	.zip-code,
	.country {
		width: 15rem;
	}

	.checkout-item {
		.product-image {
			height: 6.25rem;
			width: 6.25rem;
		}
	}
}
</style>
