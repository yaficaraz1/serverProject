import express from "express";
import * as orderController from "../controllers/orders.js";
import { authAdmin,auth } from "../middlwares/Auth.js";

const orderRouter = express.Router();
orderRouter.get("/",authAdmin, orderController.getAllOrders);
orderRouter.get("/:custid",auth, orderController.getAllOrdersById);
orderRouter.delete("/:orderid", auth, orderController.deleteOrder);
orderRouter.post("/", auth, orderController.addOrder);
orderRouter.put("/:orderid", authAdmin, orderController.updateOrder);

export default orderRouter;


