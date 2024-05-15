<template>
	<div class="admin-login-page container px-5 mx-5">
		<form class="p-5 mx-5" @submit.prevent="handleLogin()">
			<h1 class="my-5">ADMIN LOGIN</h1>

			<div class="mb-3">
				<label for="admin-email" class="form-label">Email address</label>
				<input type="email" id="admin-email" class="form-control" v-model="adminToLogin.email" />
			</div>

			<div class="mb-3">
				<label for="admin-password" class="form-label">Password</label>
				<input type="password" id="admin-password" class="form-control" v-model="adminToLogin.password" />
			</div>

			<div v-if="isLoginInvalid" class="alert alert-danger" role="alert">Invalid Credentials!</div>
			<button type="submit" class="btn btn-primary" :disabled="isAdminLoggingIn">
				<DynamicSpinnerLoader :loading="isAdminLoggingIn">LOGIN</DynamicSpinnerLoader>
			</button>
		</form>
	</div>
</template>

<script setup lang="ts">
import type { Admin } from "~/server/model/admin";

definePageMeta({
	auth: false,
});

const currentAdmin = useCurrentAdmin();

const adminToLogin = ref({
	email: "",
	password: "",
});
const isLoginBtnClicked = ref(false);
const isLoginInvalid = ref(false);

const {
	data: loggedInAdmin,
	status: adminLoginStatus,
	error: adminLoginError,
	execute: loginAdmin,
} = await useFetch("/api/admin", {
	method: "GET",
	headers: adminToLogin.value,
	immediate: false,
	watch: false,
	transform: (_admin) => _admin.data as Admin,
});

const isAdminLoggingIn = computed(() => {
	return adminLoginStatus.value === "pending" ?? false;
});

watch(adminLoginError, (error) => {
	alert("Admin login failed: " + error);
});

watch([loggedInAdmin, isLoginBtnClicked], async ([newAdmin, isClicked]) => {
	if (newAdmin && isClicked) {
		currentAdmin.value = newAdmin;

		await navigateTo("/admin");
	} else {
		isLoginInvalid.value = true;
	}
});

async function handleLogin() {
	await loginAdmin();

	isLoginBtnClicked.value = true;
}
</script>

<style scoped lang="scss"></style>
