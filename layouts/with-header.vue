<template>
	<NuxtLayout name="default">
		<div class="with-header-root">
			<section class="page-header position-relative py-5">
				<div class="position-relative d-flex flex-column align-items-center z-1 text-white">
					<h2>{{ finalComputedPathTitle }}</h2>
					<Logo v-if="pathTitle == 'About'" class="pt-3 pb-4" :isXl="true" />
					<PagePathDisplay :finalPathTitle="finalComputedPathTitle" />
				</div>
				<img :src="currentBgImg" class="position-absolute top-0 w-100 h-100 object-fit-cover opacity-25 z-0 bg-white" />
			</section>
			<slot />
		</div>
	</NuxtLayout>
</template>

<script setup lang="ts">
const { $routePathHelper: routePath } = useNuxtApp();

const bgImages = [
	{ pathTitle: "Shop", src: "/images/header-bg/shop.png" },
	{ pathTitle: "About", src: "/images/header-bg/about.png" },
	{ pathTitle: "Contact", src: "/images/header-bg/contact.png" },
	{ pathTitle: "Account", src: "/images/header-bg/account.png" },
	{ pathTitle: "Cart", src: "/images/header-bg/cart.png" },
	{ pathTitle: "Checkout", src: "/images/header-bg/checkout.png" },
];

const pathTitle = computed(() => {
	return routePath().title();
});
const basePathTitle = computed(() => {
	return routePath().title(0);
});
const finalComputedPathTitle = computed(() => {
	return basePathTitle.value === "Account" ? basePathTitle.value : pathTitle.value;
});
const currentBgImg = computed(() => {
	let computedObject = bgImages.find((obj) => obj.pathTitle == finalComputedPathTitle.value);
	return computedObject?.src ? computedObject.src : "/images/header-bg/shop.png";
});
</script>

<style scoped lang="scss">
.with-header-root {
	padding-top: 92px;

	.page-header {
		overflow: clip;
		background: rgb(136, 21, 37);
		background: linear-gradient(120deg, rgba(136, 21, 37, 1) 0%, rgba(176, 103, 31, 1) 100%);
	}
}
</style>
