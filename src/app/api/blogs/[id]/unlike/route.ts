import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Blog from '@/models/blog';

export async function POST(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const { params } = context;
    await connectDB();
    
    // Using params.id safely after destructuring
    const blogId = params.id;
    const blog = await Blog.findById(blogId);
    
    if (!blog) {
      return NextResponse.json(
        { error: "Blog not found" },
        { status: 404 }
      );
    }
    
    // Decrement likes, but ensure it doesn't go below 0
    blog.likes = Math.max(0, (blog.likes || 0) - 1);
    await blog.save();
    
    return NextResponse.json({ 
      success: true, 
      likes: blog.likes,
      message: "Blog unliked successfully" 
    }, { status: 200 });
  } catch (error) {
    console.error("Error unliking blog:", error);
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 }
    );
  }
}