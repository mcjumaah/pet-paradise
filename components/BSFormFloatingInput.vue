<template>
	<div class="form-floating">
		<input
			:id="props.inputId"
			class="form-control"
			:class="props.inputValid === true ? 'is-valid ' : props.inputValid === false ? 'is-invalid ' : ''"
			:name="props.inputName"
			:type="props.inputType"
			:placeholder="props.inputPlaceholder || 'Placeholder'"
			:aria-label="kebabToTitleCase(props.inputName)"
			:autocomplete="props.inputAutocomplete"
			:required="props.inputRequired"
			v-model="model"
		/>
		<label :for="props.inputId" class="text-muted">
			{{ kebabToTitleCase(props.inputName) }}<span v-if="props.inputRequired" class="text-danger">*</span>
		</label>
		<div class="invalid-feedback">
			<slot name="invalidMessage">Please provide a valid {{ kebabToTitleCase(props.inputName).toLowerCase() }}.</slot>
		</div>
		<div v-if="$slots.validMessage" class="valid-feedback">
			<slot name="validMessage" />
		</div>
	</div>
</template>

<script setup lang="ts">
export interface Props {
	inputId: string;
	inputType: string;
	inputName: string;
	inputPlaceholder?: string;
	inputAutocomplete?: string;
	inputRequired?: boolean;
	inputValid?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
	inputAutocomplete: "off",
	inputRequired: false,
	inputValid: undefined,
});

const model = defineModel<any>();
</script>

<style scoped lang="scss">
input.form-control,
button {
	font-size: 14px;
	height: 3.188rem;
}
</style>
