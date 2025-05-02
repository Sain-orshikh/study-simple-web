import { useState } from "react";
import { Modal, Box, TextField, Button, CircularProgress, Typography } from "@mui/material";
import toast from "react-hot-toast";
import { MarketItem } from "./ItemCard";

interface ContactSellerModalProps {
  open: boolean;
  onClose: () => void;
  item: MarketItem;
}

export function ContactSellerModal({
  open,
  onClose,
  item
}: ContactSellerModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetForm = () => {
    setName("");
    setEmail("");
    setMessage("");
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name) {
      toast.error("Please enter your name");
      return;
    }

    if (!email) {
      toast.error("Please enter your email address");
      return;
    }
    
    if (!message) {
      toast.error("Please enter a message");
      return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch("/api/listings/contact", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // Format data correctly for the API
          itemName: item.name,
          buyerEmail: email,
          buyerName: name,
          sellerEmail: item.email,
          message,
          // Include both ID formats for robustness
          listingId: (item as any)._id || item.id
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to send message");
      }
      
      resetForm();
      toast.success("Message sent to seller successfully!");
      onClose();
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error(error instanceof Error ? error.message : "Failed to send message");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal 
      open={open} 
      onClose={handleClose}
      aria-labelledby="contact-seller-modal"
    >
      <Box sx={{ 
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '90%',
        maxWidth: '500px',
        bgcolor: 'background.paper',
        boxShadow: 24,
        borderRadius: 1,
        p: 4
      }}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Contact Seller</h2>
          <button 
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Enter your details to express interest in &quot;{item?.name}&quot;. The seller will be notified about your interest.
        </Typography>
        
        <form onSubmit={handleSubmit}>
          <TextField
            label="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Your Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
            margin="normal"
            type="email"
          />
          <TextField
            label="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            fullWidth
            required
            margin="normal"
            multiline
            rows={4}
          />
          
          <div className="flex justify-end gap-2 mt-4">
            <Button onClick={handleClose} color="inherit">
              Cancel
            </Button>
            <Button 
              type="submit" 
              variant="contained" 
              color="primary"
              disabled={isSubmitting}
              startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : null}
            >
              {isSubmitting ? "Sending..." : "Send"}
            </Button>
          </div>
        </form>
      </Box>
    </Modal>
  );
}