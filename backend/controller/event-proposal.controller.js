import EventProposal from "../models/event-proposal.model.js";

// Create a new event proposal
export const createEventProposal = async (req, res) => {
  try {
    const { proposal } = req.body;
    
    if (!proposal || !proposal.trim()) {
      return res.status(400).json({ 
        success: false, 
        message: "Proposal content is required" 
      });
    }
    
    const newProposal = new EventProposal({
      proposal,
    });
    
    await newProposal.save();
    
    res.status(201).json({
      success: true,
      message: "Event proposal submitted successfully",
      data: newProposal,
    });
  } catch (error) {
    console.error("Error creating event proposal:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to submit event proposal",
      error: error.message 
    });
  }
};

// Get all event proposals
export const getAllEventProposals = async (req, res) => {
  try {
    const proposals = await EventProposal.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: proposals.length,
      data: proposals,
    });
  } catch (error) {
    console.error("Error fetching event proposals:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to fetch event proposals",
      error: error.message 
    });
  }
};