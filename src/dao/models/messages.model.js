import mongoose from "mongoose";

const collection = "Messages";

const messagesSchema = new mongoose.Schema({
    username: String,
    message: String,
    timestamp: { type: Date, default: Date.now },
})

const messagesModel = mongoose.model(collection,messagesSchema);

export default messagesModel;