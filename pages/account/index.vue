<template>
	<div>Account Page</div>
</template>

<script setup lang="ts">
definePageMeta({
	middleware: [
		function () {
			return navigateTo("/account/my-account");
		},
	],
});
</script>

<style scoped lang="scss"></style>
