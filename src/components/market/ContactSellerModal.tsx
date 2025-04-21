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
  const [buyerEmail, setBuyerEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetForm = () => {
    setBuyerEmail("");
    setMessage("");
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const isFormValid = () => {
    if (!buyerEmail) {
      toast.error("Please enter your email address");
      return false;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(buyerEmail)) {
      toast.error("Please enter a valid email address");
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isFormValid()) return;
    
    setIsSubmitting(true);
    
    try {
      // Send the email via API
      const response = await fetch("http://localhost:5000/api/listings/contact-seller", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          itemName: item.name,
          buyerEmail,
          sellerEmail: item.email,
          message: message || `I'm interested in your item "${item.name}". Please contact me at ${buyerEmail}.`
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast.success("Email sent successfully! The seller will contact you soon.");
        handleClose();
      } else {
        toast.error(data.error || "Failed to send email. Please try again.");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error("An error occurred while sending the email. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Create a default message template
  const defaultMessage = `I'm interested in your item "${item?.name}". Please contact me.`;

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
          Enter your email address to express interest in "{item?.name}". The seller will be notified about your interest.
        </Typography>
        
        <form onSubmit={handleSubmit}>
          <TextField
            label="Your Email Address"
            value={buyerEmail}
            onChange={(e) => setBuyerEmail(e.target.value)}
            fullWidth
            required
            margin="normal"
            type="email"
            error={buyerEmail !== "" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(buyerEmail)}
            helperText={buyerEmail !== "" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(buyerEmail) ? "Please enter a valid email address" : ""}
          />
          
          <TextField
            label="Message (Optional)"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            fullWidth
            multiline
            rows={3}
            margin="normal"
            placeholder={defaultMessage}
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