import { Order, orderValidator } from "../models/orders.js";
import mongoose from "mongoose";

export const getAllOrders = async (req, res) => {
    let { search, page, perPage } = req.query;
    perPage = perPage || 10;
    page = page || 1;
    try {
        let allOrders;
        let serachObject = {};
        if (search)
            serachObject.name = new RegExp(search, "i");

        allOrders = await Order.find(serachObject)
            .skip((page - 1) * perPage)
            .limit(perPage);
        res.json(allOrders)
    }
    catch (err) {
        res.status(400).send("לא ניתן לקבל את כל ההזמנות" + err.message)
    }
}

export const addOrder = async (req, res) => {
    let { orderDate, deliveryDate, costumerId, address, products, isOrderSent } = req.body;
    let validate = orderValidator(req.body);
    if (validate.error)
        return res.status(400).json(validate.error.details[0])
    try {
        let sameOrder = await Order.find({ orderDate, costumerId });
        if (sameOrder.length > 0)
            return res.status(409).send("  כבר קיימת הזמנה באותו תאריך לאותו משתמש ")
        let newOrder = await Order.create({ orderDate, deliveryDate, costumerId, address, products, isOrderSent });
        return res.status(201).json(newOrder)
    }
    catch (err) {
        res.status(400).send(" אין אפשרות להוסיף את ההזמנה  " + err)
    }
}

export const deleteOrder = async (req, res) => {
    let { orderid } = req.params;
    if (!mongoose.isValidObjectId(orderid))
        return res.status(400).send(" לא נמצא הזמנה עם כזה מזהה ");
    try {
        let orderToDelete = await Order.findById(orderid);
        if (!orderToDelete)
            return res.status(400).send(" אין הזמנה אם כזה מזהה")
        if (orderToDelete.isOrderSent)
            return res.status(400).send(" לא ניתן למחוק הזמנה שכבר נשלחה")
        if (req.user._id == orderToDelete.costumerId || req.user.role == 'ADMIN') {
            let deletedOrder = await Order.findByIdAndDelete(orderid);
            res.status(200).json(deletedOrder);
        }
        else
            res.status(401).send("אינך רשאי למחוק את ההזמנה");
    }
    catch (err) {
        res.status(500).send('failed to delete order');
        console.log(err);
    }
}

export const getAllOrdersById = async (req, res) => {
    try {
        let {custid}= req.params;
        let serachObject={};
        serachObject.costumerId=custid;
        let ordersUser = await Order.find(serachObject)
        if (ordersUser.length == 0)
            return res.status(404).send("אין לך הזמנות");
        res.json(ordersUser);
    }
    catch (err) {
         res.status(400).send(" התרחשה שגיעה " + err.message);
        console.log(err);
    }
}

export const updateOrder= async (req, res) => {
    let { orderid } = req.params;
    if (!mongoose.isValidObjectId(orderid))
        return res.status(400).send("הקוד לא תקין");
    try {
        let orderToUpdate = await Order.findById(orderid);
        if (!orderToUpdate)
            return res.status(404).send(" אין אפשרות לעדכן כי הקוד אינו קיים ");
        if (req.user._id != orderToUpdate.costumerId && req.user.role != "ADMIN")
            return res.status(404).send(" אינך יכול לעדכן כי אתה לא מוגדר במערכת ");
        orderToUpdate.isOrderSent = true;
        await orderToUpdate.save();
        res.json(orderToUpdate)
    }
    catch (err) {
        return res.status(400).send(" התרחשה שגיעה " + err.message);
    }
}




