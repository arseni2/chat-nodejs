import mongoose = require("mongoose");


export async function InitDataBase() {
    await mongoose.connect('mongodb://localhost:27017/chatDB', {})
}