<template>
	<menu class="nav-pages d-flex gap-5 poppins-medium ps-0">
		<NuxtLink to="/">Home</NuxtLink>
		<NuxtLink to="/shop">Shop</NuxtLink>
		<NuxtLink to="/about">About</NuxtLink>
		<NuxtLink to="/contact">Contact</NuxtLink>
	</menu>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
menu.nav-pages {
	:deep(a) {
		color: rgba(0, 0, 0, 0.75);
		text-decoration: none;
		&:hover {
			text-decoration: underline;
			color: var(--bs-primary-text-emphasis);
		}
	}

	.router-link-exact-active {
		color: var(--bs-primary);
	}
}
</style>
