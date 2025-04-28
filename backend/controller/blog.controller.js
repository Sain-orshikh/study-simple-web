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
	  const { title, content, category, imageUrl: directUrl, author } = req.body;
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
		author: author || "Anonymous",
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

// New controller methods for likes and comments

export const likeBlog = async (req, res) => {
    try {
        const blogId = req.params.id;
        
        const blog = await Blog.findById(blogId);
        if(!blog) return res.status(404).json({error: "Blog not found"});
        
        // Increment likes
        blog.likes = (blog.likes || 0) + 1;
        await blog.save();
        
        res.status(200).json({ 
            success: true, 
            likes: blog.likes,
            message: "Blog liked successfully" 
        });
    } catch (error) {
        console.log("Error liking blog:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// New controller method for unliking a blog
export const unlikeBlog = async (req, res) => {
    try {
        const blogId = req.params.id;
        
        const blog = await Blog.findById(blogId);
        if(!blog) return res.status(404).json({error: "Blog not found"});
        
        // Decrement likes, but ensure it doesn't go below 0
        blog.likes = Math.max(0, (blog.likes || 0) - 1);
        await blog.save();
        
        res.status(200).json({ 
            success: true, 
            likes: blog.likes,
            message: "Blog unliked successfully" 
        });
    } catch (error) {
        console.log("Error unliking blog:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// New controller method for disliking a blog (which also removes a like if it exists)
export const dislikeBlog = async (req, res) => {
    try {
        const blogId = req.params.id;
        
        const blog = await Blog.findById(blogId);
        if(!blog) return res.status(404).json({error: "Blog not found"});
        
        // If there are likes, decrement by 1 (assuming user previously liked)
        if (blog.likes > 0) {
            blog.likes = blog.likes - 1;
        }
        
        await blog.save();
        
        res.status(200).json({ 
            success: true, 
            likes: blog.likes,
            message: "Blog disliked successfully" 
        });
    } catch (error) {
        console.log("Error disliking blog:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const addComment = async (req, res) => {
    try {
        const blogId = req.params.id;
        const { content, author } = req.body;
        
        if(!content) {
            return res.status(400).json({
                success: false,
                error: "Comment content is required"
            });
        }
        
        const blog = await Blog.findById(blogId);
        if(!blog) return res.status(404).json({error: "Blog not found"});
        
        // Add new comment
        blog.comments.push({
            content,
            author: author || "Anonymous"
        });
        
        await blog.save();
        
        res.status(201).json({
            success: true,
            comment: blog.comments[blog.comments.length - 1],
            message: "Comment added successfully"
        });
    } catch (error) {
        console.log("Error adding comment:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const getComments = async (req, res) => {
    try {
        const blogId = req.params.id;
        
        const blog = await Blog.findById(blogId);
        if(!blog) return res.status(404).json({error: "Blog not found"});
        
        res.status(200).json({
            success: true,
            comments: blog.comments
        });
    } catch (error) {
        console.log("Error fetching comments:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const updateBlog = async (req, res) => {
  try {
    const blogId = req.params.id;

    // First check if the blog exists
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ success: false, error: "Blog not found" });
    }

    // Extract update data from request body
    const { title, content, category, author, imageUrl } = req.body;

    // Prepare update object with only provided fields
    const updateData = {};
    if (title) updateData.title = title;
    if (content) updateData.content = content;
    if (category) updateData.category = category;
    if (author) updateData.author = author;

    // Handle image update if provided
    if (req.file) {
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
      updateData.image = uploadedImage.secure_url;
    } else if (imageUrl) {
      // User provided a URL string
      const uploadedImage = await cloudinary.uploader.upload(imageUrl, {
        folder: "blog-images",
      });
      updateData.image = uploadedImage.secure_url;
    }

    // Update the blog
    const updatedBlog = await Blog.findByIdAndUpdate(
      blogId,
      updateData,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      data: updatedBlog
    });

  } catch (error) {
    console.error("Error updating blog:", error.message);
    res.status(500).json({ success: false, error: "Server error" });
  }
};
