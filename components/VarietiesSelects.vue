<template>
	<div class="varieties-selects d-flex flex-column row-gap-4">
		<div v-for="(selection, index) in props.selections" :key="`${index} - ${selection.name}`" class="d-flex column-gap-4">
			<label class="selection-name pt-2 h-fit" for="varieties-wrapper">{{ selection.name }}</label>
			<div id="varieties-wrapper" class="varieties-wrapper d-flex gap-2 text-black flex-wrap w-100">
				<button
					v-for="(variety, index) in formatVarieties(selection.varieties)"
					:key="`${index} - ${variety}`"
					class="varieties btn btn-light h-fit p-2 border border-secondary-subtle text-nowrap transition-all"
					:class="isActive(selection.name, variety) ? 'active' : ''"
					type="button"
					@click="setSelected(selection.name, variety)"
				>
					{{ variety }}
				</button>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { SelectionProjection } from "~/server/projections/selectionProjection";

export interface Props {
	selections: SelectionProjection[] | undefined;
}
const props = withDefaults(defineProps<Props>(), {});

const selectedArr = defineModel<SelectedVariety[]>();

async function setSelected(selectedName: string, selectedVariety: string) {
	let selected = { name: selectedName, variety: selectedVariety };

	if (selectedArr.value?.find((s) => s.name === selectedName)) {
		selectedArr.value = selectedArr.value.filter((s) => s.name !== selectedName);
		await nextTick();
		selectedArr.value?.push(selected);
	} else {
		selectedArr.value?.push(selected);
	}
}

function isActive(name: string, variety: string) {
	let selectedInArr = selectedArr.value?.find((s) => s.name === name && s.variety === variety);
	return selectedInArr ? true : false;
}

function formatVarieties(varieties: string[]) {
	return [...new Set(varieties)];
}
</script>

<style scoped lang="scss">
.varieties-selects {
	.varieties-wrapper {
		.varieties.active {
			color: white;
			background-color: var(--bs-secondary);
		}
	}
}
</style>
