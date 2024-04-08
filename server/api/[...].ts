import { useBase, createRouter, defineEventHandler } from "#imports";
import * as productCtrl from "../controller/productController";

const router = createRouter();

router.get("/product", defineEventHandler(productCtrl.findAll));
router.get("/product/:id", defineEventHandler(productCtrl.findById));
router.post("/product", defineEventHandler(productCtrl.save));
router.put("/product/:id", defineEventHandler(productCtrl.update));
router.delete("/product/:id", defineEventHandler(productCtrl.deleteById));

export default useBase("/api", router.handler);
