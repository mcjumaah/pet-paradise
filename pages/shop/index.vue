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
							<img src="/svg/chevron-left.svg" alt="Left Arrow" />
						</button>
						<button
							class="btn btn-primary d-flex align-items-center"
							type="button"
							title="Next"
							:disabled="pagination.currentPage == pagination.totalPages"
							@click="pagination.currentPage++"
						>
							<img src="/svg/chevron-left.svg" class="rotate-180" alt="Right Arrow" />
						</button>
					</div>
				</div>
			</div>
		</div>

		<div class="products container grid gap-4 py-4">
			<NuxtLink
				v-for="(product, index) in dummyProducts"
				:key="`${product.id} - ${index}`"
				:to="`/shop/${product.id}`"
				class="card text-start shadow bg-body-2"
				:title="product.name"
			>
				<img class="card-img-top" :src="product.images[0]" />
				<div class="card-body transition-all">
					<p class="card-title line-clamp-2">
						{{ product.name }}
					</p>
					<p class="price card-text text-primary-emphasis">{{ product.price }}</p>
				</div>
			</NuxtLink>
		</div>

		<nav class="pagination-bottom py-3" aria-label="Shop Products Botom Pagination">
			<ul class="pagination">
				<li class="page-item" :class="pagination.currentPage == 1 ? 'disabled' : ''">
					<a class="page-link" href="#" title="Previous" @click="pagination.currentPage--">
						<img src="/svg/chevron-left-primary.svg" alt="Left Arrow" />
					</a>
				</li>
				<template v-for="index in pagination.totalPages">
					<li v-if="getPageIsToDisplay(index)" class="page-item" :class="index == pagination.currentPage ? 'active' : ''">
						<a class="page-link" href="#" @click="pagination.currentPage = index">{{ index }}</a>
					</li>
				</template>
				<li class="page-item" :class="pagination.currentPage == pagination.totalPages ? 'disabled' : ''">
					<a class="page-link" href="#" title="Next" @click="pagination.currentPage++">
						<img src="/svg/chevron-left-primary.svg" class="rotate-180" alt="Right Arrow" />
					</a>
				</li>
			</ul>
		</nav>
	</section>
</template>

<script setup lang="ts">
const dummyProductTypes = ["Food & Treats", "Supplies", "Toys", "Clothing & Accessories", "Health & Wellness"];
const dummyProducts = useDummyProducts();

const pagination = ref({
	currentPage: 1,
	totalPages: 17,
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
	}
}
</style>
