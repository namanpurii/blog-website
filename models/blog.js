import mongoose from "mongoose";
const {Schema, model} = mongoose;

const blogSchema = new Schema({
    title: {
        type: String, 
        required: true,
    },
    description: {
        type: String, 
        required: true,
    },
    content: {
        type: String, 
        required: true,
    },
    dop: {
        type: Date, 
        default: Date.now
    }
}) 

const blogModel = model('Blog', blogSchema)
export default blogModel
