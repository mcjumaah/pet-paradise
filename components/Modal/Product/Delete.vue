<template>
	<div>
		<button
			type="button"
			class="btn btn-warning"
			data-bs-toggle="modal"
			:data-bs-target="`#confirm-product-delete-${props.product.id}`"
		>
			Delete
		</button>

		<Teleport to="body">
			<div
				:id="`confirm-product-delete-${props.product.id}`"
				class="modal fade"
				tabindex="-1"
				:aria-labelledby="`confirm-product-delete-${props.product.id}-label`"
				aria-hidden="true"
			>
				<div class="modal-dialog modal-dialog-centered">
					<div class="modal-content">
						<div class="modal-header">
							<h1 :id="`confirm-product-delete-${props.product.id}-label`" class="modal-title fs-5">
								Product Deletion Confirmation
							</h1>
						</div>

						<div class="modal-body">
							Are you sure to delete <span class="fw-bold text-primary"> {{ props.product.name }} </span>?
						</div>

						<div class="modal-footer">
							<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
							<button
								type="button"
								class="btn btn-danger"
								data-bs-dismiss="modal"
								@click="productToDeleteId = { id: props.product.id }"
							>
								Yes, DELETE
							</button>
						</div>
					</div>
				</div>
			</div>
		</Teleport>
	</div>
</template>

<script setup lang="ts">
import type { Product } from "~/server/model/product";
import type { ProductSummaryProjection } from "~/server/projections/productProjections";

export interface Props {
	product: ProductSummaryProjection;
}
const props = withDefaults(defineProps<Props>(), {});

const emits = defineEmits({
	productDelete(payload: Product) {
		return !!payload;
	},
});

const productToDeleteId = ref<Prettify<Pick<ProductSummaryProjection, "id">>>();

const {
	data: deletedProductData,
	pending: deletingProduct,
	error: deleteProductError,
} = useFetch("/api/product", {
	method: "DELETE",
	query: productToDeleteId,
	immediate: false,
	transform: (_itemTypes) => {
		return _itemTypes.data.body as Product;
	},
	onResponse({ request, response, options }) {
		const product: Product | null = response._data.data.body ?? null;
		if (product) {
			emits("productDelete", product);
		}
	},
});

watch([deleteProductError], (errors) => {
	if (errors.some((error) => error)) {
		alert(errors.find((error) => error));
	}
});
</script>

<style scoped lang="scss"></style>
