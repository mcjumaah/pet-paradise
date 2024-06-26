import { useBase, createRouter, defineEventHandler } from "#imports";
import * as productCtrl from "../controller/productController";
import * as customerCtrl from "../controller/customerController";
import * as cartCtrl from "../controller/cartController";
import * as orderCtrl from "../controller/orderController";
import * as categoryCtrl from "../controller/categoryController";
import * as adminCtrl from "../controller/adminController";

const router = createRouter();

router.get("/products", defineEventHandler(productCtrl.getProducts));
router.get("/product", defineEventHandler(productCtrl.getProduct));
router.post("/product", defineEventHandler(productCtrl.createProduct));
router.put("/product", defineEventHandler(productCtrl.editProduct));
router.delete("/product", defineEventHandler(productCtrl.deleteProduct));
router.post("/product/to-cart", defineEventHandler(productCtrl.addToCart));
router.post("/products/to-order", defineEventHandler(productCtrl.orderCheckout));

router.get("/customer", defineEventHandler(customerCtrl.getCustomer));
router.post("/customer", defineEventHandler(customerCtrl.createCustomer));
router.put("/customer", defineEventHandler(customerCtrl.editCustomer));
router.get("/customer/validate-new-email", defineEventHandler(customerCtrl.validateNewEmail));
router.get("/customer/validate-new-password", defineEventHandler(customerCtrl.validateNewPassword));

router.get("/cart", defineEventHandler(cartCtrl.getCart));
router.get("/cart/items", defineEventHandler(cartCtrl.getCartItems));
router.put("/cart/item/quantity", defineEventHandler(cartCtrl.updateCartItemQuantity));
router.delete("/cart/item", defineEventHandler(cartCtrl.deleteCartItem));

router.get("/orders", defineEventHandler(orderCtrl.getOrders));

router.get("/category/item-types", defineEventHandler(categoryCtrl.getItemTypes));
router.get("/category/pet-types", defineEventHandler(categoryCtrl.getPetTypes));

router.get("/admin", defineEventHandler(adminCtrl.getAdmin));

export default useBase("/api", router.handler);
