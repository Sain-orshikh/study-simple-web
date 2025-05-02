import { NextRequest, NextResponse } from 'next/server';

// This dislike feature has been commented out
export async function POST(
  request: NextRequest,
  context: { params: { id: string } }
) {
  return NextResponse.json({ 
    success: false, 
    message: "Dislike feature has been disabled" 
  }, { status: 404 });
  
  /* Original implementation
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
    
    // If there are likes, decrement by 1 (assuming user previously liked)
    if (blog.likes > 0) {
      blog.likes = blog.likes - 1;
    }
    
    await blog.save();
    
    return NextResponse.json({ 
      success: true, 
      likes: blog.likes,
      message: "Blog disliked successfully" 
    }, { status: 200 });
  } catch (error) {
    console.error("Error disliking blog:", error);
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 }
    );
  }
  */
}