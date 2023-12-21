import mongoose from "mongoose";

const collection = "Carts";

const cartsSchema = new mongoose.Schema({
    products: [{
        product: Number,
        quantity: Number
    }]
})

const cartsModel = mongoose.model(collection,cartsSchema);

export default cartsModel;