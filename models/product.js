import mongoose from "mongoose";
import joi from "joi";
const productSchema = mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    dateOfProduction: { type: Date, default: Date.now() },
    unitsInStock: { type: Number, required: true }
})
export const Product = mongoose.model("product", productSchema);

export const productValidator = (_productToValidate) => {
    let productJoi = joi.object({
        name: joi.string().required(),
        description: joi.string().required(),
        dateOfProduction: joi.date().default(Date.now),
        unitsInStock: joi.number().required()
    })
    return productJoi.validate(_productToValidate);
};
