import mongoose from "mongoose";

const userAccounts = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        maxLength: 20,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    }, 
    password: {
        type: String,
        required: true
    }, grade: {
        type: String,
        // required: true,
        default: '7'
    }, avatar: {
        type: String,
        default: ''
    }
}, {timestamps: true})

export default mongoose.models.User || mongoose.model("User", userAccounts)