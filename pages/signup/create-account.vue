<template>
	<form
		id="create-account-form"
		class="create-account-form d-flex flex-column row-gap-4"
		@submit.prevent="createAccount()"
		novalidate
	>
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
			:inputValid="isPhoneNumValid"
			inputRequired
			v-model="customerForm.phoneNumber"
		>
			<template #invalidMessage>Please provide a valid Phone Number. Hint: 09123456789</template>
		</BSFormFloatingInput>
		<button type="submit" class="btn btn-primary w-100 text-white" :disabled="isLoading || areFieldsEmpty">
			<span v-if="isLoading" class="d-flex column-gap-1 align-items-center justify-content-center">
				<span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
				<span role="status">LOADING...</span>
			</span>
			<template v-else>Create Account</template>
		</button>

		<div class="toast-container position-fixed top-0 end-0 p-3">
			<div
				id="customer-created-toast"
				class="toast bg-body border-primary-subtle"
				role="alert"
				aria-live="assertive"
				aria-atomic="true"
				data-bs-autohide="false"
			>
				<div class="toast-body">
					<p>
						Customer account with email <span class="text-primary">{{ createdCustomer?.email }}</span> has been created.
					</p>
					<p>
						Redirecting to Login page in <span class="text-info-emphasis">{{ toastTimer }}</span> second/s
					</p>
					<div class="mt-2 pt-2 border-top">
						<NuxtLink :to="`/login?email=${createdCustomer?.email}`" class="btn btn-primary btn-sm">Login Now</NuxtLink>
					</div>
				</div>
			</div>
		</div>
	</form>
</template>

<script setup lang="ts">
definePageMeta({
	auth: false,
	// middleware: [
	// 	function () {
	// 		const signupCredentials = useSignupCredentials();
	// 		if (!signupCredentials.value.email && !signupCredentials.value.password) return navigateTo("/signup");
	// 	},
	// ],
});

import type { CustomerProjection } from "~/server/projections/customerProjections";
import formatFetchErrorResponseData from "~/utils/formatFetchError";

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

const { $Toast: Toast } = useNuxtApp();
const signupCredentials = useSignupCredentials();
const isCustomerCreated = useHasCreatedNewCustomerAccount();

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
const isPhoneNumValid = ref<boolean>();
const createdCustomer = ref<CustomerProjection>();
const customerCreatedToast = ref<typeof Toast.prototype>();
const toastTimer = ref(3);

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

watch(
	() => customerForm.value.phoneNumber,
	() => {
		if (typeof isPhoneNumValid.value !== "undefined") {
			isPhoneNumValid.value = undefined;
		}
	}
);

watch(toastTimer, (newTime) => {
	if (newTime <= 0) {
		navigateTo(`/login?email=${createdCustomer.value?.email}`);
	}
});

async function createAccount() {
	try {
		isLoading.value = true;

		const { data } = await $fetch("/api/customer", {
			method: "POST",
			body: customerForm.value,
		});

		createdCustomer.value = data;
		isCustomerCreated.value = data ?? false;

		isLoading.value = false;

		if (customerCreatedToast.value) {
			customerCreatedToast.value.show();
			startToastCountdown();
		}
	} catch (error) {
		const errorResponse = formatFetchErrorResponseData(error);
		if (errorResponse?.statusCode == 400 && errorResponse?.statusMessage === "Invalid phoneNumber") {
			isPhoneNumValid.value = false;
		} else {
			alert(error);
		}
		isLoading.value = false;
	}
}

function startToastCountdown() {
	const countdown = setInterval(() => {
		if (toastTimer.value > 0) {
			toastTimer.value--;
		} else {
			clearInterval(countdown);
		}
	}, 1000);
}

onMounted(() => {
	customerCreatedToast.value = Toast.getOrCreateInstance("#customer-created-toast");
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
