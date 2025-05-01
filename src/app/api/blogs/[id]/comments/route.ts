import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Blog from '@/models/blog';

interface RouteParams {
  params: {
    id: string;
  }
}

// Route for handling comments on a specific blog
export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    await connectDB();
    
    const blogId = params.id;
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

export async function POST(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    await connectDB();
    
    const blogId = params.id;
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
    
    // Remove the 'as any' type assertion which could cause type issues
    blog.comments.push(newComment as any);
    
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