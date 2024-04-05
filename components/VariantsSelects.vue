<template>
	<div class="variants-selects d-flex flex-column row-gap-3">
		<div
			v-for="(selection, index) in props.selections"
			:key="`${index} - ${selection.name}`"
			class="d-flex text-muted column-gap-4 px-4"
		>
			<label for="variants-wrapper" class="selection-name pt-2 h-fit">{{ selection.name }}</label>
			<div id="variants-wrapper" class="variants-wrapper d-flex gap-2 text-black flex-wrap w-100">
				<button
					v-for="(variant, index) in selection.variants"
					:key="`${index} - ${variant}`"
					class="variants btn btn-light h-fit p-2 border border-secondary-subtle text-nowrap transition-all"
					:class="isActive(selection.name, variant) ? 'active' : ''"
					type="button"
					@click="setSelected(selection.name, variant)"
				>
					{{ variant }}
				</button>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
export interface SelectedVariant {
	name: string;
	variant: string;
}
export interface Props {
	selections:
		| {
				name: string;
				variants: string[];
		  }[]
		| undefined;
}
const props = withDefaults(defineProps<Props>(), {});

const selectedArr = defineModel<SelectedVariant[]>();

async function setSelected(selectedName: string, selectedVariant: string) {
	let selected = { name: selectedName, variant: selectedVariant };

	if (selectedArr.value?.find((s) => s.name === selectedName)) {
		selectedArr.value = selectedArr.value.filter((s) => s.name !== selectedName);
		await nextTick();
		selectedArr.value?.push(selected);
	} else {
		selectedArr.value?.push(selected);
	}
}

function isActive(name: string, variant: string) {
	let selectedInArr = selectedArr.value?.find((s) => s.name === name && s.variant === variant);
	return selectedInArr ? true : false;
}
</script>

<style scoped lang="scss">
.variants-selects {
	.selection-name {
		width: 15%;
		min-width: fit-content;
	}

	.variants-wrapper {
		.variants.active {
			color: white;
			background-color: var(--bs-secondary);
		}
	}
}
</style>
