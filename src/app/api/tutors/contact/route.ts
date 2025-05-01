import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email-service';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { tutorName, tutorEmail, studentName, studentEmail, message, subjects } = data;
    
    // Validate required fields
    if (!tutorName || !tutorEmail || !studentName || !studentEmail || !message) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Missing required fields' 
        },
        { status: 400 }
      );
    }
    
    // Send email to tutor
    await sendEmail({
      to: tutorEmail,
      subject: `Study Simple: Tutoring Request from ${studentName}`,
      html: `
        <h2>You have a new tutoring request</h2>
        <p>A student is interested in getting tutoring help from you.</p>
        <h3>Student Details:</h3>
        <ul>
          <li><strong>Name:</strong> ${studentName}</li>
          <li><strong>Email:</strong> ${studentEmail}</li>
          <li><strong>Subjects:</strong> ${subjects ? subjects.join(', ') : 'Not specified'}</li>
        </ul>
        <h3>Message:</h3>
        <p>${message}</p>
        <p>Please respond directly to the student's email address.</p>
        <p>Thank you for being a tutor with Study Simple!</p>
      `,
    });
    
    // Send confirmation email to student
    await sendEmail({
      to: studentEmail,
      subject: `Study Simple: Your Tutoring Request to ${tutorName}`,
      html: `
        <h2>Your tutoring request has been sent</h2>
        <p>Hello ${studentName},</p>
        <p>We've forwarded your request to ${tutorName}. They will contact you directly via email.</p>
        <h3>Your Message:</h3>
        <p>${message}</p>
        <p>Thank you for using Study Simple for your academic needs!</p>
      `,
    });
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Contact request sent successfully' 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending contact request:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to send contact request' 
      },
      { status: 500 }
    );
  }
}