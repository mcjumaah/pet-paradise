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

		<ClientOnly>
			<TransitionGroup key="cart-items-transition-group" name="cart-items" tag="div" class="d-flex flex-column row-gap-2">
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
									<p class="card-text" :class="item.selection.length <= 0 ? 'line-clamp-3' : 'line-clamp-2'">
										{{ item.name }}
									</p>
									<p class="mb-0 text-muted">
										<template v-if="item.selection.length > 0">
											Variety:
											<span v-for="selection in item.selection" class="text-bg-secondary py-1 px-2 rounded text-white">{{
												selection.variety
											}}</span>
										</template>
									</p>
								</div>
							</div>
						</div>

						<div class="grid text-center w-75 align-items-center">
							<div title="Unit Price" class="g-col-3 d-flex justify-content-center">
								₱{{ parseInt(item.price.toString()) }}
							</div>
							<div title="Quantity" class="g-col-3 d-flex justify-content-center">
								<QuantitySelect
									v-model="item.quantity"
									on-click-customized
									@update-quantity="(quantity) => updatexItemQuantity(item.id, quantity)"
								/>
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

				<div
					v-if="cartItems?.content && cartItems?.content.length <= 0 && !isFetchingCartItems"
					key="cart-items-empty-placeholder"
					class="empty-cart-placeholder d-flex flex-column w-100 justify-content-center align-items-center row-gap-2"
				>
					<img class="empty-cart-image opacity-75" src="/images/icons/empty-cart.png" alt="Empty Cart" />
					<h4 class="text-muted">Cart is Empty. Add products from the <NuxtLink to="/shop">Shop</NuxtLink>.</h4>
				</div>
			</TransitionGroup>
		</ClientOnly>

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
				<button class="btn btn-primary" :disabled="isCheckingOut || selectedItemsId.length < 1" @click="setCheckoutItems()">
					<DynamicSpinnerLoader :loading="isCheckingOut">Check Out</DynamicSpinnerLoader>
				</button>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { ProductItem } from "~/server/model/productItem";
import type { ProductItemsPaginatedProjection } from "~/server/projections/productItemProjections";

type UpdateItem = {
	data: {
		statusCode: number;
		statusMessage: string;
		message: string;
		body: {
			productItem: ProductItem;
		};
	};
};

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
} = useFetch("/api/cart/items", {
	method: "GET",
	query: { cartId: currentUserCart.data?.id },
	transform: (_cartItems) => _cartItems.data as ProductItemsPaginatedProjection,
	watch: [deleteCartItemData],
});

const tooltips = ref(<CartTooltips>{});
const selectedItemsId = ref<number[]>([]);
const isCheckingOut = ref<boolean>(false);
const lastUpdatedCartItem = ref<ProductItem>();

const isSelectedAll = computed({
	get: () => selectedItemsId.value.length === cartItems.value?.content.length && cartItems.value?.content.length > 0,
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

const updatexItemQuantity = _Debounce(async (itemId: number, newQuantity: number) => {
	try {
		const response: UpdateItem = await $fetch("/api/cart/item/quantity", {
			method: "PUT",
			body: {
				cartItemId: itemId,
				quantity: newQuantity,
			},
		});

		lastUpdatedCartItem.value = response.data.body.productItem;
	} catch (error) {
		alert(error);
	}
}, 750);

function getIsDeletingItem(itemId: number) {
	return isDeletingCartItem.value && itemId === selectedItemIdToDelete.value;
}

function setCheckoutItems() {
	tooltips.value.checkout.disable();
	isCheckingOut.value = true;

	cartItems.value?.content.forEach((item, index) => {
		if (selectedItemsId.value.includes(item.id)) {
			const { id, status, ...otherProperties } = item;
			checkoutItems.value.push({
				id: index,
				productItemId: id,
				origin: "cart",
				...otherProperties,
			});
		}
	});

	setTimeout(async () => {
		isCheckingOut.value = false;

		await nextTick();
		navigateTo("/shop/cart/checkout");
	}, 750);
	tooltips.value.checkout.enable();
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

	.empty-cart-placeholder {
		height: 132px;
		border: 2.35px dashed var(--bs-dark-border-subtle);
		border-radius: 6px;

		.empty-cart-image {
			height: 3.5rem;
			width: 3.5rem;
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
