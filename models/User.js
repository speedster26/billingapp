import mongoose, { model, models, Schema } from "mongoose";

const StoreSchema = new Schema({
    storeId: {type: String, required: true,unique:true},
    storeName: {type: String, required: true},
    storePOS: {type: Array, default:[]},
    storeType: {type: String, required: true},
},{timestamps: true});
const UserSchema = new Schema({
    miid: {type: String, required: true, unique:true},
    name: {type: String, required: true},
    password: {type: String, required: true},
    store: [StoreSchema],
},{timestamps: true});

export default models.User || model("User", UserSchema);