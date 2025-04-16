import SupportTicket from "../models/support.model.js";

export const submitSupportTicket = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        
        // Validate required fields
        if (!name || !email || !subject || !message) {
            return res.status(400).json({ 
                success: false, 
                message: "Please provide all required fields" 
            });
        }
        
        // Create new support ticket
        const newSupportTicket = new SupportTicket({
            name,
            email,
            subject,
            message
        });
        
        // Save to database
        await newSupportTicket.save();
        
        res.status(201).json({ 
            success: true, 
            message: "Support ticket submitted successfully!",
            ticketId: newSupportTicket._id
        });
    } catch (error) {
        console.log("Error submitting support ticket:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const fetchSupportTickets = async (req, res) => {
    try {
        // This endpoint could be secured with admin authentication in a real app
        const tickets = await SupportTicket.find().sort({ createdAt: -1 });
        
        res.status(200).json({
            success: true,
            data: tickets
        });
    } catch (error) {
        console.log("Error fetching support tickets:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const updateTicketStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        
        if (!["pending", "in-progress", "resolved"].includes(status)) {
            return res.status(400).json({ 
                success: false, 
                message: "Invalid status value" 
            });
        }
        
        const updatedTicket = await SupportTicket.findByIdAndUpdate(
            id, 
            { status }, 
            { new: true }
        );
        
        if (!updatedTicket) {
            return res.status(404).json({ 
                success: false, 
                message: "Support ticket not found" 
            });
        }
        
        res.status(200).json({
            success: true,
            message: "Ticket status updated successfully",
            data: updatedTicket
        });
    } catch (error) {
        console.log("Error updating support ticket:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};