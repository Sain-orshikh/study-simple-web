import mongoose from "mongoose";

const supportTicketSchema = new mongoose.Schema({
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

const SupportTicket = mongoose.model("SupportTicket", supportTicketSchema);

export default SupportTicket;