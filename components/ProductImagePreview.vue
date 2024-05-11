<template>
	<div class="product-images d-flex column-gap-3">
		<div class="product-images--column position-relative d-flex flex-column row-gap-1 justify-content-around">
			<template v-for="(image, index) in props.images" :key="`${image.id} ${image.id}`">
				<button v-if="currentStep > 0" class="top-prev-btn btn transition-all" type="button" @click="currentStep--">
					<img src="/svg/chevron-left-white.svg" />
				</button>
				<button
					v-if="getIsVisibleInImgCol(index)"
					class="product-images--column---item btn p-0 rounded-0 transition-all"
					:class="previewImage === image ? 'border border-3 border-primary' : ''"
					type="button"
					@click="previewImage = image"
				>
					<img class="w-100 h-100 position-relative z-1" :src="image" />
				</button>
				<button v-if="currentStep < maxStep" class="bottom-next-btn btn transition-all" type="button" @click="currentStep++">
					<img src="/svg/chevron-left-white.svg" />
				</button>
			</template>
		</div>
		<div class="product-images--selected d-flex border border-primary-subtle align-self-center">
			<img :src="previewImage" />
		</div>
	</div>
</template>

<script setup lang="ts">
export interface Props {
	images: string[];
}
const props = withDefaults(defineProps<Props>(), {});

const previewImage = ref<string | undefined>(props.images[0]);
const currentStep = ref(0);

const maxStep = computed(() => {
	let imagesNum = props.images.length;
	return imagesNum > 4 ? imagesNum - 4 : 0;
});

watch(
	() => props.images,
	() => {
		if (props.images.length > 0) {
			previewImage.value = props.images[0];
		}
	}
);

function getIsVisibleInImgCol(index: number) {
	return currentStep.value <= maxStep.value && currentStep.value <= index && index <= 3 + currentStep.value;
}
</script>

<style scoped lang="scss">
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
</style>
