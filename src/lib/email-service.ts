import { Resend } from 'resend';

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY);

// Function to log the email configuration for debugging purposes
const logEmailConfig = () => {
  console.log('Resend Email Configuration:');
  console.log(`- API Key: ${process.env.RESEND_API_KEY ? 'Set (hidden)' : 'Not set'}`);
  console.log(`- From Email: ${process.env.EMAIL_FROM}`);
};

// Function to send an email using Resend
export const sendEmail = async (options: {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}) => {
  try {
    // Log configuration for debugging
    logEmailConfig();
    
    console.log('Attempting to send email via Resend...');
    
    // Use direct Resend send without React Email render
    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'no-reply@studysimple.com',
      to: options.to,
      subject: options.subject,
      text: options.text || '',
      html: options.html || '',
    });
    
    if (error) {
      console.error('Resend Error:', error);
      throw error;
    }
    
    console.log('Email sent successfully:', data?.id);
    return { 
      success: true, 
      id: data?.id
    };
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

// Function to send a podcast subscription confirmation email
export const sendSubscriptionConfirmation = async (email: string) => {
  const subject = 'Welcome to Study Simple Podcasts!';
  
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
      <div style="text-align: center; margin-bottom: 20px;">
        <h1 style="color: #4F46E5;">Thank You for Subscribing!</h1>
      </div>
      
      <p style="font-size: 16px; line-height: 1.5; color: #333;">
        You're now subscribed to Study Simple Podcasts. You'll receive notifications about new episodes and exclusive content straight to your inbox.
      </p>
      
      <div style="background-color: #F3F4F6; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <p style="margin: 0; font-size: 14px; color: #4B5563;">
          Our podcasts feature insights from students who have been accepted to top universities, sharing their experiences and advice to help you on your academic journey.
        </p>
      </div>
      
      <p style="font-size: 16px; line-height: 1.5; color: #333;">
        If you want to check out our existing episodes, visit our <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://studysimple.vercel.app'}/podcasts" style="color: #4F46E5; text-decoration: none; font-weight: bold;">podcast page</a>.
      </p>
      
      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; font-size: 12px; color: #6B7280; text-align: center;">
        <p>
          If you didn't subscribe to our podcast updates, you can safely ignore this email or
          <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://studysimple.vercel.app'}/podcasts/unsubscribe?email=${encodeURIComponent(email)}" style="color: #4F46E5; text-decoration: none;">unsubscribe here</a>.
        </p>
        <p>© ${new Date().getFullYear()} Study Simple. All rights reserved.</p>
      </div>
    </div>
  `;
  
  return sendEmail({
    to: email,
    subject,
    html,
    text: `Thank you for subscribing to Study Simple Podcasts! You'll receive notifications about new episodes and exclusive content straight to your inbox. If you didn't subscribe to our podcast updates, you can safely ignore this email.`
  });
};