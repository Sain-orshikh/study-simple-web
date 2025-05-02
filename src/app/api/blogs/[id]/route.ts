import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Import Blog model
import Blog from '@/models/blog';

// Define a type that matches what Next.js expects in production
type RouteContext = { params: { id: string } };

export async function GET(
  request: NextRequest,
  context: unknown
) {
  try {
    // Use type assertion to silence TypeScript errors
    const { params } = context as RouteContext;
    await connectDB();
    
    const blogId = params.id;
    const blog = await Blog.findById(blogId);
    
    if (!blog) {
      return NextResponse.json(
        { error: "Blog not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(blog, { status: 200 });
  } catch (error) {
    console.error("Error fetching blog:", error);
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: unknown
) {
  try {
    // Use type assertion to silence TypeScript errors
    const { params } = context as RouteContext;
    await connectDB();
    
    const blogId = params.id;
    const blog = await Blog.findById(blogId);
    
    if (!blog) {
      return NextResponse.json(
        { error: "Blog not found" },
        { status: 404 }
      );
    }
    
    await Blog.findByIdAndDelete(blogId);
    
    return NextResponse.json(
      { message: "Blog deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json(
      { error: "Server Error" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  context: unknown
) {
  try {
    // Use type assertion to silence TypeScript errors
    const { params } = context as RouteContext;
    await connectDB();
    
    const blogId = params.id;
    const blog = await Blog.findById(blogId);
    
    if (!blog) {
      return NextResponse.json(
        { success: false, error: "Blog not found" },
        { status: 404 }
      );
    }
    
    const formData = await request.formData();
    
    // Extract update data from form
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const category = formData.get('category') as string;
    const author = formData.get('author') as string;
    const imageFile = formData.get('image') as File;
    const imageUrl = formData.get('imageUrl') as string;
    
    // Prepare update object with only provided fields
    const updateData: Record<string, unknown> = {};
    if (title) updateData.title = title;
    if (content) updateData.content = content;
    if (category) updateData.category = category;
    if (author) updateData.author = author;
    
    // Handle image update if provided
    if (imageFile) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      // Define type for Cloudinary upload result
      interface CloudinaryUploadResult {
        secure_url: string;
        [key: string]: any;
      }
      
      // Upload to Cloudinary
      const uploadResult = await new Promise<CloudinaryUploadResult>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "blog-images" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result as CloudinaryUploadResult);
          }
        );
        
        // Create a readable stream from buffer and pipe to uploadStream
        const readableStream = new Readable();
        readableStream.push(buffer);
        readableStream.push(null);
        readableStream.pipe(uploadStream);
      });
      
      updateData.image = uploadResult.secure_url;
    } else if (imageUrl) {
      // Upload URL to Cloudinary
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
    
    return NextResponse.json(
      {
        success: true,
        message: "Blog updated successfully",
        data: updatedBlog
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating blog:", error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}