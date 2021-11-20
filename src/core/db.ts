import mongoose = require("mongoose");


export async function InitServer() {
    await mongoose.connect('mongodb://localhost:27017/chatDB', {})
}