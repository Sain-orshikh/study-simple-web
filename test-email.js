// Simple script to test Resend email service with verified domain
import { Resend } from 'resend';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY);

async function sendTestEmail() {
  console.log('Starting email service test with verified domain...');
  console.log('API Key:', process.env.RESEND_API_KEY ? 'Set (hidden)' : 'Not set');
  console.log('From Email:', process.env.EMAIL_FROM);
  
  // You can send to any email address when using a verified domain
  const to = 'dffghjkl76@gmail.com';
  console.log('Sending test email to:', to);

  try {
    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: to,
      subject: 'Test Email from Study Simple (Verified Domain)',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <h1 style="color: #4F46E5;">Email Service Test with Verified Domain</h1>
          <p>If you're seeing this, the Resend email service is working correctly with your verified domain!</p>
          <p>This is a test email to verify the email functionality for Study Simple.</p>
          <p>Current time: ${new Date().toLocaleString()}</p>
          <p>Sent from: ${process.env.EMAIL_FROM}</p>
        </div>
      `,
    });
    
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent successfully! ID:', data.id);
    }
  } catch (error) {
    console.error('Exception sending email:', error);
  }
  
  console.log('Test completed');
}

sendTestEmail();