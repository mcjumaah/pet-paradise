<template>
	<div class="who-we-serve-card card shadow rounded transition-all">
		<div class="grid flex-column h-100">
			<div class="card-img g-col-6">
				<img :src="props.imgSrc" class="object-fit-cover rounded-start w-100 h-100" alt="CARD IMAGE" />
			</div>

			<div
				class="card-body g-col-6 text-center bg-body-2 d-flex flex-column align-items-center justify-content-center h-100"
			>
				<h4 class="card-title poppins-bold">{{ props.title }}</h4>
				<p class="card-text text-muted poppins-medium">
					<slot />
				</p>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
export interface Props {
	imgSrc?: string;
	title?: string;
}
const props = withDefaults(defineProps<Props>(), {
	title: "TITLE HERE",
});
</script>

<style scoped lagn="scss">
.who-we-serve-card.card {
	max-width: 27.5rem;
	overflow: clip;

	@media (min-width: 768px) {
		max-width: 17.5rem;
	}
	@media (min-width: 992px) {
		max-width: 27.5rem;
	}
	@media (min-width: 1200px) {
		max-width: 31.5rem;
	}

	&:hover {
		--bs-box-shadow: 0 10px 15px -3px rgb(136 21 37 / 0.1), 0 4px 6px -4px rgb(136 21 37 / 0.1);
	}

	.grid {
		--bs-gap: 0;

		display: grid;

		@media (min-width: 768px) {
			display: flex;
		}
		@media (min-width: 992px) {
			display: grid;
		}
	}
}
</style>
