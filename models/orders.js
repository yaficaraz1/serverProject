// import mongoose from "mongoose";
// import joi from "joi";
// import { addressSchema } from './address.js';

// const theProductDetails = mongoose.Schema({
//   _id: { type: mongoose.Schema.Types.ObjectId, required: true },
//   price: { type: Number, required: true },
//   description: { type: String, required: true },
//   quantity: { type: Number, default: 1 }
// });

// const orderSchema = mongoose.Schema({
//   orderDate: { type: Date, default: Date.now },
//   dueDate: { type: Date, required: true },
//   address: { type: addressSchema, required: true },
//   owner: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
//   products: { type: [theProductDetails], required: true },
//   isSent: { type: Boolean, default: false }
// });

// export const Order = mongoose.model("orders", orderSchema);

// export const orderValidator = (_orderToValidate) => {
//   let orderJoi = joi.object({
//     orderDate: joi.date().default(Date.now()),
//     dueDate: joi.date().required(),
//     address: joi.object({
//       city: joi.string().required(),
//       street: joi.string().required(),
//       houseNumber: joi.number().required()
//     }).required(),
//     owner: joi.string().hex().length(24).required(),
//     products: joi.array().items(
//         joi.object({
//         _id: joi.string().hex().length(24).required(),
//         price: joi.number().required(),
//         description: joi.string().required(),
//         quantity: joi.number().default(1)
//       })
//     ).required(),
//     isSent: joi.boolean().default(false)
//   });

//   return orderJoi.validate(_orderToValidate);
// };

import joi from "joi";
import mongoose from "mongoose";


const productSchema = mongoose.Schema({
  productCode: String,//של מוצר _id 
  name: String,
  price: Number,
  company: String,
  quantity: Number,
});



const orderSchema = mongoose.Schema({
  orderDate: { type: Date, default: Date.now() },
  deliveryDate: { type: Date },
  costumerId: { type: String },
  address: {
    street: { type: String },
    city: { type: String }
  },
  products: [productSchema],
  isOrderSent: { type: Boolean, default: false }
})
export const Order = mongoose.model("orders", orderSchema);
export const orderValidator = (_orderToValidate) => {
  const orderJoi = joi.object({
    orderDate: joi.date().default(Date.now),
    deliveryDate: joi.date(),
    costumerId: joi.string(),
    address: joi.object({
      street: joi.string(),
      city: joi.string()
    }),
    products: joi.array().items(joi.object({
      productCode: joi.string(),
      name: joi.string(),
      price: joi.number().min(0),
      company: joi.string(),
      quantity: joi.number().min(1)
    })),
    isOrderSent: joi.boolean().default(false),

  })

  return orderJoi.validate(_orderToValidate);
};


