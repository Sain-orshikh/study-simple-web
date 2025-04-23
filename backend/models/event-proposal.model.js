import mongoose from "mongoose";

const eventProposalSchema = new mongoose.Schema(
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

const EventProposal = mongoose.models.EventProposal || mongoose.model("EventProposal", eventProposalSchema);

export default EventProposal;