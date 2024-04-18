<template>
	<form id="create-account-form" class="create-account-form d-flex flex-column row-gap-4" @submit.prevent="" novalidate>
		<input type="text" style="display: none" />

		<BSFormFloatingInput
			inputId="create-account-first-name"
			inputType="string"
			inputName="first-name"
			inputPlaceholder="Vincent"
			inputRequired
			v-model="customerForm.firstName"
		/>
		<div class="d-flex column-gap-3">
			<BSFormFloatingInput
				inputId="create-account-middle-name"
				inputType="string"
				inputName="middle-name"
				inputPlaceholder="Guazon"
				v-model="customerForm.middleName"
			/>
			<BSFormFloatingInput
				inputId="create-account-last-name"
				inputType="string"
				inputName="last-name"
				inputPlaceholder="Esplana"
				inputRequired
				v-model="customerForm.lastName"
			/>
		</div>
		<BSFormFloatingInput
			inputId="create-account-address"
			inputType="string"
			inputName="address"
			inputPlaceholder="Sto. Domingo, Nabua, Camarines Sur"
			inputRequired
			v-model="customerForm.address"
		/>
		<BSFormFloatingInput
			inputId="create-phone-number"
			inputType="string"
			inputName="phone-number"
			inputPlaceholder="09123456789"
			inputRequired
			v-model="customerForm.phoneNumber"
		/>
		<button type="submit" class="btn btn-primary w-100 text-white" :disabled="isLoading || areFieldsEmpty">
			<span v-if="isLoading" class="d-flex column-gap-1 align-items-center justify-content-center">
				<span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
				<span role="status">LOADING...</span>
			</span>
			<template v-else>Create Account</template>
		</button>
	</form>
</template>

<script setup lang="ts">
import type { Customer } from "~/server/model/customer";

interface CustomerForm {
	firstName: string;
	lastName: string;
	middleName: string;
	email: string;
	password: string;
	address: string;
	phoneNumber: string;
	[key: string]: string;
}

definePageMeta({
	auth: false,
	// middleware: [
	// 	function () {
	// 		const signupCredentials = useSignupCredentials();
	// 		if (!signupCredentials.value.email && !signupCredentials.value.password) return navigateTo("/signup");
	// 	},
	// ],
});

const signupCredentials = useSignupCredentials();

const isLoading = ref<boolean>();
const customerForm = ref<CustomerForm>({
	firstName: "",
	lastName: "",
	middleName: "",
	email: signupCredentials.value.email,
	password: signupCredentials.value.password,
	address: "",
	phoneNumber: "",
});
const areFieldsEmpty = computed(() => {
	const form = customerForm.value;
	const notRequiredField = ["middleName"];

	for (const key in form) {
		if (form.hasOwnProperty(key) && form[key].trim() === "" && !notRequiredField.includes(key)) {
			return true;
		}
	}
	return false;
});
</script>

<style scoped lang="scss">
.create-account-form {
	input.form-control,
	button {
		font-size: 14px;
		height: 3.188rem;
	}
}
</style>
