"use client"

import React, { useState } from "react"
import { Modal, Box, TextField, CircularProgress } from "@mui/material"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { toast } from "react-hot-toast"

interface EventProposalModalProps {
  open: boolean
  onClose: () => void
}

export function EventProposalModal({ open, onClose }: EventProposalModalProps) {
  const [proposal, setProposal] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!proposal.trim()) {
      toast.error("Please enter your event proposal")
      return
    }
    
    setIsSubmitting(true)
    
    try {
      const response = await fetch("/api/event-proposals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ proposal }),
      })
      
      if (!response.ok) {
        throw new Error("Failed to submit proposal")
      }
      
      toast.success("Your event proposal has been submitted!")
      setProposal("")
      onClose()
    } catch (error) {
      console.error("Error submitting proposal:", error)
      toast.error("Failed to submit proposal. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }
  
  const handleCancel = () => {
    setProposal("")
    onClose()
  }

  return (
    <Modal 
      open={open} 
      onClose={handleCancel}
      aria-labelledby="event-proposal-modal"
    >
      <Box sx={{ 
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '90%',
        maxWidth: '600px',
        bgcolor: 'background.paper',
        boxShadow: 24,
        borderRadius: 1,
        p: 4
      }}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#5f2995]">Propose an Event</h2>
          <button 
            onClick={handleCancel}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <TextField
              label="Your Event Proposal"
              multiline
              rows={6}
              fullWidth
              value={proposal}
              onChange={(e) => setProposal(e.target.value)}
              placeholder="Describe your event idea. What's the event about? When would you like it to happen? Any specific details we should know?"
              variant="outlined"
              disabled={isSubmitting}
            />
          </div>
          
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-[#5f2995] hover:bg-[#8655ac] text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <CircularProgress size={16} color="inherit" className="mr-2" />
                  Submitting...
                </>
              ) : (
                "Submit Proposal"
              )}
            </Button>
          </div>
        </form>
      </Box>
    </Modal>
  )
}