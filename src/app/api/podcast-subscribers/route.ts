import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import PodcastSubscriber from '@/models/podcast-subscriber';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const subscribers = await PodcastSubscriber.find({ isActive: true }).sort({ dateSubscribed: -1 });
    
    return NextResponse.json({ data: subscribers }, { status: 200 });
  } catch (error) {
    console.error("Error fetching podcast subscribers:", error);
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const data = await request.json();
    const { email } = data;
    
    // Validate email
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid email address" },
        { status: 400 }
      );
    }
    
    // Check if email already exists
    const existingSubscriber = await PodcastSubscriber.findOne({ email });
    
    if (existingSubscriber) {
      // If they exist but are inactive, reactivate them
      if (!existingSubscriber.isActive) {
        existingSubscriber.isActive = true;
        existingSubscriber.dateSubscribed = new Date();
        await existingSubscriber.save();
        
        return NextResponse.json(
          { 
            success: true, 
            data: existingSubscriber,
            message: "Your subscription has been reactivated!" 
          },
          { status: 200 }
        );
      }
      
      // If already active, just confirm
      return NextResponse.json(
        { 
          success: true, 
          data: existingSubscriber,
          message: "You're already subscribed to our podcast!" 
        },
        { status: 200 }
      );
    }
    
    // Create new subscriber
    const newSubscriber = new PodcastSubscriber({
      email,
      isActive: true,
      dateSubscribed: new Date()
    });
    
    await newSubscriber.save();
    
    // Send welcome email if needed (this would use your email service)
    
    return NextResponse.json(
      { 
        success: true, 
        data: newSubscriber,
        message: "You've successfully subscribed to our podcast!" 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error subscribing to podcast:", error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}