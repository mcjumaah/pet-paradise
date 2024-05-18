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
									<label for="admin-create-product-images" class="form-label">Images (URL)</label>
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

								<div class="product-description d-flex flex-column gap-3">
									<div class="product-description-text">
										<label for="admin-create-product-description-text" class="form-label"> Description Text </label>
										<textarea
											v-if="productToUpdate.description"
											id="admin-create-product-description-text"
											class="form-control"
											placeholder="Enter product description text."
											v-model="productToUpdate.description.text"
										></textarea>
									</div>

									<div class="product-images d-flex flex-column">
										<label for="admin-create-product-images" class="form-label">Description Images (URL)</label>
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

								<div class="product-prices d-flex flex-column gap-1">
									<p class="mt-1 mb-2 fs-5">Prices</p>
									<div
										v-for="(price, pIndex) in productUpdatePrices"
										:key="`${pIndex}-product-price`"
										class="product-price bg-primary-subtle p-2 rounded"
									>
										<label for="admin-create-product-price-value" class="form-label fs-6">
											<span class="px-2 bg-secondary rounded text-white">P-{{ pIndex + 1 }}</span> Price Value
										</label>
										<input
											type="number"
											id="admin-create-product-price-value"
											class="form-control"
											placeholder="Price"
											v-model="productUpdatePrices[pIndex].value"
										/>

										<p class="mb-2 fs-6">Price Selections</p>
										<div
											v-if="productUpdatePrices[pIndex].selections.length > 0"
											v-for="(selection, sIndex) in productUpdatePrices[pIndex].selections"
											:key="`${pIndex}-product-price-${sIndex}-selection`"
											class="product-selection mt-3 bg-secondary-subtle p-2 rounded d-flex flex-column gap-2"
										>
											<div class="px-2 bg-primary text-white w-fit rounded">
												<span class="text-secondary-emphasis">P-{{ pIndex + 1 }}</span> - {{ sIndex + 1 }}
											</div>

											<div class="product-selection-name">
												<label
													:for="`admin-create-product-price-${pIndex}-selection-${sIndex}-name`"
													class="form-label required-asterisk fs-6 text-muted"
												>
													Name
												</label>
												<input
													type="text"
													:id="`admin-create-product-price-${pIndex}-selection-${sIndex}-name`"
													class="form-control"
													placeholder="Name of selection (e.g. 'Flavor')"
													required
													v-model="productUpdatePrices[pIndex].selections[sIndex].name"
												/>
											</div>

											<div class="product-selection-variety">
												<label
													:for="`admin-create-product-price-${pIndex}-selection-${sIndex}-variety`"
													class="form-label required-asterisk fs-6 text-muted"
												>
													Variety
												</label>
												<input
													type="text"
													:id="`admin-create-product-price-${pIndex}-selection-${sIndex}-variety`"
													class="form-control"
													placeholder="Name of variety (e.g. 'Tuna')"
													required
													v-model="productUpdatePrices[pIndex].selections[sIndex].variety"
												/>
											</div>
										</div>

										<button type="button" class="btn btn-outline-secondary mt-3" @click="addProductPriceSelection(pIndex)">
											Add Selection
										</button>
									</div>

									<button
										type="button"
										class="btn btn-outline-secondary mt-3"
										:disabled="
											productUpdatePrices[0].selections.length <= 0 ||
											productUpdatePrices[0].selections[0].name.length <= 0 ||
											productUpdatePrices[0].selections[0].variety.length <= 0
										"
										@click="addProductPrice()"
									>
										Add Price
									</button>
								</div>
							</form>
						</div>

						<div class="modal-footer">
							<div v-if="createProductStatus === 'success'" class="alert alert-success" role="alert">Product Created!</div>
							<div class="d-flex flex-nowrap gap-2">
								<button type="button" class="btn btn-outline-danger" data-bs-dismiss="modal">Cancel</button>
								<button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="handleUpdate()">
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
import type { FullProductDTO, Product } from "~/server/model/product";
import type { PriceProjection } from "~/server/projections/priceProjections";
import type { ProductProjection } from "~/server/projections/productProjections";

export interface Props {
	productId?: number | null;
}
const props = withDefaults(defineProps<Props>(), {
	productId: null,
});

const emits = defineEmits({
	productUpdate(payload: ProductProjection) {
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
	prices: [{ value: 0, selections: [] }],
	petCategoryIds: null,
	itemCategoryIds: null,
});
const productUpdateImages = ref<string[]>([""]);
const productUpdateDescriptionImages = ref<string[]>([""]);
const productUpdatePetCategories = ref<number[]>([]);
const productUpdateItemCategories = ref<number[]>([]);
const productUpdatePrices = ref<Prettify<Omit<PriceProjection, "id">>[]>([{ value: 0, selections: [] }]);

const {
	data: productToEdit,
	pending: isFetchingProduct,
	error: fetchProductError,
	execute: fetchProduct,
} = useFetch("/api/product", {
	method: "GET",
	query: { id: props.productId },
	immediate: false,
	transform: (_product) => _product.data as ProductProjection,
});

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
	method: props.productId ? "PUT" : "POST",
	body: productToUpdate,
	query: {
		id: props.productId ?? undefined,
	},
	immediate: false,
	watch: false,
	transform: (_product) => {
		return _product.data as Product;
	},
	onResponse({ request, response, options }) {
		const product: ProductProjection = response._data.data;
		if (product) {
			emits("productUpdate", product);
		}
	},
});

watch([createProductError, fetchingItemTypesError, fetchingPetTypesError, fetchProductError], (errors) => {
	if (errors.some((error) => error)) {
		alert(errors.find((error) => error));
	}
});

watch([productUpdatePrices.value, () => productUpdatePrices.value], () => {
	if (productUpdatePrices.value && productUpdatePrices.value.length > 0) {
		productToUpdate.value.prices = productUpdatePrices.value;
	}
});

watch([productUpdateImages.value, () => productUpdateImages.value], () => {
	if (productUpdateImages.value) {
		const filteredImages = productUpdateImages.value.filter((image) => image !== "");
		productToUpdate.value.images = filteredImages.length > 0 ? filteredImages : null;
	}
});

watch([productUpdateDescriptionImages.value, () => productUpdateDescriptionImages.value], () => {
	if (productUpdateDescriptionImages.value && productToUpdate.value.description) {
		const filteredImages = productUpdateDescriptionImages.value.filter((image) => image !== "");
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

function addProductPrice() {
	productUpdatePrices.value.push({ value: 0, selections: [{ name: "", variety: "" }] });
}

function addProductPriceSelection(pIndex: number) {
	productUpdatePrices.value[pIndex].selections.push({ name: "", variety: "" });
}

function addProductImage() {
	productUpdateImages.value.push("");
}

function addProductDescriptionImage() {
	productUpdateDescriptionImages.value.push("");
}

async function handleUpdate() {
	productToUpdate.value.prices.forEach((price) => {
		price.selections = price.selections.filter((selection) => {
			return Object.values(selection).every((value) => value !== "");
		});
	});

	if (productUpdateImages.value) {
		const filteredImages = productUpdateImages.value.filter((image) => image !== "");
		productToUpdate.value.images = filteredImages.length > 0 ? filteredImages : null;
	}
	if (productUpdateDescriptionImages.value && productToUpdate.value.description) {
		const filteredImages = productUpdateDescriptionImages.value.filter((image) => image !== "");
		productToUpdate.value.description.images = filteredImages.length > 0 ? filteredImages : null;
	}

	await createProduct();
}

onMounted(async () => {
	if (props.productId) {
		await fetchProduct();

		if (productToEdit.value) {
			productToUpdate.value.sku = productToEdit.value.sku;
			productToUpdate.value.name = productToEdit.value.name;
			productToUpdate.value.stock = productToEdit.value.stock;
			productToUpdate.value.soldNum = productToEdit.value.soldNum;
			if (productToUpdate.value.description) {
				productToUpdate.value.description.text = productToEdit.value.description.text;
			}

			if (productToEdit.value.images) {
				productUpdateImages.value = productToEdit.value.images;
			}

			productUpdateDescriptionImages.value = productToEdit.value.description.images;
			productUpdatePrices.value = productToEdit.value.prices.map((price) => {
				return {
					value: price.value,
					selections: price.selections.length > 0 ? price.selections : [{ name: "", variety: "" }],
				};
			});

			if (productToEdit.value.petCategories) {
				productUpdatePetCategories.value = productToEdit.value.petCategories.map((category) => category.id);
			}

			if (productToEdit.value.itemCategories) {
				productUpdateItemCategories.value = productToEdit.value.itemCategories.map((category) => category.id);
			}
		}
	}
});
</script>

<style scoped lang="scss"></style>
