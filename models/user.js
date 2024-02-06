import joi from "joi";
import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    email: { type: String, required: true ,unique:true},
    userName:  {type:String, required: true},
    password: { type: String, required: true ,unique: true},
    role: {type: String, default: "USER"},
    SiteRegistrationDate:{type: Date ,default : Date.now()}
})
export const User = mongoose.model("user", userSchema);

export const userValidator = (_userToValidate) => {
    let userJoi = joi.object({
        email: joi.string().required().unique(),
        userName: joi.string().required(),
        password: joi.string().require().unique(),
        role: joi.string().default("USER"),
        SiteRegistrationDate:Joi.Date().default(DATE.now())
    })
    return userJoi.validate(_userToValidate);
};