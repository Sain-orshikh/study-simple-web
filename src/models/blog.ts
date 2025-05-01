import mongoose, { Schema, Document, Model } from 'mongoose';

// Define interfaces for the document and model
interface IComment extends Document {
  content: string;
  author: string;
  createdAt: Date;
  updatedAt: Date;
}

interface IBlog extends Document {
  title: string;
  content: string;
  image: string;
  category: string;
  imageurl?: string;
  author: string;
  likes: number;
  comments: IComment[];
  createdAt: Date;
  updatedAt: Date;
}

// Define the schema
const commentSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    default: "Anonymous",
  }
}, { timestamps: true });

const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
    default: "",
  },
  content: {
    type: String,
    required: true,
    default: "",
  },
  image: {
    type: String,
    required: true,
    default: "",
  },
  category: {
    type: String,
    required: true,
    default: "",
  },
  imageurl: {
    type: String,
    default: "",
  },
  author: {
    type: String,
    default: "Anonymous",
  },
  likes: {
    type: Number,
    default: 0,
  },
  comments: [commentSchema]
}, { timestamps: true });

// Create and export the model
// Check if the model exists before creating a new one to prevent overwriting in development
const Blog: Model<IBlog> = 
  mongoose.models.Blog || mongoose.model<IBlog>('Blog', blogSchema);

export default Blog;