import mongoose from "mongoose";

const collection = "Products";

const productsSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Decimal128,
    code:{
        type: String,
        unique: true
    },
    stock: Number
})

const productsModel = mongoose.model(collection,productsSchema);

export default productsModel;