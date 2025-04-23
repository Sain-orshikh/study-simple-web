"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { X, Loader2 } from "lucide-react";
import { TutorProps } from "@/components/ui/TutorCard";
import toast from "react-hot-toast";

interface ContactTutorModalProps {
  isOpen: boolean;
  onClose: () => void;
  tutor: TutorProps | null;
}

export default function ContactTutorModal({ isOpen, onClose, tutor }: ContactTutorModalProps) {
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

  const isFormValid = () => {
    if (!name) {
      toast.error("Please enter your name");
      return false;
    }
    
    if (!email) {
      toast.error("Please enter your email address");
      return false;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return false;
    }
    
    if (!message) {
      toast.error("Please enter a message");
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isFormValid() || !tutor) return;
    
    setIsSubmitting(true);
    
    try {
      // Send the email via API
      const response = await fetch("http://localhost:5000/api/tutors/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tutorName: tutor.name,
          tutorEmail: tutor.email,
          studentName: name,
          studentEmail: email,
          message,
          subjects: tutor.subjects
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast.success("Message sent successfully! The tutor will contact you soon.");
        handleClose();
      } else {
        toast.error(data.error || "Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("An error occurred while sending your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-lg bg-white dark:bg-gray-800 p-6 relative max-h-[90vh] overflow-y-auto">
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <X className="h-5 w-5" />
        </button>
        
        <h2 className="text-xl font-bold mb-1">Contact Tutor</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Send a message to {tutor?.name} about tutoring in {tutor?.subjects.join(", ")}
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Your Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="email">Your Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="message">Your Message</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={`Hi ${tutor?.name}, I'd like to inquire about tutoring in ${tutor?.subjects[0]}...`}
              rows={4}
              required
            />
          </div>
          
          <div className="flex justify-end gap-2 pt-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                "Send Message"
              )}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}