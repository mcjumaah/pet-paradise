<template>
	<div>
		<section class="hero">
			<div class="container d-flex flex-column gap-3 mt-5 pt-4 z-2 position-relative">
				<h1 class="poppins-bold w-75">Where Pet Lovers Shop for All Their Furry Friends’ Needs</h1>
				<p class="fs-5 w-50">
					Paws and shop! Find everything your furry friend needs with ease. Treats, toys, and more, just a click away!
				</p>
				<NuxtLink
					to="/shop"
					class="btn btn-secondary rounded-pill fs-4 poppins-medium py-3 px-4 w-fit mt-2 shadow transition-all"
				>
					Shop Now
				</NuxtLink>
			</div>
		</section>

		<section class="deals-by-pet container py-5">
			<h2 class="text-center poppins-bold">Deals By Pet</h2>
			<div class="d-flex gap-5 justify-content-center mt-5">
				<CardByPet bgImage="/images/by-dog.png">
					<template #title>DOG</template>
					<template #description> Everything you need for your Dog</template>
				</CardByPet>
				<CardByPet bgImage="/images/by-cat.png">
					<template #title>CAT</template>
					<template #description> Everything you need for your Cat</template>
				</CardByPet>
			</div>
		</section>

		<section class="featured-brands d-flex flex-column gap-5 bg-body-3 py-5">
			<h2 class="text-center poppins-bold">Featured Brands</h2>
			<div class="d-flex row-gap-2 column-gap-5 flex-wrap justify-content-center">
				<div v-for="(product, index) in dummyFeaturedProducts" class="feat-brands-card">
					<template v-if="index < 4">
						<div class="card p-4 shadow transition-all">
							<img :src="product.imagePreview" class="h-100 object-fit-contain" alt="product" />
						</div>
						<p class="mt-3 fs-5 poppins-medium text-center transition-all">{{ product.name }}</p>
					</template>
				</div>
			</div>
			<button type="button" class="btn btn-primary-alt d-flex mx-auto fs-5 poppin-semibold px-5 py-2">Show More</button>
		</section>

		<section class="pet-service d-flex justify-content-center py-5 container">
			<div class="card bg-primary text-white border-0">
				<div class="card-body position-relative py-5 d-flex px-5">
					<div class="position-relative z-1 d-flex flex-column w-50 row-gap-2 mt-4">
						<h3 class="fs-1 poppins-bold">Pet Portraits Service</h3>
						<p class="poppins-medium">
							Personalized portraits capturing the unique characteristics and charm of each pet. Handcrafted artwork created
							by skilled artists, providing a timeless keepsake for pet owners. Options for various mediums including canvas,
							wood, and digital formats.
						</p>
						<button
							type="button"
							class="btn btn-secondary rounded-pill w-fit h-fit poppins-semibold py-2 px-3 shadow transition-all"
						>
							Order Now
						</button>
					</div>

					<img src="/images/pet-portraits.png" class="position-absolute bottom-0 end-0 h-100" alt="Pet Portraits" />
				</div>
				<div class="card-footer bg-secondary"></div>
			</div>
		</section>
	</div>
</template>

<script setup lang="ts">
definePageMeta({
	auth: false,
});

const dummyFeaturedProducts = [
	{
		name: "Pedigree",
		imagePreview: "/images/featured-products/pedigree.png",
	},
	{
		name: "Smart Heart",
		imagePreview: "/images/featured-products/smart-heart.png",
	},
	{
		name: "Joyhound",
		imagePreview: "/images/featured-products/joyhound.png",
	},
	{
		name: "Whiskas",
		imagePreview: "/images/featured-products/whiskas.png",
	},
];
</script>

<style lang="scss" scoped>
.hero {
	position: relative;
	padding-top: 92px;
	height: 100lvh;
	background: rgb(136, 21, 37);
	background: linear-gradient(124deg, rgba(136, 21, 37, 1) 0%, rgba(176, 103, 31, 1) 100%);
	color: #fff7f1;

	&::after {
		content: "";
		background: url("/images/hero-section-bg-cat-dog.png");
		background-size: cover;
		opacity: 0.5;
		inset: 0;
		position: absolute;
		z-index: 1;
		margin-top: 92px;
	}

	h1 {
		font-size: 2.8125rem;
		max-width: 702px;
	}
}

.deals-by-pet,
.featured-brands {
	h2 {
		font-size: 40px;
	}
}

.featured-brands {
	.feat-brands-card {
		.card {
			height: 19.938rem;
			width: 17.188rem;
		}
		&:hover {
			.card {
				background: var(--bs-secondary-bg-subtle);
				transform: scale(1.05);
			}
			p {
				color: var(--bs-primary-text-emphasis);
				text-decoration-line: underline;
				text-underline-offset: 2px;
				text-decoration-color: var(--bs-primary-text-emphasis);
			}
		}
	}
}

.pet-service {
	.card {
		max-width: 77.25rem;

		.card-body {
			min-height: 26.063rem;
			overflow: clip;

			div {
				width: 41%;
			}
		}
	}
}
</style>
