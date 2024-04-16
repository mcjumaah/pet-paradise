import { useBase, createRouter, defineEventHandler } from "#imports";
import * as productCtrl from "../controller/productController";

const router = createRouter();

router.get("/products", defineEventHandler(productCtrl.findAll));
router.get("/product", defineEventHandler(productCtrl.findOne));
router.post("/product", defineEventHandler(productCtrl.save));
router.put("/product", defineEventHandler(productCtrl.update));
router.delete("/product", defineEventHandler(productCtrl.deleteOne));

export default useBase("/api", router.handler);
