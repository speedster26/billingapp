import mongoose, { model, models, Schema } from "mongoose";

const UserSchema = new Schema({
    miid: {type: String, required: true, unique:true},
    name: {type: String, required: true},
    password: {type: String, required: true}
},{timestamps: true});

export default models.User || model("User", UserSchema);