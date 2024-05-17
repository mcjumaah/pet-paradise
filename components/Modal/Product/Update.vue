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
											v-for="(image, index) in productUpdateImages"
											:key="`${index}-product-image-url-slot`"
											type="string"
											id="admin-create-product-images"
											class="form-control"
											placeholder="URL of images for product"
											v-model="productUpdateImages[index]"
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

								<div class="product-description">
									<div class="product-description-text">
										<label for="admin-create-product-description-text" class="form-label required-asterisk">
											Description Text
										</label>
										<textarea
											v-if="productToUpdate.description"
											id="admin-create-product-description-text"
											class="form-control"
											placeholder="Enter product description text."
											v-model="productToUpdate.description.text"
										></textarea>
									</div>

									<div class="product-images d-flex flex-column">
										<label for="admin-create-product-images" class="form-label">Description Images</label>
										<div class="d-flex flex-column gap-2">
											<input
												v-for="(image, index) in productUpdateDescriptionImages"
												:key="`${index}-product-description-image-url-slot`"
												type="string"
												id="admin-create-product-images"
												class="form-control"
												placeholder="URL of images for product description"
												v-model="productUpdateDescriptionImages[index]"
											/>
											<button type="button" class="btn btn-outline-secondary" @click="addProductDescriptionImage()">
												Add Image
											</button>
										</div>
									</div>
								</div>

								<div class="product-categories d-flex gap-3 justify-content-evenly">
									<div class="product-pet-categories">
										<p class="mb-2">Pet Categories</p>
										<div
											v-for="(pet, index) in petTypes"
											:key="`${index}-${pet.id}-${pet.name}`"
											class="form-check pet-category"
										>
											<input
												type="checkbox"
												:id="`${index}-${pet.id}-${pet.name}`"
												class="form-check-input"
												:value="pet.id"
												v-model="productUpdatePetCategories"
											/>
											<label :for="`${index}-${pet.id}-${pet.name}`" class="form-check-label"> {{ pet.name }} </label>
										</div>
									</div>

									<div class="product-item-categories">
										<p class="mb-2">Item Categories</p>
										<div
											v-for="(item, index) in itemTypes"
											:key="`${index}-${item.id}-${item.name}`"
											class="form-check item-category"
										>
											<input
												type="checkbox"
												:id="`${index}-${item.id}-${item.name}`"
												class="form-check-input"
												:value="item.id"
												v-model="productUpdateItemCategories"
											/>
											<label :for="`${index}-${item.id}-${item.name}`" class="form-check-label"> {{ item.name }} </label>
										</div>
									</div>
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
import type { ItemCategory } from "~/server/model/itemCategory";
import type { PetCategory } from "~/server/model/petCategory";
import type { FullProductDTO, Product, ProductDTO } from "~/server/model/product";

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

const productToUpdate = ref<FullProductDTO>({
	sku: "",
	name: "",
	stock: 0,
	images: null,
	soldNum: 0,
	description: {
		text: "",
		images: null,
	},
	prices: [{ value: 0, selections: [{ name: "", variety: "" }] }],
	petCategoryIds: null,
	itemCategoryIds: null,
});
const productUpdateImages = ref<string[]>([""]);
const productUpdateDescriptionImages = ref<string[]>([""]);
const productUpdatePetCategories = ref<number[]>([]);
const productUpdateItemCategories = ref<number[]>([]);

const {
	data: itemTypes,
	pending: fetchingItemTypes,
	error: fetchingItemTypesError,
} = useFetch("/api/category/item-types", {
	method: "GET",
	transform: (_itemTypes) => {
		return _itemTypes.data.content as ItemCategory[];
	},
});

const {
	data: petTypes,
	pending: fetchingPetTypes,
	error: fetchingPetTypesError,
} = useFetch("/api/category/pet-types", {
	method: "GET",
	transform: (_itemTypes) => {
		return _itemTypes.data.content as PetCategory[];
	},
});

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

watch([createProductError, fetchingItemTypesError, fetchingPetTypesError], (errors) => {
	if (errors.some((error) => error)) {
		alert(errors.find((error) => error));
	}
});

watch(productUpdateImages.value, (newImages) => {
	if (newImages) {
		const filteredImages = newImages.filter((image) => image !== "");
		productToUpdate.value.images = filteredImages.length > 0 ? filteredImages : null;
	}
});

watch(productUpdateDescriptionImages.value, (newImages) => {
	if (newImages && productToUpdate.value.description) {
		const filteredImages = newImages.filter((image) => image !== "");
		productToUpdate.value.description.images = filteredImages.length > 0 ? filteredImages : null;
	}
});

watch(productUpdatePetCategories, (newPetCategories) => {
	if (newPetCategories) {
		productToUpdate.value.petCategoryIds = newPetCategories.length > 0 ? newPetCategories : null;
	}
});

watch(productUpdateItemCategories, (newItemCategories) => {
	if (newItemCategories) {
		productToUpdate.value.itemCategoryIds = newItemCategories.length > 0 ? newItemCategories : null;
	}
});

function addProductImage() {
	productUpdateImages.value.push("");
}

function addProductDescriptionImage() {
	productUpdateDescriptionImages.value.push("");
}

async function handleUpdate() {
	await createProduct();
}
</script>

<style scoped lang="scss"></style>
