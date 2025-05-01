import mongoose, { Schema, Document, Model } from 'mongoose';

// Define interface for the document
interface IEventProposal extends Document {
  proposal: string;
  createdAt: Date;
  updatedAt: Date;
}

// Define the schema
const eventProposalSchema = new Schema(
  {
    proposal: {
      type: String,
      required: [true, "Proposal text is required"],
      trim: true,
    }
  },
  {
    timestamps: true,
  }
);

// Create and export the model
// Check if the model exists before creating a new one to prevent overwriting in development
const EventProposal: Model<IEventProposal> = 
  mongoose.models.EventProposal || mongoose.model<IEventProposal>('EventProposal', eventProposalSchema);

export default EventProposal;