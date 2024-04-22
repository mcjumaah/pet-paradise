<template>
	<div class="product-loading-card card text-start shadow bg-body-2 text-decoration-none" title="Product Loading">
		<div class="img-placeholder card-img-top placeholder-glow">
			<span class="placeholder w-100 h-100"></span>
		</div>
		<div class="card-body d-flex flex-column justify-content-between transition-all">
			<p class="card-title line-clamp-2 placeholder-wave">
				<span class="placeholder col-12"></span>
				<span class="placeholder col-6"></span>
			</p>
			<p class="price card-text text-primary-emphasis placeholder-wave">
				<span class="placeholder col-5 h-100"></span>
			</p>
		</div>
	</div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.product-loading-card {
	overflow: clip;

	.img-placeholder {
		height: 188px;
		width: 188px;
	}
}
</style>
