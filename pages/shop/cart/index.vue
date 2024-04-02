<template>
	<div class="cart container py-5 d-flex flex-column row-gap-3">
		<div class="cart-top-label d-flex justify-content-between px-5 text-muted column-gap-4 align-items-center">
			<div class="d-flex column-gap-3 w-100">
				<div class="form-check">
					<input
						title="Select All"
						id="cart-select-all"
						class="form-check-input"
						data-bs-toggle="tooltip"
						data-bs-title="Select All"
						data-bs-trigger="hover"
						type="checkbox"
						v-model="isSelectedAll"
					/>
				</div>
				<span>Product</span>
			</div>

			<div class="grid text-center w-75">
				<span class="g-col-3 d-flex justify-content-center">Unit Price</span>
				<span class="g-col-3 d-flex justify-content-center">Quantity</span>
				<span class="g-col-3 d-flex justify-content-center">Total Price</span>
				<span class="g-col-3 d-flex justify-content-center">Action</span>
			</div>
		</div>

		<div class="d-flex flex-column row-gap-2">
			<div v-for="(item, index) in dummyCartItems" class="cart-item card bg-body-2 shadow-sm">
				<div class="card-body d-flex justify-content-between px-5 column-gap-4">
					<div class="d-flex column-gap-3 align-items-center w-100">
						<div class="form-check">
							<input
								:title="`Select This Item #${item.id}`"
								:id="`cart-item-${item.id}`"
								class="form-check-input"
								type="checkbox"
								:value="item.id"
								v-model="selectedItemsId"
							/>
						</div>
						<div :title="item.name" class="d-flex align-items-center column-gap-4">
							<img :src="item.previewImg" class="product-image rounded" :alt="`Product #${item.id} Image`" />
							<p class="card-text">{{ item.name }}</p>
						</div>
					</div>

					<div class="grid text-center w-75 align-items-center">
						<div title="Unit Price" class="g-col-3 d-flex justify-content-center">{{ item.price }}</div>
						<div title="Quantity" class="g-col-3 d-flex justify-content-center">
							<div class="cart-item-quantity input-group justify-content-center border rounded">
								<button
									title="Reduce Quantity"
									class="btn start-0"
									type="button"
									id="reduce-quantity"
									@click="item.quantity--"
								>
									-
								</button>
								<input
									type="number"
									class="form-control border-0 px-1 text-center position-relative z-1"
									placeholder=""
									aria-label="Example text with button addon"
									aria-describedby="button-addon1"
									v-model="item.quantity"
								/>
								<button title="Add Quantity" class="btn end-0" type="button" id="add-quantity" @click="item.quantity++">
									+
								</button>
							</div>
						</div>
						<div title="Total Price" class="g-col-3 d-flex justify-content-center text-primary">
							₱{{ getItemTotalPrice(item) }}
						</div>
						<div class="g-col-3 d-flex justify-content-center">
							<button type="button" class="btn link-secondary text-decoration-underline">Delete</button>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="d-flex align-items-center column-gap-3 justify-content-end pe-5 my-3">
			<p class="mb-0">
				Total ({{ selectedItemsId.length }} item/s): <span class="text-primary fs-4">₱{{ selectedItemsTotalPrice }}</span>
			</p>
			<div id="checkout-button-wrapper" data-bs-toggle="tooltip" data-bs-title="Select Item's to Checkout" tabindex="0">
				<NuxtLink
					to="/shop/cart/checkout"
					class="btn btn-primary"
					:class="selectedItemsId.length < 1 ? 'disabled' : ''"
					@click="setCheckoutItems()"
				>
					Check Out
				</NuxtLink>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
export interface CartItem {
	id: number;
	name: string;
	price: string;
	previewImg: string;
	quantity: number;
}
export interface CartTooltips {
	selectAll: any;
	checkout: any;
}

const { $Tooltip: Tooltip } = useNuxtApp();
const checkoutItems = useCheckoutItems();
const getItemTotalPrice = usePerItemTotalPrice;

const tooltips = ref(<CartTooltips>{});
const dummyCartItems = ref<CartItem[]>([
	{
		id: 1,
		name: "Dr Shiba Happy Tummy Healthy Dog Treats Snack - Dog Multivitamins - Dog Food for Digestive Care",
		price: "₱499",
		previewImg: "/images/shop-products/01.png",
		quantity: 1,
	},
	{
		id: 2,
		name: "PEDIGREE DentaStix for Puppy – Dental Treats for Puppy, 56g. Daily Puppy Treats for Healthy Gums",
		price: "₱71",
		previewImg: "/images/shop-products/02.png",
		quantity: 3,
	},
	{
		id: 3,
		name: "Dr. Shiba Happy Tummy Taster Pack - Beef 40g  Dog Treats Snack - Dog Food for Digestive Care",
		price: "₱99",
		previewImg: "/images/shop-products/03.png",
		quantity: 6,
	},
	{
		id: 4,
		name: "Mandaue Foam Dog Bed",
		price: "₱735",
		previewImg: "/images/shop-products/04.png",
		quantity: 2,
	},
]);
const selectedItemsId = ref<number[]>([]);

const selectedItemsTotalPrice = computed(() => useItemsArrTotalPrice(dummyCartItems.value, selectedItemsId.value));
const isSelectedAll = computed({
	get: () => selectedItemsId.value.length === dummyCartItems.value?.length,
	set: (value) => {
		if (value) {
			selectedItemsId.value = dummyCartItems.value.map((item) => item.id);
		} else {
			selectedItemsId.value = [];
		}
	},
});

watch(selectedItemsId, (newItemsId) => {
	if (newItemsId.length > 0 && tooltips.value.checkout) {
		tooltips.value.checkout.disable();
	} else {
		tooltips.value.checkout.enable();
	}
});

function setCheckoutItems() {
	dummyCartItems.value.forEach((item) => {
		if (selectedItemsId.value.includes(item.id)) {
			checkoutItems.value.push(item);
		}
	});
}

onMounted(() => {
	tooltips.value.selectAll = new Tooltip(document.getElementById("cart-select-all") as HTMLElement);
	tooltips.value.checkout = new Tooltip(document.getElementById("checkout-button-wrapper") as HTMLElement);
});
</script>

<style scoped lang="scss">
.cart {
	.cart-item {
		.product-image {
			height: 6.25rem;
			width: 6.25rem;
		}

		.cart-item-quantity {
			min-width: 5rem;
			overflow: clip;

			input {
				appearance: none;
				-moz-appearance: textfield;

				&::-webkit-outer-spin-button,
				&::-webkit-inner-spin-button {
					-webkit-appearance: none;
					margin: 0;
				}
			}

			button {
				top: 50%;
				transform: translateY(-50%);
				background-color: white;
				height: 100%;
				color: var(--bs-secondary-text-emphasis);
				border: none;
				border-radius: 0;
				padding-block: 0;
				padding-inline: 0.4rem;
				transition-property: all !important;
				transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1) !important;
				transition-duration: 150ms !important;

				&:hover {
					color: var(--bs-primary);
					background-color: var(--bs-primary-bg-subtle);
				}
			}
		}
	}
}
</style>
