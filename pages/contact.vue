<template>
	<div class="contact container d-flex flex-column align-items-center py-5 row-gap-4">
		<section class="contact-heading text-center w-50">
			<h1 class="poppins-semibold">Get In Touch With Us</h1>
			<p class="text-muted">
				For More Information About Our Product & Services. Please Feel Free To Drop Us An Email. Our Staff Always Be There To
				Help You Out. Do Not Hesitate!
			</p>
		</section>

		<div class="d-flex column-gap-4 w-100 justify-content-center mt-4">
			<section class="contact-info d-flex flex-column row-gap-4 w-50">
				<div>
					<svg xmlns="http://www.w3.org/2000/svg" width="29" height="28" fill="none" viewBox="0 0 29 28">
						<path
							fill="#000"
							d="M14.5 15.75a4.375 4.375 0 1 1 0-8.75 4.375 4.375 0 0 1 0 8.75Zm0-7a2.625 2.625 0 1 0 0 5.25 2.625 2.625 0 0 0 0-5.25Z"
						/>
						<path
							fill="#000"
							d="m14.5 26.25-7.381-8.705c-.103-.131-.205-.263-.305-.395a9.528 9.528 0 0 1-1.939-5.775 9.625 9.625 0 0 1 19.25 0 9.523 9.523 0 0 1-1.938 5.772l-.001.003s-.262.345-.302.391L14.5 26.25ZM8.211 16.096s.204.27.25.327l6.039 7.122 6.046-7.132c.039-.048.244-.32.244-.32a7.788 7.788 0 0 0 1.585-4.718 7.875 7.875 0 0 0-15.75 0 7.792 7.792 0 0 0 1.586 4.72Z"
						/>
					</svg>
					<div>
						<h4>Address</h4>
						<span>Nabua, Camarines Sur 4434, Philippines</span>
					</div>
				</div>
				<div>
					<svg xmlns="http://www.w3.org/2000/svg" width="29" height="28" fill="none" viewBox="0 0 29 28">
						<path
							fill="#000"
							d="M8.13 5.833c.07 1.039.245 2.054.525 3.022l-1.4 1.4a17.297 17.297 0 0 1-.887-4.422H8.13Zm11.503 14.024c.992.28 2.007.455 3.034.525v1.738a17.997 17.997 0 0 1-4.434-.875l1.4-1.388ZM9.25 3.5H5.167A1.17 1.17 0 0 0 4 4.667C4 15.622 12.878 24.5 23.833 24.5A1.17 1.17 0 0 0 25 23.333v-4.071a1.17 1.17 0 0 0-1.167-1.167c-1.446 0-2.858-.233-4.165-.665a.979.979 0 0 0-.361-.058c-.304 0-.595.116-.829.338l-2.566 2.567a17.674 17.674 0 0 1-7.689-7.689l2.567-2.566a1.17 1.17 0 0 0 .292-1.19 13.252 13.252 0 0 1-.665-4.165A1.17 1.17 0 0 0 9.25 3.5Z"
						/>
					</svg>
					<div>
						<h4>Phone</h4>
						<span>Mobile: +(63) 912 345 6789</span>
					</div>
				</div>
				<div>
					<svg xmlns="http://www.w3.org/2000/svg" width="29" height="28" fill="none" viewBox="0 0 29 28">
						<g clip-path="url(#a)">
							<path
								fill="#000"
								d="M14.5 2.333c6.444 0 11.667 5.224 11.667 11.667 0 6.444-5.223 11.667-11.667 11.667-6.443 0-11.666-5.224-11.666-11.667S8.056 2.333 14.5 2.333Zm0 2.334a9.333 9.333 0 1 0 0 18.666 9.333 9.333 0 0 0 0-18.666ZM14.5 7a1.167 1.167 0 0 1 1.159 1.03l.008.137v5.35l3.158 3.158a1.167 1.167 0 0 1-1.54 1.747l-.11-.097-3.5-3.5a1.167 1.167 0 0 1-.331-.672l-.01-.153V8.167A1.167 1.167 0 0 1 14.5 7Z"
							/>
						</g>
						<defs>
							<clipPath id="a"><path fill="#fff" d="M.5 0h28v28H.5z" /></clipPath>
						</defs>
					</svg>
					<div>
						<h4>Working Time</h4>
						<div class="d-flex flex-column">
							<span>Monday-Friday: 9:00 - 22:00</span>
							<span>Saturday-Sunday: 9:00 - 21:00</span>
						</div>
					</div>
				</div>
			</section>

			<section class="contact-us-form card bg-body-3 w-75 p-3 shadow">
				<form class="card-body d-flex flex-column row-gap-4">
					<div>
						<label for="inputNameForContact" class="form-label">Your Name</label>
						<input type="text" class="form-control" id="inputNameForContact" placeholder="Juan Dela Cruz" />
					</div>
					<div>
						<label for="inputEmailForContact" class="form-label">Email Address</label>
						<input type="email" class="form-control" id="inputEmailForContact" placeholder="juandelacruz@gmail.com" />
					</div>
					<div>
						<label for="inputSubjectForContact" class="form-label">Subject</label>
						<input
							type="text"
							class="form-control"
							id="inputSubjectForContact"
							placeholder="Subject of the matter (Optional)"
						/>
					</div>
					<div>
						<label for="inputMessageForContact" class="form-label">Message</label>
						<textarea class="form-control" id="inputMessageForContact" rowx="3" placeholder="Hello, this is my message." />
					</div>
					<button type="button" class="btn btn-primary w-25 py-2 mt-3">Submit</button>
				</form>
			</section>
		</div>
	</div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.contact {
	.contact-heading {
		min-width: 38.313rem;
	}

	.contact-info {
		max-width: 21.875rem;

		& > div {
			display: flex;
			column-gap: 1rem;

			svg {
				width: 29;
				height: 28;
				flex-shrink: 0;
			}

			div > h4 {
				font-weight: 500;
			}
		}
	}

	.contact-us-form {
		max-width: 34.375rem;

		label {
			font-weight: 500;
		}
		input {
			height: 2.75rem;
			padding-inline: 1.25rem;
		}
		button {
			min-width: 9.813rem;
		}
	}
}
</style>
