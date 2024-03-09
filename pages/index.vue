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
			<div class="d-flex gap-4 justify-content-around mt-5">
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
	</div>
</template>

<script setup lang="ts"></script>

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

.deals-by-pet {
	h2 {
		font-size: 40px;
	}
}
</style>
