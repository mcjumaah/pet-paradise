<template>
	<form id="signup-form" class="signup-form d-flex flex-column row-gap-4" @submit.prevent="handleSignUp()" novalidate>
		<input type="email" style="display: none" />
		<input type="password" style="display: none" />

		<div class="form-floating">
			<input
				id="signup-email-input"
				class="form-control"
				:class="emailInputValidationClass"
				name="email"
				type="email"
				placeholder="name@example.com"
				aria-label="Email Address"
				autocomplete="off"
				required
				v-model="email"
			/>
			<label for="signup-email-input" class="text-muted">Email address</label>
			<div class="invalid-feedback">
				{{ errorMessage }}
			</div>
		</div>

		<template v-if="isEmailValid">
			<div class="form-floating">
				<input
					id="create-password-input"
					class="form-control"
					:class="passwordsInputValidationClass"
					name="create-password"
					type="password"
					placeholder="Create Password"
					aria-label="Password"
					required
					v-model="createdPassword"
				/>
				<label for="login-password-input" class="text-muted">Create Password</label>
			</div>
			<div class="form-floating">
				<input
					id="confirm-password-input"
					class="form-control"
					:class="passwordsInputValidationClass"
					name="confirm-password"
					type="password"
					placeholder="Confirm Password"
					aria-label="Password"
					required
					v-model="confirmedPassword"
				/>
				<label for="login-password-input" class="text-muted">Confirm Password</label>
				<div class="invalid-feedback">Passwords does not match each other.</div>
			</div>
		</template>

		<div
			id="signup-next-btn-wrapper"
			data-bs-toggle="tooltip"
			data-bs-title="Input email first."
			data-bs-trigger="hover"
			data-bs-placement="bottom"
			data-bs-offset="0,10"
			tabindex="0"
		>
			<button type="submit" class="btn btn-primary w-100 text-white" :disabled="isEmailInputEmpty || isLoading">
				<span v-if="isLoading" class="d-flex column-gap-1 align-items-center justify-content-center">
					<span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
					<span role="status">LOADING...</span>
				</span>
				<template v-else>NEXT</template>
			</button>
		</div>
	</form>
</template>

<script setup lang="ts">
import type { Customer } from "~/server/model/customer";
import formatFetchErrorResponseData from "~/utils/formatFetchError";

definePageMeta({
	auth: false,
});

const { $Tooltip: Tooltip } = useNuxtApp();
const signupCredentials = useSignupCredentials();

const email = ref<string>();
const createdPassword = ref<string>();
const confirmedPassword = ref<string>();
const isEmailValid = ref<boolean>();
const nextBtnTooltip = ref<typeof Tooltip.prototype>();
const arePasswordsMatch = ref<boolean>();
const isLoading = ref<boolean>();
const errorMessage = ref<string>();

const isEmailInputEmpty = computed(() => {
	if (typeof email.value !== "undefined" && email.value?.length > 0) {
		if (nextBtnTooltip.value) {
			nextBtnTooltip.value.disable();
		}
		return false;
	} else {
		if (nextBtnTooltip.value) {
			nextBtnTooltip.value.enable();
		}
		return true;
	}
});

const emailInputValidationClass = computed(() => {
	return isEmailValid.value === true
		? "is-valid"
		: isEmailValid.value === false && typeof email.value !== "undefined" && email.value?.length > 0
		? "is-invalid"
		: "";
});

const passwordsInputValidationClass = computed(() => {
	return arePasswordsMatch.value === true
		? "is-valid"
		: arePasswordsMatch.value === false &&
		  ((typeof createdPassword.value !== "undefined" && createdPassword.value?.length > 0) ||
				(typeof confirmedPassword.value !== "undefined" && confirmedPassword.value?.length > 0))
		? "is-invalid"
		: "";
});

watch(email, () => {
	if (typeof isEmailValid.value !== "undefined") {
		isEmailValid.value = undefined;
	}
});

watch([createdPassword, confirmedPassword], () => {
	if (arePasswordsMatch.value === true) {
		arePasswordsMatch.value = undefined;
	}
});

async function handleSignUp() {
	if (!isEmailValid.value) {
		if (email.value) {
			await validateInputEmail(email.value);
		} else {
			isEmailValid.value = false;
		}
	} else {
		arePasswordsMatch.value = createdPassword.value === confirmedPassword.value;

		if (arePasswordsMatch.value) {
			signupCredentials.value.email = email.value ? email.value : "";
			signupCredentials.value.password = confirmedPassword.value ? confirmedPassword.value : "";
		}
	}
}

async function validateInputEmail(email: string) {
	try {
		isLoading.value = true;

		const customer: { data: Customer } = await $fetch("/api/customer", {
			method: "GET",
			query: {
				email,
			},
		});

		isLoading.value = false;
		isEmailValid.value = customer ? false : true;
		errorMessage.value = "An account associated with this email address already exists.";
	} catch (error) {
		const errorResponse = formatFetchErrorResponseData(error);
		console.log(errorResponse?.statusCode);
		if (errorResponse?.statusCode == 400 && errorResponse?.statusMessage === "Invalid email") {
			isEmailValid.value = false;
			errorMessage.value = errorResponse.message;
		} else if (errorResponse?.statusCode == 404 && errorResponse?.statusMessage === "Customer Not Found") {
			isEmailValid.value = true;
		}
		isLoading.value = false;
	}
}

onMounted(() => {
	nextBtnTooltip.value = Tooltip.getOrCreateInstance("#signup-next-btn-wrapper");
});
</script>

<style scoped lang="scss">
.signup-form {
	input.form-control,
	button {
		font-size: 14px;
		height: 3.188rem;
	}
}
</style>