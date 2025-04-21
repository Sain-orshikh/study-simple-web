import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY);

// Function to log the email configuration for debugging purposes
const logEmailConfig = () => {
  console.log('Resend Email Configuration:');
  console.log(`- API Key: ${process.env.RESEND_API_KEY ? 'Set (hidden)' : 'Not set'}`);
  console.log(`- From Email: ${process.env.EMAIL_FROM}`);
};

// Function to send an email using Resend
export const sendEmail = async (options) => {
  try {
    // Log configuration for debugging
    logEmailConfig();
    
    console.log('Attempting to send email via Resend...');
    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
    });
    
    if (error) {
      console.error('Resend Error:', error);
      throw error;
    }
    
    console.log('Email sent successfully:', data.id);
    return { 
      success: true, 
      id: data.id
    };
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};