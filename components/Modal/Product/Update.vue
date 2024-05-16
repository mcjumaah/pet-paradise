<template>
	<div>
		<button
			type="button"
			class="btn"
			:class="props.productId ? 'btn-secondary' : 'btn-primary'"
			data-bs-toggle="modal"
			:data-bs-target="`#confirm-product-update-${props.productId ? 'edit-' + props.productId : 'create'}`"
		>
			{{ props.productId ? "Edit" : "Create product" }}
		</button>

		<Teleport to="body">
			<div
				:id="`confirm-product-update-${props.productId ? 'edit-' + props.productId : 'create'}`"
				class="modal fade"
				tabindex="-1"
				:aria-labelledby="`confirm-product-update-${props.productId ? 'edit-' + props.productId : 'create'}-label`"
				aria-hidden="true"
			>
				<div class="modal-dialog modal-dialog-scrollable">
					<div class="modal-content">
						<div class="modal-header">
							<h1
								:id="`confirm-product-update-${props.productId ? 'edit-' + props.productId : 'create'}-label`"
								class="modal-title fs-5"
							>
								Product {{ props.productId ? "Edit" : "Creation" }}
							</h1>
						</div>

						<div class="modal-body">
							<form class="d-flex flex-column gap-4">
								<div class="product-sku">
									<label for="admin-create-product-sku" class="form-label required-asterisk">SKU</label>
									<input
										type="text"
										id="admin-create-product-sku"
										class="form-control"
										placeholder="e.g. DS-PC-DF-VS-40G-UK"
										required
										v-model="productToUpdate.sku"
									/>
								</div>
								<div class="product-name">
									<label for="admin-create-product-name" class="form-label required-asterisk">Name</label>
									<input
										type="text"
										id="admin-create-product-name"
										class="form-control"
										placeholder="Name of product"
										required
										v-model="productToUpdate.name"
									/>
								</div>
								<div class="product-stock">
									<label for="admin-create-product-stock" class="form-label required-asterisk">Stock</label>
									<input
										type="number"
										id="admin-create-product-stock"
										class="form-control"
										placeholder="Number of product's stocks"
										required
										v-model="productToUpdate.stock"
									/>
								</div>
								<div class="product-images d-flex flex-column">
									<label for="admin-create-product-images" class="form-label">Images</label>
									<div class="d-flex flex-column gap-2">
										<input
											v-for="(image, index) in productImages"
											:key="`${index}-product-image-url-slot`"
											type="string"
											id="admin-create-product-images"
											class="form-control"
											placeholder="URL of images for product"
											v-model="productImages[index]"
										/>
										<button type="button" class="btn btn-outline-secondary" @click="addProductImage()">Add Image</button>
									</div>
								</div>
								<div class="product-sold-num">
									<label for="admin-create-product-sold-num" class="form-label">Sold Number</label>
									<input
										type="number"
										id="admin-create-product-sold-num"
										class="form-control"
										placeholder="Initial number of products sold"
										v-model="productToUpdate.soldNum"
									/>
								</div>
							</form>
						</div>

						<div class="modal-footer">
							<div v-if="createProductStatus === 'success'" class="alert alert-success" role="alert">Product Created!</div>
							<div class="d-flex flex-nowrap gap-2">
								<button type="button" class="btn btn-outline-danger" data-bs-dismiss="modal">Cancel</button>
								<button type="button" class="btn btn-primary" @click="handleUpdate()">
									{{ props.productId ? "EDIT" : "CREATE" }}
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Teleport>
	</div>
</template>

<script setup lang="ts">
import type { Product, ProductDTO } from "~/server/model/product";

type ProductUpdateDTO = Omit<ProductDTO, "images"> & { images: string[] | null };

export interface Props {
	productId?: number | null;
}
const props = withDefaults(defineProps<Props>(), {
	productId: null,
});

const emits = defineEmits({
	productUpdate(payload: Product) {
		return !!payload;
	},
});

const productToUpdate = ref<ProductUpdateDTO>({
	sku: "",
	name: "",
	stock: 0,
	images: null,
	soldNum: 0,
});
const productImages = ref<string[]>([""]);

const {
	data: createdProduct,
	pending: creatingProduct,
	error: createProductError,
	status: createProductStatus,
	execute: createProduct,
} = useFetch("/api/product", {
	method: "POST",
	body: productToUpdate,
	immediate: false,
	watch: false,
	transform: (_product) => {
		return _product.data as Product;
	},
});

watch([createProductError], (errors) => {
	if (errors.some((error) => error)) {
		alert(errors.find((error) => error));
	}
});

watch(productImages.value, (newImages) => {
	console.log(newImages);
	if (newImages) {
		const filteredImages = newImages.filter((image) => image !== "");
		productToUpdate.value.images = filteredImages.length > 0 ? filteredImages : null;
	}
});

function addProductImage() {
	productImages.value.push("");
}

async function handleUpdate() {
	await createProduct();
}
</script>

<style scoped lang="scss"></style>
