import { useBase, createRouter, defineEventHandler } from "#imports";
import * as productCtrl from "../controller/productController";

const router = createRouter();

router.get("/product", defineEventHandler(productCtrl.find));
router.get("/products", defineEventHandler(productCtrl.find));
router.post("/product", defineEventHandler(productCtrl.save));
router.put("/product", defineEventHandler(productCtrl.update));
router.delete("/product", defineEventHandler(productCtrl.deleteById));

export default useBase("/api", router.handler);
