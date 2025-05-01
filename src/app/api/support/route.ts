import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import SupportTicket from '@/models/support-ticket';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const supportTickets = await SupportTicket.find().sort({ createdAt: -1 });
    
    return NextResponse.json({ data: supportTickets }, { status: 200 });
  } catch (error) {
    console.error("Error fetching support tickets:", error);
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
    const { name, email, subject, message } = data;
    
    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, error: "Please provide all required fields" },
        { status: 400 }
      );
    }
    
    // Create new support ticket
    const newSupportTicket = new SupportTicket({
      name,
      email,
      subject,
      message,
      status: 'pending'
    });
    
    await newSupportTicket.save();
    
    // Send confirmation email if needed (this would use your email service)
    
    return NextResponse.json(
      { success: true, data: newSupportTicket },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating support ticket:", error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}