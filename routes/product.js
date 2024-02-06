import express from "express";
import * as productController from "../controllers/product.js";
import { authAdmin } from "../middlwares/Auth.js";

const productRouter = express.Router();
productRouter.get("/", productController.getAllProduct)
productRouter.get("/:id", productController.getProductById)
productRouter.delete("/:id", authAdmin, productController.deletePtoduct)
productRouter.post("/", authAdmin, productController.addProduct)
productRouter.put("/:productId", authAdmin, productController.updateProduct)

export default productRouter;


