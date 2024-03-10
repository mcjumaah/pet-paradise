<template>
	<div class="bg-body-2 border-3 border-top border-primary">
		<div class="container d-flex py-5 justify-content-between align-items-center">
			<Logo />
			<nav>
				<span class="poppins-medium text-muted">Links:</span>
				<PageNav />
			</nav>
		</div>
		<div class="copyright-footer container border-top border-3 border-primary pt-3 pb-4 ps-5 text-muted poppins-medium">
			2024 Pet Paradise. All rigths reserved
		</div>
	</div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.copyright-footer {
	font-size: 14px;
}
</style>
