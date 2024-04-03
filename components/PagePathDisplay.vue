<template>
	<div class="page-path-display d-flex column-gap-2 align-items-center" :class="isOnPoductPage ? 'on-product-page' : ''">
		<NuxtLink to="/">Home</NuxtLink> >
		<template v-for="(path, index) in pathArr">
			<span v-if="getIsNotLastPathArrSegment(index) && basePathTitle !== 'Account'" class="d-flex column-gap-2">
				<NuxtLink :to="getPathPerSegment(index)">{{ routePath().title(index) }}</NuxtLink> >
			</span>
		</template>
		<span class="text-truncate" :class="isOnPoductPage ? '' : 'poppins-bold  '">
			<span v-if="isOnPoductPage" class="text-muted me-1">| </span>
			{{ props.finalPathTitle || pathTitle }}
		</span>
	</div>
</template>

<script setup lang="ts">
const { $routePathHelper: routePath } = useNuxtApp();

export interface Props {
	finalPathTitle?: string;
	isOnPoductPage?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	isOnPoductPage: false,
});

const pathArr = routePath().arr;

const pathTitle = computed(() => {
	return routePath().title();
});
const basePathTitle = computed(() => {
	return routePath().title(0);
});

function getIsNotLastPathArrSegment(index: number) {
	return pathArr.value.length > 0 && pathArr.value.length !== index + 1;
}
function getPathPerSegment(currentIndex: number) {
	let path = "";
	for (let i = 0; i <= currentIndex; i++) {
		path = `${path}/${pathArr.value[i]}`;
	}
	return path;
}
</script>

<style scoped lang="scss">
.page-path-display {
	font-size: 18px;

	:deep(a) {
		color: white;
		text-decoration: none;

		&:hover {
			text-decoration: underline;
		}
	}

	&.on-product-page {
		font-size: 16px;

		:deep(a) {
			color: var(--bs-secondary-color);
			text-decoration: none;

			&:hover {
				text-decoration: underline;
			}
		}
	}
}
</style>
