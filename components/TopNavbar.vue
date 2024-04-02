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
					<div
						id="top-navbar-search-dropdown"
						class="search-btn dropdown"
						title="Search"
						data-bs-toggle="tooltip"
						data-bs-title="Search"
						data-bs-trigger="hover"
						data-bs-placement="bottom"
					>
						<button class="btn w-fit h-fit rounded-3 transition-all" type="button" data-bs-toggle="dropdown">
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
						class="to-cart rounded-3 transition-all"
						title="Cart"
						data-bs-toggle="tooltip"
						data-bs-title="Cart"
						data-bs-trigger="hover"
						data-bs-placement="bottom"
					>
						<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 28 28">
							<g clip-path="url(#a)">
								<path
									fill="#000"
									d="M22.4 22.4a2.8 2.8 0 1 1-2.8 2.8 2.79 2.79 0 0 1 2.8-2.8ZM0 0h4.578l1.316 2.8H26.6A1.4 1.4 0 0 1 28 4.2c0 .238-.07.476-.168.7l-5.012 9.058a2.815 2.815 0 0 1-2.45 1.442H9.94l-1.26 2.282-.042.168a.35.35 0 0 0 .35.35H25.2V21H8.4a2.8 2.8 0 0 1-2.8-2.8c0-.49.126-.952.336-1.344l1.904-3.43L2.8 2.8H0V0Zm8.4 22.4a2.8 2.8 0 1 1-2.8 2.8 2.79 2.79 0 0 1 2.8-2.8ZM21 12.6l3.892-7H7.196l3.304 7H21Z"
								/>
							</g>
							<defs>
								<clipPath id="a"><path fill="#fff" d="M0 0h28v28H0z" /></clipPath>
							</defs>
						</svg>
					</NuxtLink>
					<div
						id="top-navbar-account-dropdown"
						class="account dropdown"
						title="Account"
						data-bs-toggle="tooltip"
						data-bs-title="Account"
						data-bs-trigger="hover"
						data-bs-placement="bottom"
					>
						<button class="btn w-fit h-fit rounded-3 transition-all" type="button" data-bs-toggle="dropdown">
							<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 28 28">
								<path
									fill="#000"
									d="M14 0a7 7 0 1 1 0 14 7 7 0 0 1 0-14Zm0 3.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm0 12.25c4.672 0 14 2.328 14 7V28H0v-5.25c0-4.672 9.328-7 14-7Zm0 3.325c-5.197 0-10.675 2.555-10.675 3.675v1.925h21.35V22.75c0-1.12-5.477-3.675-10.675-3.675Z"
								/>
							</svg>
						</button>
						<ul class="dropdown-menu dropdown-menu-end">
							<li><NuxtLink to="/login" class="dropdown-item">Log In</NuxtLink></li>
							<li><NuxtLink to="/signup" class="dropdown-item">Sign Up</NuxtLink></li>
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
	search: any;
	cart: any;
	account: any;
}

const { $Tooltip: Tooltip } = useNuxtApp();

const tooltips = ref(<CartTooltips>{});

onMounted(() => {
	tooltips.value.search = new Tooltip(document.getElementById("top-navbar-search-dropdown") as HTMLElement);
	tooltips.value.cart = new Tooltip(document.getElementById("top-navbar-cart-link") as HTMLElement);
	tooltips.value.account = new Tooltip(document.getElementById("top-navbar-account-dropdown") as HTMLElement);
});
</script>

<style lang="scss" scoped>
.nav-icons {
	> * {
		&.to-cart {
			padding: 0.375rem 0.75rem 0.375rem 0.75rem;
		}

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
}
</style>
