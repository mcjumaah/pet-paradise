<template>
	<form id="login-form" class="login-form d-flex flex-column row-gap-4" @submit.prevent="handleSignIn()">
		<div v-if="route.query.email && hasCreatedNewCustomerAccount" class="alert alert-success" role="alert">
			Account Created! Try logging in.
		</div>

		<div class="form-floating">
			<input
				id="login-email-input"
				class="form-control"
				name="email"
				type="email"
				placeholder="name@example.com"
				aria-label="Email Address"
			/>
			<label for="login-email-input" class="text-muted">Email address</label>
		</div>
		<div class="form-floating">
			<input
				id="login-password-input"
				class="form-control"
				name="password"
				type="password"
				placeholder="Password"
				aria-label="Password"
			/>
			<label for="login-password-input" class="text-muted">Password</label>
		</div>

		<div class="login-btn-wrapper d-flex flex-column">
			<button type="submit" class="btn btn-primary w-100 text-white">LOG IN</button>
			<!-- <NuxtLink to="/forgot-password" class="link-secondary-sm">Forgot Password?</NuxtLink> -->
		</div>
	</form>
</template>

<script setup lang="ts">
definePageMeta({
	auth: {
		unauthenticatedonly: true,
		navigateauthenticatedto: "/",
	},
});

const { signIn } = useAuth();
const route = useRoute();
const hasCreatedNewCustomerAccount = useHasCreatedNewCustomerAccount();

function getLoginFormInputs() {
	const loginFormEl = document.getElementById("login-form") as HTMLFormElement;

	const emailInput = loginFormEl?.elements.namedItem("email") as HTMLInputElement;
	const passwordInput = loginFormEl?.elements.namedItem("password") as HTMLInputElement;

	return { emailInput, passwordInput };
}

function handleSignIn() {
	const { emailInput, passwordInput } = getLoginFormInputs();

	const emailVal = emailInput.value;
	const passwordVal = passwordInput.value;

	if (emailVal && passwordVal) {
		signIn("credentials", { emailVal, passwordVal });
	}
}

onMounted(() => {
	if (route.query.email && hasCreatedNewCustomerAccount) {
		const { emailInput } = getLoginFormInputs();

		emailInput.value = route.query.email as string;
	}
});

onBeforeRouteLeave(() => {
	hasCreatedNewCustomerAccount.value = false;
});
</script>

<style scoped lang="scss">
.login-form {
	input.form-control,
	.login-btn-wrapper > button {
		font-size: 14px;
		height: 3.188rem;
	}
}
</style>
