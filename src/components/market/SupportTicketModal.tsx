"use client"

import { useState } from "react"
import { Modal, Box, TextField } from "@mui/material"
import { Button } from "@/components/ui/button"
import toast from "react-hot-toast"

interface SupportTicketModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string, email: string, subject: string, message: string }) => void;
  isSubmitting: boolean;
}

export function SupportTicketModal({
  open,
  onClose,
  onSubmit,
  isSubmitting
}: SupportTicketModalProps) {
  const [supportName, setSupportName] = useState("");
  const [supportEmail, setSupportEmail] = useState("");
  const [supportSubject, setSupportSubject] = useState("");
  const [supportMessage, setSupportMessage] = useState("");

  const resetForm = () => {
    setSupportName("");
    setSupportEmail("");
    setSupportSubject("");
    setSupportMessage("");
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const isSupportFormValid = () => {
    if (!supportName || !supportEmail || !supportSubject || !supportMessage) {
      toast.error("Please fill in all support ticket fields");
      return false;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(supportEmail)) {
      toast.error("Please enter a valid email address");
      return false;
    }
    
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isSupportFormValid()) {
      return;
    }

    onSubmit({
      name: supportName,
      email: supportEmail,
      subject: supportSubject,
      message: supportMessage
    });
    
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{ 
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: 1,
        maxWidth: '90%',
        maxHeight: '90vh',
        overflow: 'auto'
      }}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Customer Support</h2>
          <button 
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <p className="text-sm text-gray-600 mb-4">
          Submit a ticket to our support team for any issues or questions about the marketplace.
          We'll respond to you via email as soon as possible.
        </p>
        
        <form onSubmit={handleSubmit}>
          <TextField
            label="Your Name"
            value={supportName}
            onChange={(e) => setSupportName(e.target.value)}
            fullWidth
            required
            margin="normal"
          />
          
          <TextField
            label="Email Address"
            value={supportEmail}
            onChange={(e) => setSupportEmail(e.target.value)}
            fullWidth
            required
            margin="normal"
            type="email"
          />
          
          <TextField
            label="Subject"
            value={supportSubject}
            onChange={(e) => setSupportSubject(e.target.value)}
            fullWidth
            required
            margin="normal"
          />
          
          <TextField
            label="Message"
            value={supportMessage}
            onChange={(e) => setSupportMessage(e.target.value)}
            fullWidth
            required
            multiline
            rows={4}
            margin="normal"
          />
          
          <div className="flex justify-end gap-2 mt-6">
            <Button 
              onClick={handleClose} 
              variant="outline"
              type="button"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-blue-500 hover:bg-blue-600 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Ticket"}
            </Button>
          </div>
        </form>
      </Box>
    </Modal>
  );
}