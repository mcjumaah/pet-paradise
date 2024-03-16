<template>
	<div class="login-form d-flex flex-column row-gap-4">
		<input type="text" class="form-control" placeholder="Email Address" aria-label="Email Address" />
		<input type="text" class="form-control" placeholder="Password" aria-label="Password" />
		<div class="login-btn-wrapper d-flex flex-column">
			<button class="btn btn-primary w-100 text-white">LOG IN</button>
			<NuxtLink to="/forgot-password" class="link-secondary-sm">Forgot Password?</NuxtLink>
		</div>
	</div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.login-form {
	input.form-control,
	.login-btn-wrapper > button {
		font-size: 14px;
		height: 3.188rem;
	}
}
</style>
