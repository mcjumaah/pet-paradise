import { useBase, createRouter, defineEventHandler } from "#imports";
import * as productCtrl from "../controller/productController";
import * as customerCtrl from "../controller/customerController";
import * as cartCtrl from "../controller/cartController";

const router = createRouter();

router.get("/products", defineEventHandler(productCtrl.getProducts));
router.get("/product", defineEventHandler(productCtrl.getProduct));
router.post("/product", defineEventHandler(productCtrl.createProduct));
router.put("/product", defineEventHandler(productCtrl.editProduct));
router.delete("/product", defineEventHandler(productCtrl.deleteProduct));
router.post("/product/to-cart", defineEventHandler(productCtrl.addToCart));

router.get("/customer", defineEventHandler(customerCtrl.getCustomer));
router.post("/customer", defineEventHandler(customerCtrl.createCustomer));
router.get("/customer/validate-new-email", defineEventHandler(customerCtrl.validateNewEmail));
router.get("/customer/validate-new-password", defineEventHandler(customerCtrl.validateNewPassword));

router.get("/cart", defineEventHandler(cartCtrl.getCart));

export default useBase("/api", router.handler);
