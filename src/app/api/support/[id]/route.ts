import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import SupportTicket from '@/models/support-ticket';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    
    const ticketId = params.id;
    const ticket = await SupportTicket.findById(ticketId);
    
    if (!ticket) {
      return NextResponse.json(
        { error: "Support ticket not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(ticket, { status: 200 });
  } catch (error) {
    console.error("Error fetching support ticket:", error);
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    
    const ticketId = params.id;
    const ticket = await SupportTicket.findById(ticketId);
    
    if (!ticket) {
      return NextResponse.json(
        { success: false, error: "Support ticket not found" },
        { status: 404 }
      );
    }
    
    const data = await request.json();
    const { status } = data;
    
    // Update the ticket
    const updatedTicket = await SupportTicket.findByIdAndUpdate(
      ticketId,
      { status },
      { new: true, runValidators: true }
    );
    
    return NextResponse.json(
      {
        success: true,
        message: "Support ticket updated successfully",
        data: updatedTicket
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating support ticket:", error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    
    const ticketId = params.id;
    const ticket = await SupportTicket.findById(ticketId);
    
    if (!ticket) {
      return NextResponse.json(
        { error: "Support ticket not found" },
        { status: 404 }
      );
    }
    
    await SupportTicket.findByIdAndDelete(ticketId);
    
    return NextResponse.json(
      { message: "Support ticket deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting support ticket:", error);
    return NextResponse.json(
      { error: "Server Error" },
      { status: 500 }
    );
  }
}