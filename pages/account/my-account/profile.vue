<template>
	<div class="profile d-flex flex-column row-gap-4">
		<div class="profile-heading pb-3 border-bottom border-3 border-primary-subtle">
			<h5 class="card-title poppins-semibold">My Profile</h5>
			<p class="card-subtitle text-muted">Manage and protect your account</p>
		</div>
		<section class="profile-form d-flex flex-column row-gap-2">
			<div class="grid">
				<label for="profile-user-name" class="form-label">Username</label>
				<div id="profile-user-name">{{ user.username }}</div>
			</div>

			<div class="grid">
				<label for="profile-name-input" class="form-label">Full Name</label>
				<div class="full-name">
					<input
						type="text"
						id="profile-name-input"
						class="form-control shadow-inner h-100"
						placeholder="First Name"
						v-model="user.firstName"
					/>
					<input
						type="text"
						id="profile-name-input"
						class="form-control shadow-inner h-100"
						placeholder="Middle Name"
						v-model="user.middleName"
					/>
					<input
						type="text"
						id="profile-name-input"
						class="form-control shadow-inner h-100"
						placeholder="Last Name"
						v-model="user.lastName"
					/>
				</div>
			</div>

			<div class="grid">
				<label for="profile-email-input" class="form-label">Email</label>
				<div>
					{{ user.email }}
					<NuxtLink to="/account/email" class="text-secondary text-decoration-underline">Change</NuxtLink>
				</div>
			</div>

			<div class="grid">
				<label for="profile-phone-num-input" class="form-label">Phone Number</label>
				<div>
					{{ user.phoneNum }}
					<NuxtLink to="/account/phone-number" class="text-secondary text-decoration-underline">Change</NuxtLink>
				</div>
			</div>

			<div class="grid">
				<label for="profile-gender" class="form-label">Gender</label>
				<div id="profile-gender" class="gender-radio">
					<div class="form-check">
						<input
							class="form-check-input"
							type="radio"
							name="genderRadio"
							id="genderRadioMale"
							value="male"
							v-model="user.gender"
						/>
						<label class="form-check-label" for="genderRadioMale"> Male </label>
					</div>
					<div class="form-check">
						<input
							class="form-check-input"
							type="radio"
							name="genderRadio"
							id="genderRadioFemale"
							value="female"
							v-model="user.gender"
						/>
						<label class="form-check-label" for="genderRadioFemale"> Female </label>
					</div>
					<div class="form-check">
						<input
							class="form-check-input"
							type="radio"
							name="genderRadio"
							id="genderRadioOther"
							value="other"
							v-model="user.gender"
						/>
						<label class="form-check-label" for="genderRadioOther"> Other </label>
					</div>
				</div>
			</div>

			<div class="grid">
				<label for="profile-birth-date" class="form-label">Date of Birth</label>
				<div id="profile-birth-date" class="birth-date-picker">
					<VueDatePicker
						class="birth-day-picker"
						v-model="user.birthDate"
						format="dd"
						:enable-time-picker="false"
						:teleport="true"
						:clearable="false"
						hide-input-icon
						auto-apply
						disable-month-year-select
					/>
					<VueDatePicker
						menu-class-name="birth-month-picker"
						v-model="birthMonth"
						format="MMMM"
						:teleport="true"
						:clearable="false"
						hide-input-icon
						auto-apply
						month-picker
					/>
					<VueDatePicker
						class="birth-year-picker"
						v-model="birthYear"
						format="yyyy"
						:teleport="true"
						:clearable="false"
						hide-input-icon
						auto-apply
						year-picker
					/>
				</div>
			</div>

			<div class="grid mt-3">
				<label class="empty-for-save-button">&nbsp;</label>
				<div>
					<button type="button" class="btn btn-primary py-2 px-3">Save</button>
				</div>
			</div>
		</section>
	</div>
</template>

<script setup lang="ts">
import moment from "moment";

const { $currentUserHelper } = useNuxtApp();
const currentUserData = $currentUserHelper().userData;

const user = ref({
	username: currentUserData?.username,
	firstName: currentUserData?.firstName,
	lastName: currentUserData?.lastName,
	middleName: currentUserData?.middleName,
	email: currentUserData?.email,
	phoneNum: currentUserData?.phoneNumber,
	gender: currentUserData?.gender.toLowerCase(),
	birthDate: moment(currentUserData?.birthDate),
});

const birthMonth = computed({
	get() {
		return { month: user.value.birthDate.month(), year: user.value.birthDate.year() };
	},
	set(date) {
		user.value.birthDate = moment(user.value.birthDate).month(date.month);
	},
});
const birthYear = computed({
	get() {
		return user.value.birthDate.year();
	},
	set(year) {
		user.value.birthDate = moment(user.value.birthDate).year(year);
	},
});
</script>

<style scoped lang="scss">
.profile {
	.profile-heading {
		p.card-subtitle {
			font-size: 0.875rem;
		}
	}

	.profile-form > .grid {
		height: 2.969rem;
		align-items: center;

		label {
			grid-column: auto/span 3;
			text-align: right;
			color: var(--bs-secondary-color) !important;
			margin-bottom: 0;
		}

		& > div {
			grid-column: auto/span 9;
			display: flex;
			align-items: center;
			height: 100%;
			column-gap: 0.75rem;

			:deep(a).text-secondary:hover {
				color: var(--bs-secondary-text-emphasis) !important;
			}

			&.gender-radio {
				column-gap: 1rem;
			}

			&.birth-date-picker {
				& > div,
				& > div > :deep(div),
				& > div > :deep(div > div),
				& > div > :deep(div > div > input) {
					height: 100%;
				}

				:deep(.dp__input_wrap) {
					&::after {
						position: absolute;
						display: flex;
						top: 50%;
						right: 0.5rem;
						transform: translateY(-60%) rotate(-90deg);
						width: 1.5rem;
						height: 1.5rem;
						opacity: 0.5;
						transition-property: all !important;
						transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1) !important;
						transition-duration: 150ms !important;
						content: url("/svg/chevron-left-black.svg");
					}

					&:has(.dp__input_focus)::after {
						transform: translateY(-30%) rotate(90deg) !important;
					}
				}

				:deep(input) {
					box-shadow: inset 0 2px 4px 0 rgb(0 0 0 / 0.05);
				}
			}
		}
	}
}

:global(.birth-month-picker .dp--year-mode-picker) {
	display: none;
}
</style>
