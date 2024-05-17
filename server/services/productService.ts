import * as productModel from "../model/product";
import * as priceModel from "../model/price";
import * as selectionModel from "../model/selection";
import * as varietyModel from "../model/variety";
import * as descriptionModel from "../model/description";
import * as productItemModel from "../model/productItem";
import * as orderModel from "../model/order";
import * as shipmentModel from "../model/shipment";
import * as priceService from "./priceService";
import * as cartService from "./cartService";
import { ProductProjection, ProductSummaryProjection, ProductsPaginatedProjection } from "../projections/productProjections";
import { PriceProjection } from "../projections/priceProjections";
import { SelectionProjection } from "../projections/selectionProjection";
import { DescriptionProjection } from "../projections/descriptionProjection";
import moment from "moment";

export const createProduct = async (fullProductDto: productModel.FullProductDTO) => {
	const { description, prices, ...productDto } = fullProductDto;

	const createdProduct = await productModel.save(productDto);
	if (!createdProduct) {
		throw createError({
			statusCode: 500,
			statusMessage: "Something went wrong",
			message: "Failed saving product to database.",
		});
	}

	let createdProductDescription: descriptionModel.Description | null;
	if (description) {
		createdProductDescription = await descriptionModel.save({ ...description, productId: createdProduct.id });
	}

	if (prices) {
		const selectionNames: string[] = [];
		for (const price of prices) {
			if (price.selections && price.selections.length > 0) {
				for (const selection of price.selections) {
					if (!selectionNames.includes(selection.name)) {
						const savedSelection = await selectionModel.save({ name: selection.name, productId: createdProduct.id });
						if (!savedSelection) {
							throw createError({
								statusCode: 500,
								statusMessage: "Something went wrong",
								message: "Failed saving product's selection to database.",
							});
						}

						selectionNames.push(selection.name);
					}
				}
			}
		}

		for (const price of prices) {
			let savedPrice: priceModel.Price | null = null;
			if (price.value) {
				savedPrice = await priceModel.save({ value: price.value, productId: createdProduct.id });
			}
			if (!savedPrice) {
				throw createError({
					statusCode: 500,
					statusMessage: "Something went wrong",
					message: "Failed saving product's price to database.",
				});
			}

			if (selectionNames.length > 0) {
				const selectionModelArr = await selectionModel.findAllByProductId(createdProduct.id);
				if (!selectionModelArr || selectionModelArr.length <= 0) {
					throw createError({
						statusCode: 500,
						statusMessage: "Something went wrong",
						message: "Failed processing saved product's selections.",
					});
				}

				const varietyNames: string[] = [];
				for (const selection of price.selections) {
					const selectionModel = selectionModelArr.find((_selection) => _selection.name === selection.name);

					if (selectionModel && !varietyNames.includes(selection.variety)) {
						const savedVariety = await varietyModel.save({
							name: selection.variety,
							selectionId: selectionModel.id,
							productItemId: null,
							priceId: savedPrice.id,
						});
						if (!savedVariety) {
							throw createError({
								statusCode: 500,
								statusMessage: "Something went wrong",
								message: "Failed saving product's variety.",
							});
						}

						varietyNames.push(selection.variety);
					}
				}
			}
		}
	}

	const createdProductProjection = await getProduct(createdProduct.id);
	return createdProductProjection;
};

export const getProducts = async (pageNum: number = 0, search: string = "", pet?: number, item?: number) => {
	const resultProduct = await productModel.findAll(pageNum, search, pet, item);
	const productsPaginatedProjection: ProductsPaginatedProjection = {
		content: await mapObjectArrayToClass(resultProduct.content, ProductSummaryProjection),
		pagination: resultProduct.pagination,
	};

	for (const [index, product] of productsPaginatedProjection.content.entries()) {
		productsPaginatedProjection.content[index].price = await priceService.getProductPriceSummary(product.id);
	}

	return productsPaginatedProjection;
};

export const getProduct = async (id: number) => {
	let result = (await productModel.findById(id)) as any as ProductProjection;
	if (!result) {
		throw createError({
			statusCode: 404,
			statusMessage: "Product Not Found",
			message: "Product does not exist.",
		});
	}

	const priceModelArr = await priceModel.findAllByProductId(id);
	if (priceModelArr.length <= 0) {
		throw createError({
			statusCode: 404,
			statusMessage: "`prices` Field Not Found",
			message: "Product missing values for `prices` field.",
		});
	}

	const selectionModelArr = await selectionModel.findAllByProductId(id);

	if (result) {
		// For `prices` field
		result.prices = priceModelArr as any[] as PriceProjection[];

		for (let [index, price] of result.prices.entries()) {
			price.selections = await priceService.getPriceSelectionsVariety(priceModelArr[index].id);

			result.prices[index] = await mapObjectToClass(price, PriceProjection);
		}

		// For `selections` field
		result.selections = selectionModelArr as any[] as SelectionProjection[];

		for (let [index, selection] of result.selections.entries()) {
			selection.varieties = (await varietyModel.findAllBySelectionId(selectionModelArr[index].id)).map(
				(variety) => variety.name
			);

			result.selections[index] = await mapObjectToClass(selection, SelectionProjection);
		}

		const description = await descriptionModel.findOneByProductId(id);
		if (!description) {
			throw createError({
				statusCode: 404,
				statusMessage: "`description` Field Not Found",
				message: "Product missing values for `description` field.",
			});
		}
		result.description = await mapObjectToClass(description, DescriptionProjection);

		// Finishing Touches
		result = await mapObjectToClass(result, ProductProjection);
	}

	for (const [index, product] of result.selections.entries()) {
		result.selections[index].varieties = [...new Set(product.varieties)];
	}

	return result;
};

export const addToCart = async (requestBody: { productId: number; priceId: number; quantity: number; cartId: number }) => {
	const productItemDto: productItemModel.ProductItemDTO = {
		status: "ON_CART",
		quantity: requestBody.quantity,
		totalPrice: 0,
		productId: requestBody.productId,
		priceId: requestBody.priceId,
		orderId: null,
		cartId: requestBody.cartId,
	};

	if (!productItemDto.cartId) {
		throw createError({
			statusCode: 422,
			statusMessage: "Unprocessable Entity",
			message: "Request payload object doesn't have value for `cartId`",
		});
	}

	// Set `totalPrice`
	const selectedVarietyPrice = await priceModel.findById(productItemDto.priceId);
	if (selectedVarietyPrice) {
		productItemDto.totalPrice = selectedVarietyPrice?.value * productItemDto.quantity;
	} else {
		throw createError({
			statusCode: 404,
			statusMessage: "Price Not Found",
			message: "Supplied `priceId` does not exist.",
		});
	}

	const similarProductItemInCart = await productItemModel.findOneInCartByPriceId(
		productItemDto.cartId,
		productItemDto.priceId
	);

	let savedProductItem: productItemModel.ProductItem | null = null;
	if (similarProductItemInCart) {
		productItemDto.quantity = productItemDto.quantity + similarProductItemInCart.quantity;
		productItemDto.totalPrice =
			parseInt(productItemDto.totalPrice.toString()) + parseInt(similarProductItemInCart.totalPrice.toString());
		savedProductItem = await productItemModel.update(similarProductItemInCart.id, productItemDto);
	} else {
		savedProductItem = await productItemModel.save(productItemDto);
	}

	const updatedCart = await cartService.updateCartCount(productItemDto.cartId);

	return { productItem: savedProductItem, cart: updatedCart ? updatedCart : null };
};

export const orderCheckout = async (orderCheckoutDto: orderModel.OrderCheckoutDTO) => {
	const orderDto: orderModel.OrderDTO = {
		orderDate: moment().format("YYYY-MM-DD HH:mm:ss"),
		totalPrice: 0,
		paymentMethod: "COD",
		customerId: orderCheckoutDto.customerId,
	};

	for (const id of orderCheckoutDto.productItemsId) {
		const productItem = await productItemModel.findById(id);
		if (!productItem) {
			throw createError({
				statusCode: 404,
				statusMessage: "Product Item Not Found",
				message: "An ID in the supplied `productItemsId` may not exist.",
			});
		}

		orderDto.totalPrice = orderDto.totalPrice + parseInt(productItem?.totalPrice.toString());
	}

	const order = await orderModel.save(orderDto);
	if (!order) {
		throw createError({
			statusCode: 500,
			statusMessage: "Internal Serve Error",
			message: "Something went wrong in saving `order`. Can't find potentially saved `order`.",
		});
	}

	const shipment = await shipmentModel.save({
		shipmentDate: moment(orderDto.orderDate).add(2, "days").format("YYYY-MM-DD HH:mm:ss"),
		address: orderCheckoutDto.address,
		zipCode: orderCheckoutDto.zipCode,
		country: orderCheckoutDto.country,
		customerId: orderDto.customerId,
		orderId: order.id,
	});

	orderCheckoutDto.productItemsId.forEach(async (id) => {
		try {
			await productItemModel.moveToOrder(id, order.id);
		} catch (error) {
			throw error;
		}
	});

	const updatedCart = await cartService.updateCartCountByCustomerId(orderDto.customerId);

	return {
		order: order,
		shipment: shipment,
		cart: updatedCart,
	};
};
