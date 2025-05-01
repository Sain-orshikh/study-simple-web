import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Import Blog model
import Blog from '@/models/blog';

export async function GET() {
  try {
    await connectDB();
    
    const blogs = await Blog.find().sort({ createdAt: -1 });
    
    return NextResponse.json({ data: blogs }, { status: 200 });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { success: false, message: "Server Error" }, 
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const formData = await request.formData();
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const category = formData.get('category') as string;
    const author = formData.get('author') as string || 'Anonymous';
    const imageFile = formData.get('image') as File;
    const directUrl = formData.get('imageUrl') as string;
    
    if (!title || !content || !category || (!imageFile && !directUrl)) {
      return NextResponse.json(
        { success: false, error: "Please provide all required fields and an image" },
        { status: 400 }
      );
    }
    
    let finalImageUrl;
    
    if (imageFile) {
      // Handle file upload to Cloudinary
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      // Upload to Cloudinary
      const uploadResult = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "blog-images" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        
        // Create a readable stream from buffer and pipe to uploadStream
        const Readable = require('stream').Readable;
        const readableStream = new Readable();
        readableStream.push(buffer);
        readableStream.push(null);
        readableStream.pipe(uploadStream);
      });
      
      finalImageUrl = uploadResult.secure_url;
    } else if (directUrl) {
      // Upload URL to Cloudinary
      const uploadedImage = await cloudinary.uploader.upload(directUrl, {
        folder: "blog-images",
      });
      finalImageUrl = uploadedImage.secure_url;
    }
    
    // Create new blog post
    const newBlog = new Blog({
      title,
      content,
      category,
      image: finalImageUrl,
      author,
    });
    
    await newBlog.save();
    
    return NextResponse.json(
      { success: true, data: newBlog },
      { status: 201 }
    );
    
  } catch (error) {
    console.error("Error creating blog:", error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}