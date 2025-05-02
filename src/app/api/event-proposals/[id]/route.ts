import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import EventProposal from '@/models/event-proposal';

export async function GET(
  request: NextRequest,
// @ts-expect-error: Third-party type mismatch
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    
    const proposalId = params.id;
    const proposal = await EventProposal.findById(proposalId);
    
    if (!proposal) {
      return NextResponse.json(
        { error: "Event proposal not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(proposal, { status: 200 });
  } catch (error) {
    console.error("Error fetching event proposal:", error);
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
// @ts-expect-error: Third-party type mismatch
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    
    const proposalId = params.id;
    const proposal = await EventProposal.findById(proposalId);
    
    if (!proposal) {
      return NextResponse.json(
        { error: "Event proposal not found" },
        { status: 404 }
      );
    }
    
    await EventProposal.findByIdAndDelete(proposalId);
    
    return NextResponse.json(
      { message: "Event proposal deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting event proposal:", error);
    return NextResponse.json(
      { error: "Server Error" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
// @ts-expect-error: Third-party type mismatch
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    
    const proposalId = params.id;
    const proposalExists = await EventProposal.findById(proposalId);
    
    if (!proposalExists) {
      return NextResponse.json(
        { success: false, error: "Event proposal not found" },
        { status: 404 }
      );
    }
    
    const data = await request.json();
    const { proposal } = data;
    
    if (!proposal) {
      return NextResponse.json(
        { success: false, error: "Proposal text is required" },
        { status: 400 }
      );
    }
    
    // Update the proposal
    const updatedProposal = await EventProposal.findByIdAndUpdate(
      proposalId,
      { proposal },
      { new: true, runValidators: true }
    );
    
    return NextResponse.json(
      {
        success: true,
        message: "Event proposal updated successfully",
        data: updatedProposal
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating event proposal:", error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}