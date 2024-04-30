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
						data-bs-offset="0,10"
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

		<TransitionGroup name="cart-items" tag="div" class="d-flex flex-column row-gap-2">
			<div
				v-for="(item, index) in cartItems?.content"
				:key="`${index} - ${item.id}`"
				class="cart-item card bg-body-2 shadow-sm"
			>
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
							<img :src="item.previewImage" class="product-image rounded" :alt="`Product #${item.id} Image`" />
							<div>
								<p class="card-text line-clamp-2">{{ item.name }}</p>
								<p class="mb-0 text-muted">
									Variety: <span v-for="selection in item.selection">{{ selection.variety }}</span>
								</p>
							</div>
						</div>
					</div>

					<div class="grid text-center w-75 align-items-center">
						<div title="Unit Price" class="g-col-3 d-flex justify-content-center">
							₱{{ parseInt(item.price.toString()) }}
						</div>
						<div title="Quantity" class="g-col-3 d-flex justify-content-center">
							<QuantitySelect v-model="item.quantity" />
						</div>
						<div title="Total Price" class="g-col-3 d-flex justify-content-center text-primary">
							₱{{ usePerItemTotalPrice(item) }}
						</div>
						<div class="g-col-3 d-flex justify-content-center">
							<button
								type="button"
								class="btn link-secondary text-decoration-underline"
								:class="getIsDeletingItem(item.id) ? 'disabled ' : ''"
								@click="selectedItemIdToDelete = item.id"
							>
								{{ getIsDeletingItem(item.id) ? "deleting..." : "Delete" }}
							</button>
						</div>
					</div>
				</div>
			</div>
		</TransitionGroup>

		<div class="d-flex align-items-center column-gap-3 justify-content-end pe-5 my-3">
			<p class="mb-0">
				Total ({{ selectedItemsId.length }} item/s): <span class="text-primary fs-4">₱{{ selectedItemsTotalPrice }}</span>
			</p>
			<div
				id="checkout-button-wrapper"
				data-bs-toggle="tooltip"
				data-bs-title="Select Item's to Checkout"
				data-bs-offset="0,10"
				tabindex="0"
			>
				<NuxtLink
					to="/shop/cart/checkout"
					class="btn btn-primary"
					:class="isCheckingOut || selectedItemsId.length < 1 ? 'disabled' : ''"
					@click="setCheckoutItems()"
				>
					<template v-if="!isCheckingOut"> Check Out </template>
					<template v-else>
						<span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
						<span role="status">Cheking Out...</span>
					</template>
				</NuxtLink>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { ProductItemsPaginatedProjection } from "~/server/projections/productItemProjections";

export interface CartTooltips {
	selectAll: typeof Tooltip.prototype;
	checkout: typeof Tooltip.prototype;
}

const { $currentUserHelper: useCurrentUserHelper } = useNuxtApp();
const currentUserCart = useCurrentUserHelper().cart;
const { $Tooltip: Tooltip } = useNuxtApp();
const checkoutItems = useCheckoutItems();

const selectedItemIdToDelete = ref<number>();
const {
	data: deleteCartItemData,
	pending: isDeletingCartItem,
	error: deleteCartItemError,
} = await useFetch("/api/cart/item", {
	method: "DELETE",
	query: {
		productItemId: selectedItemIdToDelete,
	},
	immediate: false,
	transform: (_deletionData) => {
		currentUserCart.fetch();
		return _deletionData;
	},
});

const {
	data: cartItems,
	pending: isFetchingCartItems,
	error: fetchCartItemsError,
	execute: fetchCartItems,
} = await useFetch("/api/cart/items", {
	method: "GET",
	query: { cartId: currentUserCart.data?.id },
	transform: (_cartItems) => _cartItems.data as ProductItemsPaginatedProjection,
	watch: [deleteCartItemData],
});

const tooltips = ref(<CartTooltips>{});
const selectedItemsId = ref<number[]>([]);
const isCheckingOut = ref<boolean>();

const isSelectedAll = computed({
	get: () => selectedItemsId.value.length === cartItems.value?.content.length,
	set: (value) => {
		if (value && cartItems.value) {
			selectedItemsId.value = cartItems.value.content.map((item) => item.id);
		} else {
			selectedItemsId.value = [];
		}
	},
});

const selectedItemsTotalPrice = computed(() => {
	if (cartItems.value) {
		return useItemsArrTotalPrice(cartItems.value.content, selectedItemsId.value);
	}
});

watch(selectedItemsId, (newItemsId) => {
	if (newItemsId.length > 0 && tooltips.value.checkout) {
		tooltips.value.checkout.disable();
	} else {
		tooltips.value.checkout.enable();
	}
});

watch([fetchCartItemsError, deleteCartItemError], ([fetchError, deleteError]) => {
	const error = fetchError || deleteError;
	if (error) {
		alert(error);
	}
});

function getIsDeletingItem(itemId: number) {
	return isDeletingCartItem.value && itemId === selectedItemIdToDelete.value;
}

function setCheckoutItems() {
	isCheckingOut.value = true;

	cartItems.value?.content.forEach((item) => {
		if (selectedItemsId.value.includes(item.id)) {
			checkoutItems.value.push(item);
		}
	});

	isCheckingOut.value = false;
}

onMounted(() => {
	tooltips.value.selectAll = Tooltip.getOrCreateInstance("#cart-select-all");
	tooltips.value.checkout = Tooltip.getOrCreateInstance("#checkout-button-wrapper");
});
</script>

<style scoped lang="scss">
.cart {
	.cart-item {
		.product-image {
			height: 6.25rem;
			width: 6.25rem;
		}
	}

	.cart-items-enter-active,
	.cart-items-leave-active {
		transition: all 0.5s ease;
	}
	.cart-items-enter-from,
	.cart-items-leave-to {
		opacity: 0;
		transform: translateX(30px);
	}
}
</style>
