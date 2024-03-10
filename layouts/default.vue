<template>
	<div>
		<TopNavbar class="top-navbar shadow-sm position-absolute top-0 w-100 z-3" />
		<slot />
		<Footer />
	</div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.top-navbar {
	height: 92px;
}
</style>
