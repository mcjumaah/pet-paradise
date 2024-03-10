<template>
	<div>
		<section class="hero">
			<div class="container d-flex flex-column gap-3 mt-5 pt-4 z-2 position-relative">
				<h1 class="poppins-bold w-75">Where Pet Lovers Shop for All Their Furry Friends’ Needs</h1>
				<p class="fs-5 w-50">
					Paws and shop! Find everything your furry friend needs with ease. Treats, toys, and more, just a click away!
				</p>
				<button
					type="button"
					class="btn btn-secondary rounded-pill fs-4 poppins-medium py-3 px-4 w-fit mt-2 shadow transition-all"
				>
					Show Now
				</button>
			</div>
		</section>

		<section class="deals-by-pet container py-5">
			<h2 class="text-center poppins-bold">Deals By Pet</h2>
			<div class="d-flex gap-5 justify-content-center mt-5">
				<ByPetCard bgImage="/images/by-dog.png">
					<template #title>DOG</template>
					<template #description> Everything you need for your Dog</template>
				</ByPetCard>
				<ByPetCard bgImage="/images/by-cat.png">
					<template #title>CAT</template>
					<template #description> Everything you need for your Cat</template>
				</ByPetCard>
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
	</div>
</template>

<script setup lang="ts">
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
</style>
