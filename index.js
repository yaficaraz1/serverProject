import express from "express";
import { config } from "dotenv";
import productRouter from "./routes/product.js";
import userRouter from "./routes/user.js"
import orderRouter from "./routes/orders.js"
import { connectToDB } from "./config/dbConfig.js";
// import cors from "cors "
import { erroHandling } from "./middlwares/errorHandling.js";

config();
connectToDB();
const app = express();
app.use(express.json())
// app.use(cors());
app.use("/api/product", productRouter);
app.use("/api/user", userRouter);
app.use("/api/orders", orderRouter);
app.use(erroHandling)

let port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`app is listening on port ${port}`)
})


