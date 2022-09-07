import mongoose, { model, models, Schema } from "mongoose";


const OrderSchema = new Schema({
    orderId: {type: Number, required: true},
    custInfo: {type: Object, required: true},
    custAddress: {type: Object},
    orderItems: {type: Array, required: true},
    orderTotal: {type: Number, required: true},
    orderStatus: {type: String, default: "Pending"},
    operatorId: {type: Number, required: true, default: 12345},
},{timestamps: true});

export default models.Order || model("Order", OrderSchema);