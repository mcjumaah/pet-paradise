<template>
	<div class="about">
		<section class="welcome container d-flex flex-column align-items-center py-5 row-gap-5">
			<div class="welcome-message text-center">
				<h2 class="poppins-bold">Welcome to <span class="text-primary">Pet Paradise</span>,</h2>
				<p class="fs-4 poppins-semibold text-muted">
					where we believe that every moment spent with our furry friends should be heavenly.
				</p>
			</div>

			<NuxtLink to="/" class="call-to-action btn btn-secondary rounded-pill fs-4 poppins-bold w-fit py-3 px-4">
				Explore Pet Paradise
			</NuxtLink>

			<div class="mission-vision d-flex gap-4 justify-content-center flex-wrap">
				<div
					v-for="card in [
						{
							title: 'Our Mission',
							text:
								'To make every time spent with our creations heavenly by providing high-quality, Eco-friendly, ' +
								'and fashionable pet goods that enhance the lives of both pets and their owners.',
						},
						{
							title: 'Our Vision',
							text:
								'To be the world leader in the supply of high-quality, environmentally friendly pet products, ' +
								'fostering happiness, fostering relationships, ' +
								'and establishing the bench mark for excellence in the pet sector.',
						},
					]"
					class="card bg-body-2 text-center shadow transition-all"
				>
					<div class="card-body p-4">
						<h4 class="card-title poppins-bold">{{ card.title }}</h4>
						<p class="card-text text-muted poppins-medium">{{ card.text }}</p>
					</div>
				</div>
			</div>
		</section>

		<section class="who-we-serve bg-body-3 mb-5">
			<div class="container d-flex flex-column row-gap-4 py-5 align-items-center">
				<div class="www-header text-center">
					<h4 class="poppins-bold">Who We Serve</h4>
					<p class="text-muted poppins-medium">
						Our products and services cater to discerning pet owners who prioritize the well-being and happiness of their
						furry companions. We serve:
					</p>
				</div>
				<div class="cards d-flex flex-wrap justify-content-center gap-4">
					<WhoWeServeCard title="Pet Lovers" imgSrc="/images/about-page-card-images/pet-lovers.png">
						Those who view their pets as cherished family members and seek the best care and products for them.
					</WhoWeServeCard>
					<WhoWeServeCard
						title="Eco-conscious Consumers"
						imgSrc="/images/about-page-card-images/eco-conscious-consumers.png"
					>
						Individuals who prioritize sustainability and environmental responsibility in their purchasing decisions.
					</WhoWeServeCard>
					<WhoWeServeCard
						title="Fashion-forward Pet Owners"
						imgSrc="/images/about-page-card-images/fashion-forward-pet-owners.png"
					>
						Those who appreciate stylish and aesthetically pleasing products for themselves and their pets.
					</WhoWeServeCard>
					<WhoWeServeCard title="Tech-Savvy Pet Parents" imgSrc="/images/about-page-card-images/tech-savvy-pet-parents.png">
						Individuals who embrace technology and seek innovative products that enhance the well-being and happiness of
						their pets.
					</WhoWeServeCard>
					<WhoWeServeCard title="Pet-related Businesses" imgSrc="/images/about-page-card-images/pet-related-businesses.png">
						Veterinary clinics, pet grooming salons, and pet boarding facilities looking for reliable and premium-quality
						products to enhance their services.
					</WhoWeServeCard>
				</div>
			</div>
		</section>
	</div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.about {
	section.welcome {
		.welcome-message {
			width: 613px;
		}
		:deep(a).call-to-action.btn {
			--bs-btn-font-weight: 700;
		}
		.mission-vision {
			.card {
				--bs-box-shadow: 0 0.5rem 1rem rgba(62, 4, 12, 0.15);
				width: 27.5rem;

				@media (min-width: 1200px) {
					width: 31.25rem;
				}

				&:hover {
					--bs-box-shadow: 0 10px 15px -3px rgb(136 21 37 / 0.1), 0 4px 6px -4px rgb(136 21 37 / 0.1);
				}
			}
		}
	}

	section.who-we-serve {
		.www-header {
			max-width: 833px;
		}
	}
}
</style>
