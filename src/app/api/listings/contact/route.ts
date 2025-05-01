import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email-service';

export async function POST(request: NextRequest) {
  try {
    // Add detailed logging for debugging
    console.log("Received contact request");
    
    // Clone the request to read it multiple times
    const clonedRequest = request.clone();
    const data = await request.json();
    
    // Log the exact request data for debugging
    console.log('Request data received:', JSON.stringify(data, null, 2));
    
    // Handle both input formats - either from ContactSellerModal or from useMarketItems.contactSeller
    // Format 1 (from ContactSellerModal): { listingId, name, email, message, itemName }
    // Format 2 (from useMarketItems): { itemName, buyerEmail, sellerEmail, message }
    
    // Extract data based on which format we received
    const listingId = data.listingId || 'N/A';
    const itemName = data.itemName || 'Item';
    const buyerName = data.name || 'Buyer';
    const buyerEmail = data.email || data.buyerEmail || '';
    const message = data.message || '';
    const sellerEmail = data.sellerEmail || process.env.DEFAULT_SELLER_EMAIL || 'noreply@studysimple.org'; // Fallback for testing
    
    console.log('Processed data:', {
      listingId,
      itemName,
      buyerName,
      buyerEmail,
      message: message.substring(0, 20) + (message.length > 20 ? '...' : ''),
      sellerEmail
    });
    
    // Validate required fields
    if (!buyerEmail || !message) {
      console.log('Validation failed: Missing required fields');
      const missingFields = [];
      if (!buyerEmail) missingFields.push('buyerEmail/email');
      if (!message) missingFields.push('message');
      
      return NextResponse.json(
        { 
          success: false, 
          error: `Missing required fields: ${missingFields.join(', ')}` 
        },
        { status: 400 }
      );
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(buyerEmail)) {
      console.log('Validation failed: Invalid email format');
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid email format' 
        },
        { status: 400 }
      );
    }
    
    console.log('Sending email to seller:', sellerEmail);
    
    // Send email notification to the seller
    await sendEmail({
      to: sellerEmail,
      subject: `New interest in your listing: ${itemName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <h2>Someone is interested in your listing!</h2>
          <p>Hello,</p>
          <p>A potential buyer has expressed interest in your item "${itemName}".</p>
          
          <h3>Buyer's Information:</h3>
          <ul>
            <li><strong>Name:</strong> ${buyerName}</li>
            <li><strong>Email:</strong> ${buyerEmail}</li>
          </ul>
          
          <h3>Message:</h3>
          <p style="background-color: #f5f5f5; padding: 10px; border-radius: 5px;">${message}</p>
          
          <p>Please respond directly to the buyer's email address if you're interested in proceeding with the sale.</p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; font-size: 12px; color: #6B7280; text-align: center;">
            <p>This is an automated message from the Study Simple Marketplace. Please do not reply to this email.</p>
            <p>© ${new Date().getFullYear()} Study Simple. All rights reserved.</p>
          </div>
        </div>
      `,
      text: `Someone is interested in your listing! A buyer named ${buyerName} (${buyerEmail}) has sent you the following message: "${message}". Please respond directly to their email address if you're interested in proceeding with the sale.`,
    });
    
    console.log('Email sent to seller successfully');
    
    // Also send a confirmation email to the buyer
    await sendEmail({
      to: buyerEmail,
      subject: `Your interest in: ${itemName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <h2>Your message has been sent!</h2>
          <p>Hello ${buyerName},</p>
          <p>Your message regarding "${itemName}" has been sent to the seller.</p>
          
          <h3>Your Message:</h3>
          <p style="background-color: #f5f5f5; padding: 10px; border-radius: 5px;">${message}</p>
          
          <p>If the seller is interested, they will contact you directly via your email address.</p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; font-size: 12px; color: #6B7280; text-align: center;">
            <p>Thank you for using Study Simple Marketplace!</p>
            <p>© ${new Date().getFullYear()} Study Simple. All rights reserved.</p>
          </div>
        </div>
      `,
      text: `Your message has been sent! Hello ${buyerName}, your message regarding "${itemName}" has been sent to the seller. If they are interested, they will contact you directly via your email address. Thank you for using Study Simple Marketplace!`,
    });
    
    console.log('Email sent to buyer successfully');
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Contact request sent successfully' 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in contact API route:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to send contact request',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}