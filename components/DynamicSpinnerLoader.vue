<template>
	<div class="dynamic-spinner-loader">
		<template v-if="!loading">
			<slot />
		</template>
		<template v-else>
			<span class="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
			<span role="status">Loading...</span>
		</template>
	</div>
</template>

<script setup lang="ts">
export interface Props {
	loading: boolean;
}
const props = withDefaults(defineProps<Props>(), {
	loading: true,
});
</script>

<style scoped lang="scss"></style>
