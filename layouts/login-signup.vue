<template>
	<NuxtLayout name="default">
		<div class="login d-flex bg-primary">
			<section class="logo-section d-flex position-relative justify-content-center align-items-center w-100">
				<div class="position-relative z-1 d-flex flex-column row-gap-5 justify-content-center align-items-center w-75">
					<Logo :isXl="true" />
					<p class="text-center text-white montserrat-medium">
						Paws and shop! Find everything your furry friend needs with ease. Treats, toys, and more, just a click away!
					</p>
				</div>
				<div class="logo-section-bg position-absolute z-0">
					<img src="/images/pets-bg-cover-left.png" class="position-absolute start-0 h-100" />
					<img src="/images/pets-bg-cover-right.png" class="position-absolute end-0 h-100" />
				</div>
			</section>

			<section class="card bg-body-3 rounded-start-4 rounded-end-0">
				<div class="card-body d-flex flex-column row-gap-5 p-5">
					<h5 class="card-title poppins-medium">
						{{ pathTitle }}
					</h5>

					<slot />

					<span class="sides-horizontal-lines">OR</span>

					<p class="text-center text-muted">
						{{ pathTitle == "Log In" ? "New to Pet Paradise" : "Already have an account" }}?
						<NuxtLink :to="pathTitle == 'Log In' ? '/signup' : '/login'">{{
							pathTitle == "Log In" ? "Sign Up" : "Log In"
						}}</NuxtLink>
					</p>
				</div>
			</section>
		</div>
	</NuxtLayout>
</template>

<script setup lang="ts">
const pathTitle = computed(() => {
	let currentPath = useRoute().path;
	return currentPath == "/login"
		? "Log In"
		: currentPath == "/signup"
		? "Sign Up"
		: currentPath.replace("/", "").charAt(0).toUpperCase() + currentPath.slice(2);
});
</script>

<style scoped lang="scss">
.login {
	padding-top: 92px;

	.logo-section {
		p {
			font-size: 175%;
			max-width: 40rem;
		}

		.logo-section-bg {
			inset: 0 0 0 0;
			background: rgb(136, 21, 37);
			background: linear-gradient(225deg, rgba(136, 21, 37, 1) 21%, rgba(176, 103, 31, 1) 100%);
			width: calc(100% + 0.75rem);
			transform: translateX(0.02rem);
			overflow: clip;

			img {
				opacity: 0.375;
			}
		}
	}

	.card {
		min-width: 34.438rem;

		p {
			font-size: 14px;
		}
	}
}
</style>
