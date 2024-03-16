<template>
	<section class="shop d-flex flex-column row-gap-2">
		<div class="sort-bar bg-body-3">
			<div class="container d-flex py-2 px-4 justify-content-between column-gap-5">
				<div class="filters d-flex align-items-center column-gap-3">
					<span class="text-nowrap">By Category:</span>
					<select class="pet form-select" id="pet-custom-form">
						<option selected disabled>Pet</option>
						<option value="all">All</option>
						<option value="cat">Cat</option>
						<option value="dog">Dog</option>
					</select>

					<select class="product-type form-select" id="product-type-custom-form">
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
							:disabled="pagination.currentPage == 1"
							@click="pagination.currentPage--"
						>
							<img src="/svg/chevron-left.svg" alt="Left Arrow" />
						</button>
						<button
							class="btn btn-primary d-flex align-items-center"
							type="button"
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
			<div v-for="(product, index) in dummyProducts" :key="`${product.id} - ${index}`" class="card text-start shadow">
				<img class="card-img-top" :src="product.previewImg" />
				<div class="card-body bg-body-2">
					<p class="card-title line-clamp-2">
						{{ product.name }}
					</p>
					<p class="price card-text text-primary-emphasis">{{ product.price }}</p>
				</div>
			</div>
		</div>

		<nav class="pagination-bottom py-3" aria-label="Shop Products Botom Pagination">
			<ul class="pagination">
				<li class="page-item" :class="pagination.currentPage == 1 ? 'disabled' : ''">
					<a class="page-link" href="#" @click="pagination.currentPage--">
						<img src="/svg/chevron-left-primary.svg" alt="Left Arrow" />
					</a>
				</li>
				<template v-for="index in pagination.totalPages">
					<li v-if="getPageIsToDisplay(index)" class="page-item" :class="index == pagination.currentPage ? 'active' : ''">
						<a class="page-link" href="#" @click="pagination.currentPage = index">{{ index }}</a>
					</li>
				</template>
				<li class="page-item" :class="pagination.currentPage == pagination.totalPages ? 'disabled' : ''">
					<a class="page-link" href="#" @click="pagination.currentPage++">
						<img src="/svg/chevron-left-primary.svg" class="rotate-180" alt="Right Arrow" />
					</a>
				</li>
			</ul>
		</nav>
	</section>
</template>

<script setup lang="ts">
const dummyProductTypes = ["Food & Treats", "Supplies", "Toys", "Clothing & Accessories", "Health & Wellness"];
const dummyProducts = [
	{
		id: 1,
		name: "Dr Shiba Happy Tummy Healthy Dog Treats Snack - Dog Multivitamins - Dog Food for Digestive Care",
		price: "₱499",
		previewImg: "/images/shop-products/01.png",
	},
	{
		id: 2,
		name: "PEDIGREE DentaStix for Puppy – Dental Treats for Puppy, 56g. Daily Puppy Treats for Healthy Gums",
		price: "₱71",
		previewImg: "/images/shop-products/02.png",
	},
	{
		id: 3,
		name: "Dr. Shiba Happy Tummy Taster Pack - Beef 40g  Dog Treats Snack - Dog Food for Digestive Care",
		price: "₱99",
		previewImg: "/images/shop-products/03.png",
	},
	{
		id: 4,
		name: "Mandaue Foam Dog Bed",
		price: "₱735",
		previewImg: "/images/shop-products/04.png",
	},
	{
		id: 5,
		name: "BATTERY CAGE (3 DOOR/4 DOOR/5 DOOR) - Mr.Chuck",
		price: "₱990 - ₱1,290",
		previewImg: "/images/shop-products/05.png",
	},
	{
		id: 6,
		name: "Rojeco 3.2L Cat Drinking Fountain Filters 304 Stainless Steel Pet Fountains Filter Replacement",
		price: "₱329 - ₱629",
		previewImg: "/images/shop-products/06.png",
	},
	{
		id: 7,
		name: "Petcher Detick and Alprocide 1cc & 2cc with Free Syringe Anti Tick and Flea Spot on Treatment",
		price: "₱37 - ₱92",
		previewImg: "/images/shop-products/07.png",
	},
	{
		id: 8,
		name: "Alonefire 9LED 395nm Aluminum Alloy Mini UV Flashlight Travel Cat Dog Urine Money Detector Torch For AAA Battery",
		price: "₱75 - ₱79",
		previewImg: "/images/shop-products/08.png",
	},
	{
		id: 9,
		name: "Rojeco Cat Water Fountain Replaceable Activated Carbon Filters Filter For Pet Automatic Drinking",
		price: "₱179 - ₱529",
		previewImg: "/images/shop-products/09.png",
	},
	{
		id: 10,
		name: "Alonefire 9LED 395nm Aluminum Alloy Mini UV Flashlight Travel Cat Dog Urine Money Detector Torch For AAA Battery",
		price: "₱859",
		previewImg: "/images/shop-products/10.png",
	},
	{
		id: 11,
		name: "Alonefire 9LED 395nm Aluminum Alloy Mini UV Flashlight Travel Cat Dog Urine Money Detector Torch For AAA Battery",
		price: "₱859",
		previewImg: "/images/shop-products/11.png",
	},
	{
		id: 12,
		name: "Alonefire 9LED 395nm Aluminum Alloy Mini UV Flashlight Travel Cat Dog Urine Money Detector Torch For AAA Battery",
		price: "₱859",
		previewImg: "/images/shop-products/12.png",
	},
	{
		id: 13,
		name: "Alonefire 9LED 395nm Aluminum Alloy Mini UV Flashlight Travel Cat Dog Urine Money Detector Torch For AAA Battery",
		price: "₱859",
		previewImg: "/images/shop-products/13.png",
	},
	{
		id: 14,
		name: "Alonefire 9LED 395nm Aluminum Alloy Mini UV Flashlight Travel Cat Dog Urine Money Detector Torch For AAA Battery",
		price: "₱859",
		previewImg: "/images/shop-products/14.png",
	},
	{
		id: 15,
		name: "Alonefire 9LED 395nm Aluminum Alloy Mini UV Flashlight Travel Cat Dog Urine Money Detector Torch For AAA Battery",
		price: "₱859",
		previewImg: "/images/shop-products/15.png",
	},
];

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
		}
	}
}
</style>
