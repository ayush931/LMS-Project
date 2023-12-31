import { model, Schema } from "mongoose";

const paymentSchema = new Schema({
    razorpay_payment_id: {
        type: String,
        require: true
    },
    razorpay_subscription_id: {
        type: String,
        require: true
    },
    razorpay_signature: {
        type: String,
        require: true
    }
}, {
    timestamps: true
})

const payment = model('Payment', paymentSchema)

export default payment