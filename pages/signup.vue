<template>
	<form id="signup-form" class="login-form d-flex flex-column row-gap-4" @submit.prevent="handleSignUp()" novalidate>
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
				{{
					isStringValidEmail
						? "An account associated with this email address already exists."
						: "Please input a valid email address."
				}}
			</div>
		</div>

		<template v-if="isEmailValid">
			<div class="form-floating">
				<input
					id="create-password-input"
					class="form-control"
					name="create-password"
					type="password"
					placeholder="Create Password"
					aria-label="Password"
					required
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
					required
				/>
				<label for="login-password-input" class="text-muted">Confirm Password</label>
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
			<button type="submit" class="btn btn-primary w-100 text-white" :disabled="isEmailInputEmpty">NEXT</button>
		</div>
	</form>
</template>

<script setup lang="ts">
import type { Customer } from "~/server/model/customer";

definePageMeta({
	auth: false,
});

const { $Tooltip: Tooltip } = useNuxtApp();

const email = ref<string>();
const createdPassword = ref<string>();
const confirmedPassword = ref<string>();
const isEmailValid = ref<boolean>();
const nextBtnTooltip = ref<typeof Tooltip.prototype>();

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

const isStringValidEmail = computed(() => {
	let pattern = /^[^\s@]+@[^\s@]+\.com$/;

	if (email.value) {
		return pattern.test(email.value);
	} else {
		return undefined;
	}
});

watch(email, () => {
	if (typeof isEmailValid.value !== "undefined") {
		isEmailValid.value = undefined;
	}
});

const emailInputValidationClass = computed(() => {
	return isEmailValid.value === true
		? "is-valid"
		: isEmailValid.value === false && typeof email.value !== "undefined" && email.value?.length > 0
		? "is-invalid "
		: "";
});

async function handleSignUp() {
	if (email.value && isStringValidEmail.value) {
		isEmailValid.value = (await fetchCustomerByEmail(email.value))?.data ? false : true;
	} else {
		isEmailValid.value = false;
	}

	if (isEmailValid.value) {
	}
}

async function fetchCustomerByEmail(email: string) {
	try {
		const result: { data: Customer } = await $fetch("/api/customer", {
			method: "GET",
			query: {
				email,
			},
		});

		return result;
	} catch (error) {
		alert(error);
	}
}

onMounted(() => {
	nextBtnTooltip.value = Tooltip.getOrCreateInstance("#signup-next-btn-wrapper");
});
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
