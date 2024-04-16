<template>
	<form id="signup-form" class="login-form d-flex flex-column row-gap-4" autocomplete="off" @submit.prevent="">
		<input type="email" style="display: none" />
		<input type="password" style="display: none" />

		<div class="form-floating">
			<input
				id="signup-email-input"
				class="form-control"
				name="email"
				type="email"
				placeholder="name@example.com"
				aria-label="Email Address"
				autocomplete="off"
			/>
			<label for="signup-email-input" class="text-muted">Email address</label>
		</div>

		<div class="form-floating">
			<input
				id="create-password-input"
				class="form-control"
				name="create-password"
				type="password"
				placeholder="Create Password"
				aria-label="Password"
			/>
			<label for="login-password-input" class="text-muted">Create Password</label>
		</div>
		<div class="form-floating">
			<input
				id="confirm-password-input"
				class="form-control"
				name="confirm-password"
				type="password"
				placeholder="Confirm Password"
				aria-label="Password"
			/>
			<label for="login-password-input" class="text-muted">Confirm Password</label>
		</div>

		<button type="submit" class="btn btn-primary w-100 text-white">NEXT</button>
	</form>
</template>

<script setup lang="ts">
definePageMeta({
	auth: false,
});

const email = ref<string>();
const createdPassword = ref<string>();
const confirmedPassword = ref<string>();

function handleSignUp() {
	const signupFormEl = document.getElementById("signup-form") as HTMLFormElement;

	const emailInput = signupFormEl?.elements.namedItem("email") as HTMLInputElement;
	const createPasswordInput = signupFormEl?.elements.namedItem("create-password") as HTMLInputElement;
	const confirmPasswordInput = signupFormEl?.elements.namedItem("confirm-password") as HTMLInputElement;

	email.value = emailInput.value;
	createdPassword.value = createPasswordInput.value;
	confirmedPassword.value = confirmPasswordInput.value;
}
</script>

<style scoped lang="scss">
.login-form {
	input.form-control,
	button {
		font-size: 14px;
		height: 3.188rem;
	}
}
</style>
