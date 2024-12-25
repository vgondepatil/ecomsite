import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'seller'], default: 'user' },
    businessName: { type: String }, // Add this for sellers
    phone: { type: String }, // Add this for sellers
    gstin: { type: String, required: true },
    cartData: { type: Object, default: {} }
}, { minimize: false })

const userModel = mongoose.models.user || mongoose.model('user',userSchema);

export default userModel