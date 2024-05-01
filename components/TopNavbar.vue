<template>
	<div class="bg-body-2">
		<div class="navbar navbar-expand-lg d-flex container h-100 py-3 px-2 justify-content-between column-gap-4">
			<Logo class="navbar-brand" />

			<nav class="d-flex align-items-center gap-2">
				<div id="top-navbar-page-nav" class="offcanvas offcanvas-end container py-4 transition-all row-gap-4">
					<button
						type="button"
						class="btn-close ms-auto me-3 d-lg-none"
						aria-label="Close"
						data-bs-dismiss="offcanvas"
					></button>
					<form class="search d-lg-none">
						<input type="search" class="form-control" placeholder="Find a product..." />
					</form>
					<PageNav :isOnTopbar="true" data-bs-dismiss="offcanvas" />
				</div>

				<menu class="nav-icons d-flex gap-2 h-100 my-0 align-items-center">
					<div class="search-btn dropdown">
						<button class="btn w-fit h-fit rounded-3 transition-all" title="Search" type="button" data-bs-toggle="dropdown">
							<div
								id="top-navbar-search-btn"
								data-bs-toggle="tooltip"
								data-bs-title="Search"
								data-bs-trigger="hover"
								data-bs-placement="bottom"
								data-bs-offset="0,20"
							>
								<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 28 28">
									<g clip-path="url(#a)">
										<path
											fill="#000"
											d="m25.822 28-9.8-9.8a9.483 9.483 0 0 1-5.911 2.022c-2.826 0-5.217-.979-7.174-2.937C.98 15.327 0 12.936 0 10.111c0-2.826.979-5.217 2.937-7.174C4.895.98 7.287 0 10.11 0c2.826 0 5.218.979 7.176 2.937 1.958 1.958 2.936 4.35 2.935 7.174a9.483 9.483 0 0 1-2.022 5.911l9.8 9.8L25.822 28Zm-15.71-10.889c1.944 0 3.597-.68 4.958-2.04 1.362-1.361 2.042-3.014 2.041-4.96 0-1.944-.68-3.597-2.04-4.957-1.361-1.361-3.014-2.042-4.96-2.043-1.944 0-3.597.68-4.957 2.043C3.793 6.515 3.112 8.168 3.11 10.11c0 1.945.68 3.598 2.043 4.96 1.361 1.36 3.014 2.041 4.957 2.04Z"
										/>
									</g>
									<defs>
										<clipPath id="a"><path fill="#fff" d="M0 0h28v28H0z" /></clipPath>
									</defs>
								</svg>
							</div>
						</button>
						<div class="dropdown-menu dropdown-menu-end p-2">
							<form class="search">
								<input type="search" class="form-control" placeholder="Find a product..." />
							</form>
						</div>
					</div>
					<NuxtLink
						to="/shop/cart"
						id="top-navbar-cart-link"
						class="to-cart rounded-3 transition-all position-relative z-2"
						title="Cart"
						data-bs-toggle="tooltip"
						data-bs-title="Cart"
						data-bs-trigger="hover"
						data-bs-placement="bottom"
						data-bs-offset="0,13.5"
					>
						<SvgCart />
						<span
							v-for="instance in 2"
							class="cart-item-count position-absolute start-100 top-0 translate-middle badge rounded-pill bg-secondary"
							:class="instance === 1 && hasAdded ? 'scale-125 animate-ping z-0' : 'z-1'"
						>
							{{ cartItemCount }}
							<span class="visually-hidden">cart items</span>
						</span>
					</NuxtLink>
					<div class="account dropdown position-relative z-1">
						<button class="btn w-fit h-fit rounded-3 transition-all" title="Account" type="button" data-bs-toggle="dropdown">
							<div
								id="top-navbar-account-btn"
								data-bs-toggle="tooltip"
								data-bs-title="Account"
								data-bs-trigger="hover"
								data-bs-placement="bottom"
								data-bs-offset="0,20"
							>
								<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 28 28">
									<path
										fill="#000"
										d="M14 0a7 7 0 1 1 0 14 7 7 0 0 1 0-14Zm0 3.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm0 12.25c4.672 0 14 2.328 14 7V28H0v-5.25c0-4.672 9.328-7 14-7Zm0 3.325c-5.197 0-10.675 2.555-10.675 3.675v1.925h21.35V22.75c0-1.12-5.477-3.675-10.675-3.675Z"
									/>
								</svg>
							</div>
						</button>
						<ul class="dropdown-menu dropdown-menu-end">
							<template v-if="isCustomerLoggedIn">
								<li><NuxtLink to="/account" class="dropdown-item">Account</NuxtLink></li>
								<li><button class="btn dropdown-item" @click="signOut()">Log Out</button></li>
							</template>
							<template v-else>
								<li><NuxtLink to="/login" class="dropdown-item">Log In</NuxtLink></li>
								<li><NuxtLink to="/signup" class="dropdown-item">Sign Up</NuxtLink></li>
							</template>
						</ul>
					</div>
				</menu>

				<button
					class="navbar-toggler ms-3"
					type="button"
					data-bs-toggle="offcanvas"
					data-bs-target="#top-navbar-page-nav"
					aria-controls="top-navbar-page-nav"
					aria-label="Toggle navigation"
				>
					<span class="navbar-toggler-icon"></span>
				</button>
			</nav>
		</div>
	</div>
</template>

<script setup lang="ts">
export interface CartTooltips {
	search: typeof Tooltip.prototype;
	cart: typeof Tooltip.prototype;
	account: typeof Tooltip.prototype;
}

const { $currentUserHelper: useCurrentUserHelper, $Tooltip: Tooltip } = useNuxtApp();
const { status: loginStatus, signOut } = useAuth();

const tooltips = ref(<CartTooltips>{});
const hasAdded = ref(false);

const isCustomerLoggedIn = computed(() => {
	return loginStatus.value === "authenticated";
});

const cartItemCount = computed(() => {
	return useCurrentUserHelper().cart.data?.itemCount;
});

watch(
	() => cartItemCount.value,
	(newCount, oldCount) => {
		if (newCount && oldCount && newCount > oldCount) {
			hasAdded.value = true;
			setTimeout(() => {
				hasAdded.value = false;
			}, 5000);
		}
	}
);

onMounted(() => {
	tooltips.value.search = Tooltip.getOrCreateInstance("#top-navbar-search-btn");
	tooltips.value.cart = Tooltip.getOrCreateInstance("#top-navbar-cart-link");
	tooltips.value.account = Tooltip.getOrCreateInstance("#top-navbar-account-btn");
});
</script>

<style lang="scss" scoped>
.nav-icons {
	> * {
		&:not(:has(> button)):hover,
		> button:hover {
			background-color: var(--bs-primary-bg-subtle);
			box-shadow: inset 0 2px 4px 0 rgb(0 0 0 / 0.05);

			:deep(svg) {
				opacity: 0.5;
				transition-property: all;
				transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
				transition-duration: 150ms;
			}
		}
	}

	.search-btn.dropdown {
		.dropdown-menu {
			--bs-dropdown-min-width: 25rem;
		}
	}

	.to-cart {
		padding: 0.375rem 0.75rem 0.375rem 0.75rem;

		.animate-ping {
			animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite !important;
			transform: scale(1.3) translate(-38.5%, -38.5%) !important;

			@keyframes ping {
				75%,
				100% {
					transform: scale(2);
					opacity: 0;
				}
			}
		}

		&.router-link-exact-active {
			background-color: var(--bs-primary-bg-subtle);
			border: solid 1px;
		}
	}
}
</style>
