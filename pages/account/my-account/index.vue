<template>
	<div>My Account Page</div>
</template>

<script setup lang="ts">
definePageMeta({
	middleware: [
		function () {
			return navigateTo("/account/my-account/profile");
		},
	],
});
</script>

<style scoped lang="scss"></style>
