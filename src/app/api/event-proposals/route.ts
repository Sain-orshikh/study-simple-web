import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import EventProposal from '@/models/event-proposal';

export async function GET() {
  try {
    await connectDB();
    
    const proposals = await EventProposal.find().sort({ createdAt: -1 });
    
    return NextResponse.json({ data: proposals }, { status: 200 });
  } catch (error) {
    console.error("Error fetching event proposals:", error);
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
    const { proposal } = data;
    
    // Validate required fields
    if (!proposal) {
      return NextResponse.json(
        { success: false, error: "Proposal text is required" },
        { status: 400 }
      );
    }
    
    // Create new event proposal
    const newProposal = new EventProposal({
      proposal
    });
    
    await newProposal.save();
    
    return NextResponse.json(
      { success: true, data: newProposal },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating event proposal:", error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}