import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { uploadBuffer, uploadUrl } from '@/lib/cloudinary';

// Configure route segment options
export const dynamic = 'force-dynamic'; // Default to dynamic for POST
export const revalidate = 60; // Revalidate cache every 60 seconds for GET

// Import Blog model
import Blog from '@/models/blog';

export async function GET(request: NextRequest) {
  // Handle keep-warm requests from the cron job
  if (request.nextUrl.searchParams.has('keepWarm')) {
    return NextResponse.json({ status: 'warm' }, { status: 200 });
  }

  try {
    await connectDB();
    
    const blogs = await Blog.find().sort({ createdAt: -1 });
    
    // Use a cache header for GET requests
    return NextResponse.json(
      { data: blogs }, 
      { 
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=600'
        }
      }
    );
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
      // Handle file upload to Cloudinary using our utility
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      // Upload to Cloudinary using the utility function
      const uploadResult = await uploadBuffer(buffer, "blog-images");
      finalImageUrl = uploadResult.secure_url;
    } else if (directUrl) {
      // Upload URL to Cloudinary using our utility
      const uploadedImage = await uploadUrl(directUrl, "blog-images");
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