<template>
	<div class="login-form d-flex flex-column row-gap-4">
		<input type="text" class="form-control" placeholder="Email Address" aria-label="Email Address" />

		<button class="btn btn-primary w-100 text-white">NEXT</button>
	</div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.login-form {
	input.form-control,
	button {
		font-size: 14px;
		height: 3.188rem;
	}
}
</style>
