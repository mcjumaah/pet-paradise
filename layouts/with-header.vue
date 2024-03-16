<template>
	<NuxtLayout name="default">
		<div class="with-header-root">
			<section class="page-header position-relative py-5">
				<div class="position-relative d-flex flex-column align-items-center z-1 text-white">
					<h2>{{ pathTitle }}</h2>
					<Logo v-if="pathTitle == 'About'" class="pt-3 pb-4" :isXl="true" />
					<p>
						<NuxtLink to="/">Home</NuxtLink> > <span class="poppins-bold">{{ pathTitle }}</span>
					</p>
				</div>
				<img :src="currentBgImg" class="position-absolute top-0 w-100 h-100 object-fit-cover opacity-25 z-0" />
			</section>
			<slot />
		</div>
	</NuxtLayout>
</template>

<script setup lang="ts">
const route = useRoute();
const bgImages = [
	{ path: "/shop", src: "/images/header-bg/shop.png" },
	{ path: "/about", src: "/images/header-bg/about.png" },
];

const pathTitle = computed(() => {
	let currentPath = route.path;
	return currentPath.replace("/", "").charAt(0).toUpperCase() + currentPath.slice(2);
});
const currentBgImg = computed(() => {
	let computedObject = bgImages.find((obj) => obj.path == route.path);
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

		:deep(a) {
			color: white;
			text-decoration: none;
		}

		p {
			font-size: 18px;
		}
	}
}
</style>
