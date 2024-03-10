<template>
	<div class="by-pet-card cursor-pointer">
		<div
			class="position-relative rounded-4"
			:style="{
				backgroundImage: `url(${props.bgImage})`,
			}"
		>
			<span class="poppins-bold text-white opacity-75 position-absolute z-2 transition-all">
				<slot name="title">Title</slot>
			</span>
			<div class="overlay-gradient position-absolute z-0 h-100 w-100 transition-all"></div>
			<div class="overlay-plain position-absolute z-0 h-100 w-100 transition-all"></div>
		</div>
		<p class="fs-5 poppins-medium mt-2 transition-all">
			<slot name="description" class="link-underline-primary">Description Lorem ipsum dolor sit amet consectetur</slot>
		</p>
	</div>
</template>

<script setup lang="ts">
export interface Props {
	bgImage?: string;
}
const props = withDefaults(defineProps<Props>(), {});
</script>

<style lang="scss" scoped>
.by-pet-card {
	& > div {
		height: 21.875rem;
		width: 29.625rem;
		overflow: clip;
		font-size: 80px;
	}

	& > div > span {
		left: 12.5px;
		bottom: 12.5px;
	}
	&:hover > div > span {
		bottom: 50%;
		left: 50%;
		transform: translate(-50%, 50%);
		font-size: 125px;
	}

	.overlay-gradient {
		background: rgb(176, 103, 31);
		background: linear-gradient(20deg, rgba(176, 103, 31, 1) 0%, rgba(176, 103, 31, 0) 60%);
		opacity: 1;
	}
	.overlay-plain {
		background: rgb(176, 103, 31);
		opacity: 0;
	}
	&:hover .overlay-gradient {
		opacity: 0;
	}
	&:hover .overlay-plain {
		opacity: 0.75;
	}

	&:hover > p {
		text-decoration-line: underline;
		text-underline-offset: 2px;
	}
}
</style>
