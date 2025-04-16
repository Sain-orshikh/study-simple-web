import express from "express";
import { 
    submitSupportTicket, 
    fetchSupportTickets,
    updateTicketStatus
} from "../controller/support.controller.js";

const router = express.Router();

router.post("/submit", submitSupportTicket);
router.get("/fetch", fetchSupportTickets);
router.put("/status/:id", updateTicketStatus);

export default router;