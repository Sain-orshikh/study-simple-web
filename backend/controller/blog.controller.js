import {v2 as cloudinary} from "cloudinary";
import streamifier from "streamifier";
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
	  const { title, content, category, imageUrl: directUrl } = req.body;
	  console.log("directUrl:", req.file);
	  console.log("file:", req.file);
	  if (!req.file && !directUrl) {
		return res.status(400).json({
		  success: false,
		  error: "Please provide an image",
		});
	  }
	  if (!title || !content || !category || (!req.file && !directUrl)) {
		return res.status(400).json({
		  success: false,
		  error: "Please provide all required fields and an image",
		});
	  }
  
	  let finalImageUrl;
  
	  if (req.file) {
		// Uploaded file via multer (use streamifier + cloudinary)
		const streamUpload = (buffer) =>
		  new Promise((resolve, reject) => {
			const stream = cloudinary.uploader.upload_stream(
			  { folder: "blog-images" },
			  (error, result) => {
				if (result) resolve(result);
				else reject(error);
			  }
			);
			streamifier.createReadStream(buffer).pipe(stream);
		  });
  
		const uploadedImage = await streamUpload(req.file.buffer);
		finalImageUrl = uploadedImage.secure_url;
	  } else if (directUrl) {
		// User provided a URL string
		// Optionally re-upload to Cloudinary for CDN benefits
		const uploadedImage = await cloudinary.uploader.upload(directUrl, {
		  folder: "blog-images",
		});
		finalImageUrl = uploadedImage.secure_url;
	  }
  
	  const newBlog = new Blog({
		title,
		content,
		category,
		image: finalImageUrl,
	  });
  
	  await newBlog.save();
  
	  res.status(201).json({ success: true, data: newBlog });
  
	} catch (err) {
	  console.error("Error uploading blog:", err.message);
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
