import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Blog from '@/models/blog';

// Route for handling comments on a specific blog
export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    // Extract ID directly from URL path
    const url = request.url;
    const pathParts = url.split('/');
    const blogId = pathParts[pathParts.indexOf('blogs') + 1];
    
    const blog = await Blog.findById(blogId);
    
    if (!blog) {
      return NextResponse.json(
        { error: "Blog not found" }, 
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      {
        success: true,
        comments: blog.comments
      }, 
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    // Extract ID directly from URL path
    const url = request.url;
    const pathParts = url.split('/');
    const blogId = pathParts[pathParts.indexOf('blogs') + 1];
    
    const { content, author } = await request.json();
    
    if (!content) {
      return NextResponse.json(
        {
          success: false,
          error: "Comment content is required"
        },
        { status: 400 }
      );
    }
    
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return NextResponse.json(
        { error: "Blog not found" },
        { status: 404 }
      );
    }
    
    // Add new comment
    const newComment = {
      content,
      author: author || "Anonymous",
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    blog.comments.push(newComment);
    
    await blog.save();
    
    return NextResponse.json(
      {
        success: true,
        comment: blog.comments[blog.comments.length - 1],
        message: "Comment added successfully"
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding comment:", error);
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 }
    );
  }
}