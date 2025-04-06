import {v2 as cloudinary} from "cloudinary";
import Blog from "../models/blog.model.js";

export const fetchBlog = async (req,res) => {
	const blogId = req.params.id;
	try {
		const blog = await Blog.findById(blogId);
		if(!blog) return res.status(404).json({error: "Blog not found"});
		res.status(200).json(blog);
	} catch (error) {
		console.log("error in fetching blog:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
}

export const fetchBlogs = async (req, res) => {
	try {
		const blogs = await Blog.find().sort({createdAt: -1});

		res.status(200).json({ data: blogs });
	} catch (error) {
		console.log("error in fetching blogs:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

export const createBlog = async (req, res) => {
	try {
	  const { title, content, category } = req.body;
  
	  if (!title || !content || !category || !req.file) {
		return res.status(400).json({ success: false, error: "Please provide all fields" });
	  }
  
	  // Upload to Cloudinary
	  const uploadedImage = await cloudinary.uploader.upload(req.file.path);
	  const imageUrl = uploadedImage.secure_url;
  
	  const newBlog = new Blog({
		title,
		content,
		category,
		image: imageUrl,
		imageurl: req.file.path, // optional: save local path too
	  });
  
	  await newBlog.save();
  
	  res.status(201).json({ success: true, data: newBlog });
  
	} catch (err) {
	  console.error("Error uploading blog:", err);
	  res.status(500).json({ success: false, error: "Server error" });
	}
  };

export const deleteBlog = async (req, res) => {
	try {
		const blogId = req.params.id;
		
		let blog = await Blog.findById(blogId);
		if(!blog) return res.status(404).json({error: "Blog not found"});

		await Blog.findByIdAndDelete(blogId);

		res.status(200).json({message: "Blog deleted successfully"});
	} catch (error) {
		console.log("error in deleting blog:", error);
		res.status(500).json({error: "Server Error"});
	}
};
