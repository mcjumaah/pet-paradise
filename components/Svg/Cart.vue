<template>
	<div
		class="d-flex"
		:style="{
			height: `${height}px`,
			width: `${width}px`,
		}"
	>
		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 28 28">
			<g clip-path="url(#a)">
				<path
					:fill="props.fill"
					d="M22.4 22.4a2.8 2.8 0 1 1-2.8 2.8 2.79 2.79 0 0 1 2.8-2.8ZM0 0h4.578l1.316 2.8H26.6A1.4 1.4 0 0 1 28 4.2c0 .238-.07.476-.168.7l-5.012 9.058a2.815 2.815 0 0 1-2.45 1.442H9.94l-1.26 2.282-.042.168a.35.35 0 0 0 .35.35H25.2V21H8.4a2.8 2.8 0 0 1-2.8-2.8c0-.49.126-.952.336-1.344l1.904-3.43L2.8 2.8H0V0Zm8.4 22.4a2.8 2.8 0 1 1-2.8 2.8 2.79 2.79 0 0 1 2.8-2.8ZM21 12.6l3.892-7H7.196l3.304 7H21Z"
				/>
			</g>
			<defs>
				<clipPath id="a"><path fill="#fff" d="M0 0h28v28H0z" /></clipPath>
			</defs>
		</svg>
	</div>
</template>

<script setup lang="ts">
export interface Props {
	height: number;
	width: number;
	fill: string;
}
const props = withDefaults(defineProps<Props>(), {
	height: 28,
	width: 28,
	fill: "#000",
});
</script>

<style scoped lang="scss"></style>
