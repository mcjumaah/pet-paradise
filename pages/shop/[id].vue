<template>
	<div class="product-page">
		<section class="product-page--path bg-body-3 py-4">
			<PagePathDisplay class="container" :finalPathTitle="product?.name" isOnPoductPage />
		</section>

		<section class="bg-body-2 pt-4">
			<div class="product-preview-action py-5 bg-white">
				<div class="container d-flex column-gap-5">
					<div class="product-images d-flex column-gap-3">
						<div class="product-images--column position-relative d-flex flex-column row-gap-1 justify-content-around">
							<template v-for="(image, index) in product?.images" :key="`${image.id} ${image.id}`">
								<button
									v-if="imgColSteps.current.value > 0"
									class="top-prev-btn btn transition-all"
									type="button"
									@click="imgColSteps.current.value--"
								>
									<img src="/svg/chevron-left-white.svg" />
								</button>
								<button
									v-if="getIsVisibleInImgCol(index)"
									class="product-images--column---item btn p-0 rounded-0 transition-all"
									:class="selectedPreviewImage === image ? 'border border-3 border-primary' : ''"
									type="button"
									@click="selectedPreviewImage = image"
								>
									<img class="w-100 h-100 position-relative z-1" :src="image" />
								</button>
								<button
									v-if="imgColSteps.current.value < imgColSteps.max.value"
									class="bottom-next-btn btn transition-all"
									type="button"
									@click="imgColSteps.current.value++"
								>
									<img src="/svg/chevron-left-white.svg" />
								</button>
							</template>
						</div>
						<div class="product-images--selected d-flex border border-primary">
							<img :src="selectedPreviewImage" />
						</div>
					</div>
					<div class="product-action">action</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script setup lang="ts">
const route = useRoute();

const product = useDummyProducts().value.find((product) => {
	if (product.id === parseInt(route.params.id as string)) {
		return product;
	}
});

const selectedPreviewImage = ref<string | undefined>(product?.images[0]);

const pageTitle = computed(() => {
	let maxLength = 20;
	let title: string;

	if (product?.name) {
		title = product?.name.length > maxLength ? product?.name.slice(0, maxLength - 3) + "..." : product?.name;
	} else {
		title = "Product";
	}

	return `${title} – Pet Paradise`;
});

const imgColSteps = {
	current: ref(0),
	max: computed(() => {
		let imagesNum = product?.images.length;
		return imagesNum ? imagesNum - 4 : 0;
	}),
};
function getIsVisibleInImgCol(index: number) {
	return (
		imgColSteps.current.value <= imgColSteps.max.value &&
		imgColSteps.current.value <= index &&
		index <= 3 + imgColSteps.current.value
	);
}

useSeoMeta({
	title: pageTitle,
	ogTitle: pageTitle,
});
</script>

<style scoped>
.product-page {
	padding-top: 92px;

	.product-images {
		.product-images--column {
			.product-images--column---item {
				height: 5.75rem;
				width: 5.75rem;
			}

			.top-prev-btn,
			.bottom-next-btn {
				content: url("/svg/chevron-left-white.svg");
				position: absolute;
				display: flex;
				left: 50%;
				background-color: black;
				padding: 0.5rem;
				opacity: 0.05;
				z-index: 20;

				&:hover {
					opacity: 0.25;
				}
			}
			.top-prev-btn {
				top: -0.175rem;
				transform: translateX(-50%) rotate(90deg);
			}
			.bottom-next-btn {
				bottom: 0;
				transform: translateX(-50%) rotate(-90deg);
			}
		}

		.product-images--column---item:hover {
			--bs-border-opacity: 1;
			border: var(--bs-border-width) var(--bs-border-style) var(--bs-border-color) !important;
			border-color: rgba(var(--bs-primary-rgb), var(--bs-border-opacity)) !important;
		}

		.product-images--selected {
			height: 26.563rem;
			width: 26.563rem;
		}
	}
}
</style>
