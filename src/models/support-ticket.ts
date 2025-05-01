import mongoose, { Schema, Document, Model } from 'mongoose';

// Define interface for the document
interface ISupportTicket extends Document {
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'pending' | 'in-progress' | 'resolved';
  createdAt: Date;
  updatedAt: Date;
}

// Define the schema
const supportTicketSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "in-progress", "resolved"],
    default: "pending",
  }
}, { timestamps: true });

// Create and export the model
// Check if the model exists before creating a new one to prevent overwriting in development
const SupportTicket: Model<ISupportTicket> =
  mongoose.models.SupportTicket || mongoose.model<ISupportTicket>('SupportTicket', supportTicketSchema);

export default SupportTicket;