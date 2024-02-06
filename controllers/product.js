import { Product, productValidator } from "../models/product.js";
import mongoose from "mongoose";
export const getAllProduct = async (req, res) => {
    let { search, page, perPage } = req.query;
    perPage = perPage || 10;
    try {
        let allProduct;
        let searchObject = {};
        if (search) {
            searchObject.name = new RegExp(search, "i");
        }
        allProduct = await Product.find(searchObject)
            .skip((page - 1) * perPage)
            .limit(perPage)
        res.json(allProduct)
    }
    catch (err) {
        res.status(400).send(" לא ניתן לקבל את כל המוצרים " + err.message)
    }
}
export const getProductById = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id))
            return res.status(400).send("קוד אינו תקין")
        let product = await Product.findById(req.params.id)
        console.log(product);
        if (!product)
            return res.status(404).send("לא קיים מוצר עם כזה קוד")
        res.json(product)
    }
    catch (err) {
        res.status(400).send(" לא ניתן לקבל את המוצר " + err.message)
    }

}
export const deletePtoduct = async (req, res) => {
    let { id } = req.params;
    if (!mongoose.isValidObjectId(id))
        return res.status(400).send("  לא קיים כזה קוד מוצר");
    let deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct)
        return res.status(404).send("לא נמצא מוצר  עם כזה קוד למחיקה")
    return res.json(deletedProduct);
}

export const updateProduct = async (req, res) => {
    let { productId } = req.params;
    if (!mongoose.isValidObjectId(productId))
        return res.status(400).send("not valid id");
    try {

        let productToUpdate = await Product.findById(productId);
        if (!productToUpdate)
            return res.status(404).send("לא נמצא מוצר עם קוד כזה")
        productToUpdate.name = req.body.name || bookToUpdate.name;
        productToUpdate.description = req.body.description || productToUpdate.description;
        productToUpdate.dateOfProduction = req.body.dateOfProduction || productToUpdate.dateOfProduction;
        productToUpdate.unitsInStock = req.body.unitsInStock || productToUpdate.unitsInStock;

        await productToUpdate.save();
        res.json(productToUpdate);
    } catch (err) {
        res.status(400).send("אא לעדכן" + err)
    }

}


export const addProduct = async (req, res) => {
    let { name, description, dateOfProduction, unitsInStock } = req.body;
    let validate = productValidator(req.body);
    if (validate.error)
        return res.status(400).json(validate.error.details[0])
    try {
        let sameProduct = await Product.find({ name });
        if (sameProduct.length > 0)
            return res.status(409).send(" כבר קיים מוצר בשם כזה ")
        let newProduct = await Product.create({ name, description, dateOfProduction, unitsInStock });
        return res.status(201).json(newProduct)
    }
    catch (err) {
        res.status(400).send(" אין אפשרות להוסיף את המוצר  " + err)
    }
}






