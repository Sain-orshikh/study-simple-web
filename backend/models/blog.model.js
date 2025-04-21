import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        default: "Anonymous",
    }
}, { timestamps: true });

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
    author:{
        type: String,
        default: "Anonymous",
    },
    likes:{
        type: Number,
        default: 0,
    },
    comments: [commentSchema]
},{timestamps: true});

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;