<template>
	<div class="admin-layout d-flex position-fixed w-100">
		<nav class="admin-navbar navbar navbar-expand-lg bg-body-tertiary px-4 pt-5 align-items-start">
			<div class="container-fluid flex-column gap-4">
				<h5 class="navbar-brand text-wrap">Pet Paradise - Admin</h5>
				<div class="" id="admin-links">
					<ul class="navbar-nav flex-column gap-3">
						<li class="nav-item">
							<NuxtLink to="/admin/products" class="nav-link link-primary">Products</NuxtLink>
						</li>
						<!-- <li class="nav-item">
							<a class="nav-link" href="#">Features</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="#">Pricing</a>
						</li>
						<li class="nav-item">
							<a class="nav-link disabled" aria-disabled="true">Disabled</a>
						</li> -->
					</ul>
				</div>
			</div>
		</nav>
		<div class="admin-layout-content w-100 overflow-auto pt-5 px-3">
			<slot />
		</div>
	</div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.admin-layout {
	.admin-navbar {
		height: 100lvh;
		max-width: 20lvw;
	}

	.admin-layout-content {
		height: 100lvh;
	}
}
</style>
