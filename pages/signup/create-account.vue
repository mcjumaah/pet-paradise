<template>
	<form
		id="create-account-form"
		class="create-account-form d-flex flex-column row-gap-4"
		@submit.prevent="createAccount()"
		novalidate
	>
		<input type="text" style="display: none" />

		<BSFormFloatingInput
			inputId="create-account-username"
			inputType="string"
			inputName="username"
			inputPlaceholder="vin_esplana123"
			inputRequired
			v-model="customerForm.username"
		/>

		<span class="border-top border-2 border-secondary opacity-50"></span>

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

		<span class="border-top border-2 border-secondary opacity-50"></span>

		<BSFormFloatingInput
			inputId="create-account-address"
			inputType="string"
			inputName="address"
			inputPlaceholder="Sto. Domingo, Nabua, Camarines Sur"
			inputRequired
			v-model="customerForm.address"
		/>
		<BSFormFloatingInput
			inputId="create-account-phone-number"
			inputType="string"
			inputName="phone-number"
			inputPlaceholder="09123456789"
			:inputValid="isPhoneNumValid"
			inputRequired
			v-model="customerForm.phoneNumber"
		>
			<template #invalidMessage>Please provide a valid Phone Number. Hint: 09123456789</template>
		</BSFormFloatingInput>
		<div class="d-flex column-gap-3">
			<VueDatePicker
				class="w-50"
				input-class-name="birth-date"
				placeholder="Birth Date*"
				:enable-time-picker="false"
				auto-apply
				v-model="customerForm.birthDate"
			/>
			<select class="form-select w-50" v-model="selectedGender">
				<option disabled value="">Gender<span class="text-danger">*</span></option>
				<option value="MALE">Male</option>
				<option value="FEMALE">Female</option>
				<option value="OTHER">Other</option>
			</select>
		</div>

		<button type="submit" class="btn btn-primary w-100 text-white" :disabled="isLoading || areFieldsEmpty">
			<DynamicSpinnerLoader :loading="isLoading">Create Account</DynamicSpinnerLoader>
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
import moment from "moment";
import type { CustomerDTO } from "~/server/model/customer";
import type { CustomerProjection } from "~/server/projections/customerProjections";
import formatFetchErrorResponseData from "~/utils/formatFetchError";

definePageMeta({
	auth: false,
	middleware: [
		function () {
			const signupCredentials = useSignupCredentials();
			if (!signupCredentials.value.email && !signupCredentials.value.password) return navigateTo("/signup");
		},
	],
});

type CustomerForm = CustomerDTO;

const { $Toast: Toast } = useNuxtApp();
const signupCredentials = useSignupCredentials();
const isCustomerCreated = useHasCreatedNewCustomerAccount();

const isLoading = ref<boolean>(false);
const customerForm = ref<CustomerForm>({
	username: "",
	firstName: "",
	lastName: "",
	middleName: "",
	email: signupCredentials.value.email,
	password: signupCredentials.value.password,
	address: "",
	phoneNumber: "",
	gender: "OTHER",
	birthDate: "",
});
const isPhoneNumValid = ref<boolean>();
const createdCustomer = ref<CustomerProjection>();
const customerCreatedToast = ref<typeof Toast.prototype>();
const toastTimer = ref(5);
const selectedGender = ref<"MALE" | "FEMALE" | "OTHER" | "">("");

const areFieldsEmpty = computed(() => {
	const form = customerForm.value;
	const notRequiredField = ["middleName"];

	for (const key in form) {
		if (form.hasOwnProperty(key) && form[key as keyof typeof form]?.trim() === "" && !notRequiredField.includes(key)) {
			return true;
		}
	}
	return false;
});

watch(selectedGender, (newGender) => {
	if (newGender) {
		customerForm.value.gender = newGender;
	}
});

watch(
	() => customerForm.value.birthDate,
	(newBday) => {
		if (newBday) {
			customerForm.value.birthDate = moment(newBday).format("YYYY-MM-DD HH:mm:ss");
		}
	}
);

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

		setTimeout(() => {
			createdCustomer.value = data;
			isCustomerCreated.value = data ?? false;

			isLoading.value = false;

			if (customerCreatedToast.value) {
				customerCreatedToast.value.show();
				startToastCountdown();
			}
		}, 750);
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

onBeforeRouteLeave(() => {
	signupCredentials.value = {
		email: "",
		password: "",
	};
});
</script>

<style scoped lang="scss">
.create-account-form {
	input.form-control,
	button {
		font-size: 14px;
		height: 3.188rem;
	}

	:deep(.birth-date) {
		height: 58px;
		border-radius: 0.375rem;
		padding-left: 42.5px;

		&.dp__input {
			font-family: "Poppins", sans-serif;
			font-weight: 400;
			font-style: normal;
			font-size: 16px;
		}

		& + div > .dp__input_icons {
			--dp-font-size: 22.5px;
		}
	}
}
</style>
