import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import PodcastSubscriber from '@/models/podcast-subscriber';

// Define a type that matches what Next.js expects in production
// @ts-expect-error: Third-party type mismatch
type RouteContext = { params: { id: string } };

export async function GET(
  request: NextRequest,
  context: unknown
) {
  try {
    // Use type assertion to silence TypeScript errors
    const { params } = context as RouteContext;
    await connectDB();
    
    const subscriberId = params.id;
    const subscriber = await PodcastSubscriber.findById(subscriberId);
    
    if (!subscriber) {
      return NextResponse.json(
        { error: "Subscriber not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(subscriber, { status: 200 });
  } catch (error) {
    console.error("Error fetching subscriber:", error);
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
    
    const subscriberId = params.id;
    const subscriber = await PodcastSubscriber.findById(subscriberId);
    
    if (!subscriber) {
      return NextResponse.json(
        { error: "Subscriber not found" },
        { status: 404 }
      );
    }
    
    // Instead of deleting, set to inactive (soft delete)
    subscriber.isActive = false;
    await subscriber.save();
    
    return NextResponse.json(
      { message: "Unsubscribed successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error unsubscribing:", error);
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
    
    const subscriberId = params.id;
    const subscriber = await PodcastSubscriber.findById(subscriberId);
    
    if (!subscriber) {
      return NextResponse.json(
        { success: false, error: "Subscriber not found" },
        { status: 404 }
      );
    }
    
    const data = await request.json();
    const { email, isActive } = data;
    
    // Update fields if provided
    if (email) subscriber.email = email;
    if (typeof isActive === 'boolean') subscriber.isActive = isActive;
    
    await subscriber.save();
    
    return NextResponse.json(
      {
        success: true,
        message: "Subscriber updated successfully",
        data: subscriber
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating subscriber:", error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}