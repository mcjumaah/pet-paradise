import { useBase, createRouter, defineEventHandler } from "#imports";
import * as productCtrl from "../controller/productController";
import * as customerCtrl from "../controller/customerController";

const router = createRouter();

router.get("/products", defineEventHandler(productCtrl.findAll));
router.get("/product", defineEventHandler(productCtrl.findOne));
router.post("/product", defineEventHandler(productCtrl.save));
router.put("/product", defineEventHandler(productCtrl.update));
router.delete("/product", defineEventHandler(productCtrl.deleteOne));

router.post("/customer", defineEventHandler(customerCtrl.save));

export default useBase("/api", router.handler);
