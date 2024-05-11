<template>
	<div class="my-purchase-page">
		<ul class="nav nav-tabs">
			<li class="nav-item">
				<a class="nav-link active" aria-current="page" href="#">All</a>
			</li>
			<li class="nav-item">
				<a class="nav-link" href="#">To Ship</a>
			</li>
			<li class="nav-item">
				<a class="nav-link" href="#">To Receive</a>
			</li>
			<li class="nav-item">
				<a class="nav-link" href="#">Completed</a>
			</li>
		</ul>

		<section class="purchases-wrapper d-flex flex-column gap-3 py-4 px-2 bg-white border border-top-0 rounded-bottom">
			<template v-if="orders?.content.length && orders?.content.length > 0">
				<div
					v-for="(order, index) in orders?.content"
					:key="`${index} - ${order.id}`"
					class="order card bg-body-2 shadow-sm"
				>
					<div class="card-body d-flex flex-column">
						<ul class="list-group list-group-flush">
							<li
								v-for="(product, index) in order.orderItems"
								:key="`${index} - ${product.id}`"
								class="d-flex list-group-item bg-transparent gap-3"
							>
								<img :src="product.previewImage" class="order-product-item" :alt="`${product.name.slice(0, 10)} Image`" />
								<ul class="d-flex flex-column ps-0">
									<li class="line-clamp-1">{{ product.name }}</li>
									<li class="line-clamp-1 text-secondary">{{ formattedVarieties(product.selection) }}</li>
									<li class="line-clamp-1 text-muted">x{{ product.quantity }}</li>
								</ul>
								<p class="text-primary mt-auto">₱{{ parseInt(product.totalPrice.toString()) }}</p>
							</li>
						</ul>
						<p class="d-flex pt-3 pe-3 mb-0 border-top w-100 text-end justify-content-end align-items-center gap-2">
							Order total:
							<span class="text-primary-emphasis fs-4">₱{{ parseInt(order.orderTotalPrice.toString()) }}</span>
						</p>
					</div>
				</div>
			</template>

			<div
				v-else
				class="empty-purchases-placeholder d-flex flex-column w-100 justify-content-center align-items-center row-gap-2"
			>
				<img class="empty-box-image opacity-75" src="/images/icons/empty-box.png" alt="Empty Cart" />
				<h4 class="text-muted text-center">
					No purchases yet. Add order producst from the <NuxtLink to="/shop">Shop</NuxtLink>.
				</h4>
			</div>
		</section>
	</div>
</template>

<script setup lang="ts">
import type { OrdersPaginatedProjection } from "~/server/projections/orderProjections";
import type { SelectionOnPriceProjection } from "~/server/projections/selectionProjection";

const { $currentUserHelper } = useNuxtApp();
const currentUserHelper = $currentUserHelper();

const {
	data: orders,
	pending: isFetchingOrders,
	error: fetchingOrdersError,
	execute: fetchOrders,
} = await useFetch("/api/orders", {
	method: "GET",
	query: {
		customerId: currentUserHelper.userData?.id,
	},
	transform: (_orders) => _orders.data as OrdersPaginatedProjection,
});

function formattedVarieties(varieties: SelectionOnPriceProjection[]) {
	let formatted: string = "";

	for (let [index, selection] of varieties.entries()) {
		formatted =
			formatted +
			(index === 0 ? " " : "") +
			`${selection.name}: ${selection.variety}` +
			(index > varieties.length ? "," : "");
	}

	return formatted;
}
</script>

<style scoped lang="scss">
.my-purchase-page {
	.purchases-wrapper {
		.order-product-item {
			height: 81.7px;
			width: 81.7px;
		}

		.empty-purchases-placeholder {
			height: 182.1px;

			.empty-box-image {
				height: 5rem;
				width: 5rem;
			}
		}
	}
}
</style>
