<template>
	<div class="item-quantity input-group justify-content-center border rounded shadow-inner bg-white">
		<button
			v-if="quantity"
			id="reduce-quantity"
			class="btn start-0"
			title="Reduce Quantity"
			type="button"
			:disabled="quantity <= 1"
			@click="onClickCustomized ? customOnClick('subtract') : quantity--"
		>
			-
		</button>
		<input
			type="number"
			class="form-control border-0 px-1 text-center position-relative z-1"
			placeholder=""
			aria-label="Example text with button addon"
			aria-describedby="button-addon1"
			v-model="quantity"
		/>
		<button
			v-if="quantity"
			id="add-quantity"
			class="btn end-0"
			title="Add Quantity"
			type="button"
			@click="onClickCustomized ? customOnClick('add') : quantity++"
		>
			+
		</button>
	</div>
</template>

<script setup lang="ts">
export interface Props {
	onClickCustomized?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
	onClickCustomized: false,
});

const emits = defineEmits({
	updateQuantity(payload: number) {
		if (payload) {
			return true;
		}
	},
});

const quantity = defineModel({ type: Number, default: 1 });

async function customOnClick(mode: "subtract" | "add") {
	if (mode == "subtract") {
		quantity.value--;
	} else if (mode == "add") {
		quantity.value++;
	}
	await nextTick();

	emits("updateQuantity", quantity.value);
}
</script>

<style scoped lang="scss">
.item-quantity {
	min-width: 5rem;
	overflow: clip;

	input {
		appearance: none;
		-moz-appearance: textfield;

		&::-webkit-outer-spin-button,
		&::-webkit-inner-spin-button {
			-webkit-appearance: none;
			margin: 0;
		}
	}

	button {
		top: 50%;
		transform: translateY(-50%);
		height: 100%;
		color: var(--bs-secondary-text-emphasis);
		border: none;
		border-radius: 0;
		padding-block: 0;
		padding-inline: 0.4rem;
		transition-property: all !important;
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1) !important;
		transition-duration: 150ms !important;

		&:hover {
			color: var(--bs-primary);
			background-color: var(--bs-primary-bg-subtle);
		}
	}

	& > * {
		background: transparent;
	}
}
</style>
