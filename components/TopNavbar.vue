<template>
	<div class="bg-body-2">
		<div class="d-flex container h-100 py-3 justify-content-between">
			<Logo />

			<nav class="d-flex gap-2">
				<PageNav />
				<menu class="nav-icons d-flex gap-2 h-100 my-0 align-items-center">
					<button class="btn w-fit h-fit rounded-3 transition-all">
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
					<button class="btn w-fit h-fit rounded-3 transition-all">
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
					</button>
					<button class="btn w-fit h-fit rounded-3 transition-all">
						<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 28 28">
							<path
								fill="#000"
								d="M14 0a7 7 0 1 1 0 14 7 7 0 0 1 0-14Zm0 3.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm0 12.25c4.672 0 14 2.328 14 7V28H0v-5.25c0-4.672 9.328-7 14-7Zm0 3.325c-5.197 0-10.675 2.555-10.675 3.675v1.925h21.35V22.75c0-1.12-5.477-3.675-10.675-3.675Z"
							/>
						</svg>
					</button>
				</menu>
			</nav>
		</div>
	</div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.nav-icons {
	button:hover {
		background-color: var(--bs-primary-bg-subtle);
		box-shadow: inset 0 2px 4px 0 rgb(0 0 0 / 0.05);

		svg {
			opacity: 0.5;
			transition-property: all;
			transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
			transition-duration: 150ms;
		}
	}
}
</style>
