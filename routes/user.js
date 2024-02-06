import express from "express";
import * as userController from "../controllers/user.js";
import { authAdmin } from "../middlwares/Auth.js";


const userRouter = express.Router();

userRouter.post("/", userController.addUser);
userRouter.post("/login", userController.login);
userRouter.get("/", authAdmin, userController.getAllUsers);



export default userRouter;
