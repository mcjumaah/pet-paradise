<template>
	<NuxtLayout name="with-header">
		<div class="account d-flex container column-gap-5 py-5">
			<section class="side-menu d-flex flex-column align-items-start row-gap-3">
				<div class="my-account">
					<NuxtLink
						to="/account/my-account"
						class="d-flex column-gap-2"
						:class="useIsActiveColor('my-account', 'text-primary', '')"
					>
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
							<path
								:fill="useIsActiveColor('my-account')"
								d="M12 4a4 4 0 1 1 0 8 4 4 0 0 1 0-8Zm0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 7c2.67 0 8 1.33 8 4v3H4v-3c0-2.67 5.33-4 8-4Zm0 1.9c-2.97 0-6.1 1.46-6.1 2.1v1.1h12.2V17c0-.64-3.13-2.1-6.1-2.1Z"
							/>
						</svg>
						<span>My Account</span>
					</NuxtLink>
					<div v-if="route.path.includes('/account/my-account')" class="my-account-sub-menu d-flex column-gap-2 pt-1">
						<div class="d-flex flex-column">
							<NuxtLink to="/account/my-account/profile">Profile</NuxtLink>
							<NuxtLink to="/account/my-account/address">Address</NuxtLink>
							<NuxtLink to="/account/my-account/change-password">Change Password</NuxtLink>
						</div>
					</div>
				</div>
				<NuxtLink to="/account/my-purchase">
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
						<path
							:stroke="useIsActiveColor('my-purchase')"
							stroke-width="1.5"
							d="M16.755 2h-9.51c-1.159 0-1.738 0-2.206.163a3.046 3.046 0 0 0-1.881 1.936C3 4.581 3 5.177 3 6.37v14.004c0 .858.985 1.314 1.608.744a.946.946 0 0 1 1.284 0l.483.442a1.657 1.657 0 0 0 2.25 0 1.657 1.657 0 0 1 2.25 0 1.657 1.657 0 0 0 2.25 0 1.657 1.657 0 0 1 2.25 0 1.657 1.657 0 0 0 2.25 0l.483-.442a.946.946 0 0 1 1.284 0c.623.57 1.608.114 1.608-.744V6.37c0-1.193 0-1.79-.158-2.27a3.045 3.045 0 0 0-1.881-1.937C18.493 2 17.914 2 16.755 2Z"
						/>
						<path
							:stroke="useIsActiveColor('my-purchase')"
							stroke-linecap="round"
							stroke-width="1.5"
							d="M10.5 11H17M7 11h.5M7 7.5h.5m-.5 7h.5m3-7H17m-6.5 7H17"
						/>
					</svg>
					<span>My Purchase</span>
				</NuxtLink>
				<NuxtLink to="/account/notifications">
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
						<path
							:fill="useIsActiveColor('notifications')"
							d="M10 21h4c0 1.1-.9 2-2 2s-2-.9-2-2Zm11-2v1H3v-1l2-2v-6c0-3.1 2-5.8 5-6.7V4c0-1.1.9-2 2-2s2 .9 2 2v.3c3 .9 5 3.6 5 6.7v6l2 2Zm-4-8c0-2.8-2.2-5-5-5s-5 2.2-5 5v7h10v-7Z"
						/>
					</svg>
					<span>Notifications</span>
				</NuxtLink>
			</section>
			<section class="card bg-body-2 shadow w-100">
				<div class="card-body py-4 px-5"><slot /></div>
			</section>
		</div>
	</NuxtLayout>
</template>

<script setup lang="ts">
const route = useRoute();

function useIsActiveColor(path: string, trueVal = "var(--bs-primary)", falseVal = "black") {
	return route.path.includes(`/account/${path}`) ? trueVal : falseVal;
}
</script>

<style scoped lang="scss">
.account {
	overflow: clip;

	.side-menu {
		min-width: 11.094rem;
		:deep(a) {
			color: black;
			text-decoration: none;
			text-wrap: nowrap;

			&:not(.my-account-sub-menu > div > a) {
				font-weight: 600;
			}

			&.router-link-exact-active {
				color: var(--bs-primary) !important;
			}

			&:not(.router-link-exact-active, .text-primary):hover {
				text-decoration: underline;
			}

			&:is(.router-link-exact-active, .text-primary) {
				pointer-events: none;
			}
		}

		.my-account > *,
		& > :deep(a) {
			display: flex;
			column-gap: 0.5rem;
		}

		.my-account-sub-menu {
			&::before {
				content: "";
				height: 24px;
				width: 24px;
				flex-shrink: 0;
			}

			div > :deep(a) {
				padding: 0;
				text-align: left;
				width: fit-content;
			}
		}
	}
}
</style>
