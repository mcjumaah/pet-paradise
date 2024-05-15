<template>
	<div class="admin-page"></div>
</template>

<script setup lang="ts">
definePageMeta({
	middleware: [
		function () {
			return navigateTo("/admin/products");
		},
	],
});
</script>

<style scoped lang="scss"></style>
