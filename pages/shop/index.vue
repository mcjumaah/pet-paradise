<template>
	<section class="shop d-flex flex-column row-gap-2">
		<div class="sort-bar bg-body-3">
			<div class="container d-flex py-2 px-4 justify-content-between column-gap-5">
				<div class="filters d-flex align-items-center column-gap-3">
					<span class="text-nowrap">By Category:</span>
					<select id="pet-custom-form" class="pet form-select cursor-pointer">
						<option selected disabled>Pet</option>
						<option value="all">All</option>
						<option value="cat">Cat</option>
						<option value="dog">Dog</option>
					</select>

					<select id="product-type-custom-form" class="product-type form-select cursor-pointer">
						<option selected disabled>Item</option>
						<option value="all">All</option>
						<option v-for="pType in dummyProductTypes" value="cat">{{ pType }}</option>
					</select>
				</div>

				<div class="top-pagination d-flex align-items-center column-gap-3">
					<div class="page-number text-nowrap">
						<span class="current-page text-primary-emphasis">{{ pagination.currentPage }}</span> /
						<span clasa="total-pages">{{ pagination.totalPages }}</span>
					</div>
					<div class="next-prev-btn d-flex column-gap-2">
						<button
							class="btn btn-primary d-flex align-items-center"
							type="button"
							title="Previous"
							:disabled="pagination.currentPage == 1"
							@click="pagination.currentPage--"
						>
							<img src="/svg/chevron-left-white.svg" alt="Left Arrow" />
						</button>
						<button
							class="btn btn-primary d-flex align-items-center"
							type="button"
							title="Next"
							:disabled="pagination.currentPage == pagination.totalPages"
							@click="pagination.currentPage++"
						>
							<img src="/svg/chevron-left-white.svg" class="rotate-180" alt="Right Arrow" />
						</button>
					</div>
				</div>
			</div>
		</div>

		<div class="products container grid gap-4 py-4">
			<NuxtLink
				v-if="!pending && products.length > 0"
				v-for="(product, index) in products"
				:key="`${index} | P-${product.id}`"
				:to="`/shop/${product.id}`"
				class="card text-start shadow bg-body-2 text-decoration-none"
				:title="product.name"
			>
				<img
					class="card-img-top"
					:src="product.images ? product.images[0] : '/images/shop-products/no-image-placeholder.png'"
					:alt="`Image for ${product.name}`"
				/>
				<div class="card-body d-flex flex-column justify-content-between transition-all">
					<p class="card-title line-clamp-2">
						{{ product.name }}
					</p>
					<p class="price card-text text-primary-emphasis">{{ getProductPrice(product.price) }}</p>
				</div>
			</NuxtLink>

			<CardProductLoading v-else-if="pending" v-for="index in 10" />

			<div v-else class="empty-shop-placeholder g-col-12 d-flex flex-column align-items-center py-3">
				<div class="empty-shop-image">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 512 512"
						style="
							shape-rendering: geometricPrecision;
							text-rendering: geometricPrecision;
							image-rendering: optimizeQuality;
							fill-rule: evenodd;
							clip-rule: evenodd;
						"
					>
						<path
							d="M53.5 15.5c118.667-.167 237.334 0 356 .5 19.833 5.167 32.333 17.667 37.5 37.5.833 53.003.667 106.003-.5 159a174.706 174.706 0 0 0-30-19 8459.1 8459.1 0 0 1-1.5-130c-1.167-9.167-6.333-14.333-15.5-15.5-29.331-.5-58.665-.667-88-.5.167 39.335 0 78.668-.5 118-5.498 9.951-13.665 12.784-24.5 8.5a1814.814 1814.814 0 0 0-55-20.5 2125.12 2125.12 0 0 0-58 21.5c-9.86 2.649-17.027-.518-21.5-9.5-.5-39.332-.667-78.665-.5-118-29.335-.167-58.669 0-88 .5-7.066.447-11.9 3.947-14.5 10.5a9680.783 9680.783 0 0 0-1 277c1.167 9.167 6.333 14.333 15.5 15.5 37.665.5 75.332.667 113 .5a111.206 111.206 0 0 0 5 31.5c-42.667.667-85.333.667-128 0-19.833-5.167-32.333-17.667-37.5-37.5-.667-97.333-.667-194.667 0-292 5.349-19.848 17.849-32.515 37.5-38Zm130 32h96c.333 29.34 0 58.674-1 88a325.38 325.38 0 0 0-47-16 325.38 325.38 0 0 0-47 16c-1-29.326-1.333-58.66-1-88Z"
							style="opacity: 0.991"
						/>
						<path
							d="M325.5 199.5c49.218-4.29 90.718 11.377 124.5 47 35.617 43.087 44.95 91.421 28 145-5.316 14.806-12.816 28.306-22.5 40.5a578.306 578.306 0 0 1 39.5 41.5c1.367 19.294-7.133 25.794-25.5 19.5L432 455.5c-38.672 28.868-81.506 37.368-128.5 25.5-46.993-14.325-79.16-44.492-96.5-90.5-17.055-56.076-6.055-105.743 33-149 23.959-23.23 52.459-37.23 85.5-42Zm16 32c48.386 2.426 82.886 25.426 103.5 69 15.173 41.448 9.173 79.448-18 114-35.495 37.369-77.662 47.536-126.5 30.5-51.349-25.184-73.515-66.351-66.5-123.5 14.804-55.317 50.637-85.317 107.5-90Z"
							style="opacity: 0.988"
						/>
						<path
							d="M303.5 293.5c5.605-.592 10.939.241 16 2.5a796.785 796.785 0 0 0 24 23.5 796.785 796.785 0 0 0 24-23.5c8.722-4.236 16.555-3.069 23.5 3.5 3.333 6.667 3.333 13.333 0 20a796.785 796.785 0 0 0-23.5 24 796.785 796.785 0 0 0 23.5 24c4.236 8.722 3.069 16.555-3.5 23.5-6.667 3.333-13.333 3.333-20 0a796.785 796.785 0 0 0-24-23.5 796.785 796.785 0 0 0-24 23.5c-8.722 4.236-16.555 3.069-23.5-3.5-3.333-6.667-3.333-13.333 0-20a796.785 796.785 0 0 0 23.5-24 796.785 796.785 0 0 0-23.5-24c-5.323-11.126-2.823-19.793 7.5-26Z"
							style="opacity: 0.985"
						/>
					</svg>
				</div>
				<h4 class="mt-3 text-center">No Products Found.</h4>
			</div>
		</div>

		<nav class="pagination-bottom py-3" aria-label="Shop Products Botom Pagination">
			<ul class="pagination">
				<li class="page-item" :class="pagination.currentPage === 1 ? 'disabled' : ''">
					<a class="page-link" href="#" title="Previous" @click="pagination.currentPage--">
						<img src="/svg/chevron-left-primary.svg" alt="Left Arrow" />
					</a>
				</li>
				<template v-for="index in pagination.totalPages">
					<li v-if="getPageIsToDisplay(index)" class="page-item" :class="index === pagination.currentPage ? 'active' : ''">
						<a class="page-link" href="#" @click="pagination.currentPage = index">{{ index }}</a>
					</li>
				</template>
				<li class="page-item" :class="pagination.currentPage === pagination.totalPages ? 'disabled' : ''">
					<a class="page-link" href="#" title="Next" @click="pagination.currentPage++">
						<img src="/svg/chevron-left-primary.svg" class="rotate-180" alt="Right Arrow" />
					</a>
				</li>
			</ul>
		</nav>
	</section>
</template>

<script setup lang="ts">
import type { Pagination } from "~/app.vue";
import type { ProductSummaryProjection } from "~/server/projections/productProjections";
import type { Pagination as ServerPagination } from "~/server/utils/paginationUtil";

const dummyProductTypes = ["Food & Treats", "Supplies", "Toys", "Clothing & Accessories", "Health & Wellness"];

const route = useRoute();
const { query } = route;

const products = ref<ProductSummaryProjection[]>([]);
const pagination = ref(<Pagination>{
	currentPage: 1,
});

const pageNumQuery = computed(() => {
	return pagination.value.currentPage - 1;
});

const {
	data: productsData,
	pending,
	error,
	execute,
} = useFetch("/api/products", {
	method: "GET",
	query: { pageNum: pageNumQuery, search: query.search },
	immediate: false,
	transform: (_productsData) => {
		const data: { content: ProductSummaryProjection[]; pagination: ServerPagination } = _productsData.data;

		products.value = data.content;
		pagination.value.totalPages = data.pagination.totalPages;

		return data;
	},
});

watch(error, (newError) => {
	if (newError) {
		alert(newError);
	}
});

function getPageIsToDisplay(index: number) {
	if (pagination.value.currentPage < 3) {
		return index < 6;
	} else if (pagination.value.currentPage > pagination.value.totalPages - 3) {
		return index > pagination.value.totalPages - 5;
	} else {
		return index > pagination.value.currentPage - 3 && index < pagination.value.currentPage + 3;
	}
}
function getProductPrice(price: ProductSummaryProjection["price"]) {
	if (price === null) {
		return "FREE";
	} else if (price?.min === price?.max) {
		return `₱${price?.min}`;
	} else {
		return `₱${price?.min} - ₱${price?.max}`;
	}
}

onMounted(() => {
	execute();
});
</script>

<style scoped lang="scss">
.shop {
	.sort-bar {
		@media (min-width: 1200px) {
			padding-inline: 10vw;
		}
		.filters {
			font-size: 14px;

			select {
				font-size: 14px;
				min-width: 7.5rem;
				width: fit-content;
			}
		}
	}

	.products {
		width: fit-content;
		&.grid {
			--bs-columns: 3;
			@media (min-width: 992px) {
				--bs-columns: 4;
			}
			@media (min-width: 1200px) {
				--bs-columns: 5;
			}
		}

		.card {
			--product-img-size: 188px;
			width: var(--product-img-size);

			.card-img-top {
				height: var(--product-img-size);
			}
			.card-title {
				font-size: 12px;
			}

			&:hover {
				--bs-card-border-color: var(--bs-primary);
				--bs-box-shadow: 0 10px 15px -3px rgb(136 21 37 / 0.1), 0 4px 6px -4px rgb(136 21 37 / 0.1);

				background-color: #ffe4c9;
			}
		}

		.empty-shop-placeholder {
			.empty-shop-image {
				height: 5rem;
				width: 5rem;

				svg {
					opacity: 0.75;
				}
			}
		}
	}
}
</style>
