import express from "express";
import { 
  createEventProposal, 
  getAllEventProposals
} from "../controller/event-proposal.controller.js";

const router = express.Router();

// Create a new event proposal
router.post("/", createEventProposal);

// Get all event proposals
router.get("/", getAllEventProposals);

export default router;