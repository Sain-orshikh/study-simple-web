import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        default: "",
    },
    content:{
        type: String,
        required: true,
        default: "",
    },
    image:{
        type: String,
        required: true,
        default: "",
    },
    category:{
        type: String,
        required: true,
        default: "",
    },
    imageurl:{
        type: String,
        default: "",
    },

},{timestamps: true});

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;