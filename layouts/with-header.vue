<template>
	<NuxtLayout name="default">
		<div class="with-header-root">
			<section class="page-header position-relative py-5">
				<div class="position-relative d-flex flex-column align-items-center z-1 text-white">
					<h2>{{ basePathTitle }}</h2>
					<Logo v-if="basePathTitle == 'About'" class="pt-3 pb-4" :isXl="true" />
					<p>
						<NuxtLink to="/">Home</NuxtLink> > <span class="poppins-bold">{{ basePathTitle }}</span>
					</p>
				</div>
				<img :src="currentBgImg" class="position-absolute top-0 w-100 h-100 object-fit-cover opacity-25 z-0 bg-white" />
			</section>
			<slot />
		</div>
	</NuxtLayout>
</template>

<script setup lang="ts">
const bgImages = [
	{ basePathTitle: "Shop", src: "/images/header-bg/shop.png" },
	{ basePathTitle: "About", src: "/images/header-bg/about.png" },
	{ basePathTitle: "Contact", src: "/images/header-bg/contact.png" },
	{ basePathTitle: "Account", src: "/images/header-bg/account.png" },
];

const basePathTitle = useRoutePathTitle();
const currentBgImg = computed(() => {
	let computedObject = bgImages.find((obj) => obj.basePathTitle == basePathTitle.value);
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

			&:hover {
				text-decoration: underline;
			}
		}

		p {
			font-size: 18px;
		}
	}
}
</style>
