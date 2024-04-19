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
			<label for="signup-email-input" class="text-muted required-asterisk">Email address</label>
			<div class="invalid-feedback">
				{{ errorMessage }}
			</div>
		</div>

		<template v-if="isEmailValid">
			<div class="form-floating">
				<input
					id="create-password-input"
					class="form-control"
					:class="passwordValidation?.isStrong ? 'is-valid ' : passwordsInputValidationClass"
					name="create-password"
					type="password"
					placeholder="Create Password"
					aria-label="Password"
					required
					v-model="createdPassword"
				/>
				<label for="login-password-input" class="text-muted required-asterisk">Create Password</label>
				<div class="invalid-feedback">Passwords is Weak.</div>
			</div>
			<div class="form-floating">
				<input
					id="confirm-password-input"
					class="form-control"
					:class="passwordValidation?.isStrong ? passwordsInputValidationClass : ''"
					name="confirm-password"
					type="password"
					placeholder="Confirm Password"
					aria-label="Password"
					required
					v-model="confirmedPassword"
				/>
				<label for="login-password-input" class="text-muted required-asterisk">Confirm Password</label>
				<div v-if="passwordValidation?.isStrong" class="invalid-feedback">Passwords do not match.</div>
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
import type { CustomerProjection } from "~/server/projections/customerProjections";
import type { PasswordValidation } from "~/server/utils/customerValidation";
import formatFetchErrorResponseData from "~/utils/formatFetchError";

definePageMeta({
	auth: false,
});

const { $Tooltip: Tooltip } = useNuxtApp();
const signupCredentials = useSignupCredentials();

const email = ref<string>();
const createdPassword = ref<string>();
const confirmedPassword = ref<string>();
const passwordValidation = ref<PasswordValidation>();
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
		: (arePasswordsMatch.value === false &&
				((typeof createdPassword.value !== "undefined" && createdPassword.value?.length > 0) ||
					(typeof confirmedPassword.value !== "undefined" && confirmedPassword.value?.length > 0))) ||
		  (!passwordValidation.value?.isStrong && typeof passwordValidation.value !== "undefined")
		? "is-invalid"
		: "";
});

watch(email, () => {
	if (typeof isEmailValid.value !== "undefined") {
		isEmailValid.value = undefined;
	}
});

watch([createdPassword, confirmedPassword], async () => {
	if (createdPassword.value) {
		validateInputPassword(createdPassword.value);
	}

	if (typeof arePasswordsMatch.value !== "undefined") {
		arePasswordsMatch.value = undefined;
	}
});

async function handleSignUp() {
	isLoading.value = true;
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
			isLoading.value = false;

			navigateTo("/signup/create-account");
		}
	}
	isLoading.value = false;
}

async function validateInputEmail(email: string) {
	try {
		isLoading.value = true;

		let customerAvailabilty: { available: boolean; customer: CustomerProjection | null };
		const { data } = await $fetch("/api/customer/validate-new-email", {
			method: "GET",
			query: {
				email,
			},
		});

		customerAvailabilty = data;

		isEmailValid.value = customerAvailabilty.available;
		errorMessage.value = isEmailValid.value ? undefined : "An account associated with this email address already exists.";
		isLoading.value = false;
	} catch (error) {
		const errorResponse = formatFetchErrorResponseData(error);
		console.log(errorResponse?.statusCode);
		if (errorResponse?.statusCode == 400 && errorResponse?.statusMessage === "Invalid email") {
			isEmailValid.value = false;
			errorMessage.value = errorResponse.message;
		} else {
			alert(error);
		}
		isLoading.value = false;
	}
}

const validateInputPassword = _Debounce(async (password: string) => {
	try {
		const { data } = await $fetch("/api/customer/validate-new-password", {
			method: "GET",
			query: {
				password,
			},
		});
		passwordValidation.value = data;
	} catch (error) {
		alert(error);
	}
}, 500);

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
