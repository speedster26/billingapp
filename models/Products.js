import mongoose, { model, models, Schema } from "mongoose";

const ProductSchema = new Schema({
    storeId: {type: String, required: true},
    title: {type: String, required: true},
    price: {type: Number, required: true},
    tax: {type: Number, required: true},
    desc: {type: String, required: true},
    image: {type: String, required: true},
    serNo: {type: String, required: true},
    category: {type: String, required: true},
    color: {type: String, required: true},
    size: {type: String, required: true},
    availableQty: {type: Number, required: true},
},{timestamps: true});

export default models.Product || model("Product", ProductSchema);