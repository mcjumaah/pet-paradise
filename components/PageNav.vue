<template>
	<div class="nav-pages">
		<menu
			v-if="isOnTopbar"
			class="is-on-topbar d-flex flex-column flex-lg-row row-gap-3 py-2 py-lg-0 column-gap-5 poppins-medium ps-0"
		>
			<NuxtLink to="/" prefetch>Home</NuxtLink>
			<NuxtLink to="/shop" :class="basePathTitle === 'Shop' ? 'router-link-active' : ''" prefetch>Shop</NuxtLink>
			<NuxtLink to="/about" prefetch>About</NuxtLink>
			<NuxtLink to="/contact" prefetch>Contact</NuxtLink>
		</menu>
		<menu v-else class="d-flex column-gap-5 poppins-medium ps-0">
			<NuxtLink to="/" prefetch>Home</NuxtLink>
			<NuxtLink to="/shop" :class="basePathTitle === 'Shop' ? 'router-link-active' : ''" prefetch>Shop</NuxtLink>
			<NuxtLink to="/about" prefetch>About</NuxtLink>
			<NuxtLink to="/contact" prefetch>Contact</NuxtLink>
		</menu>
	</div>
</template>

<script setup lang="ts">
export interface Props {
	isOnTopbar?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
	isOnTopbar: false,
});

const { $routePathHelper: routePath } = useNuxtApp();

const basePathTitle = computed(() => {
	return routePath().title(0);
});
</script>

<style scoped lang="scss">
.nav-pages > menu {
	:deep(a) {
		display: flex;
		align-items: center;
		height: 3rem;
		padding-inline: 1.5rem;
		border-radius: 0.25rem;
		color: rgba(0, 0, 0, 0.75);
		font-size: larger;
		text-decoration: none;

		@media (min-width: 992px) {
			font-size: 1rem;
			padding-inline: 0;
		}

		&.router-link-active {
			background-color: var(--bs-primary);
			color: white;

			@media (min-width: 992px) {
				background-color: inherit;
				color: var(--bs-primary);
			}
		}

		&:hover {
			text-decoration: underline;
			background-color: var(--bs-primary-text-emphasis);
			color: white;

			@media (min-width: 992px) {
				background-color: inherit;
				color: var(--bs-primary-text-emphasis);
			}
		}
	}

	&:not(.is-on-topbar) {
		:deep(a) {
			font-size: 1rem;
			padding-inline: 0;

			&.router-link-exact-active {
				background-color: inherit;
				color: var(--bs-primary);
			}

			&:hover {
				background-color: inherit;
				color: var(--bs-primary-text-emphasis);
			}
		}
	}
}
</style>
