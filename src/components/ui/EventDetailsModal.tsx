"use client"

import React from "react"
import { Modal, Box } from "@mui/material"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Clock, ArrowRight, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface EventDetailsModalProps {
  open: boolean
  onClose: () => void
  event: Event | null
}

interface Event {
  id: string
  title: string
  description: string
  date: string
  dateString: string
  eventDate: Date
  location: string
  imageUrl?: string
  category: string
  link: string
  icon: React.ReactElement
}

export function EventDetailsModal({ open, onClose, event }: EventDetailsModalProps) {
  if (!event) return null
  
  // Format the date nicely
  const eventDate = new Date(event.date)
  const formattedDate = eventDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })

  // Calculate days until event
  const now = new Date()
  const diffTime = eventDate.getTime() - now.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  const daysText = diffDays === 1 
    ? "Tomorrow" 
    : diffDays === 0 
      ? "Today" 
      : diffDays < 0 
        ? "Past event" 
        : `${diffDays} days from now`

  return (
    <Modal 
      open={open} 
      onClose={onClose}
      aria-labelledby="event-details-modal"
    >
      <Box sx={{ 
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '90%',
        maxWidth: '800px',
        bgcolor: 'background.paper',
        boxShadow: 24,
        borderRadius: 1,
        maxHeight: '90vh',
        overflow: 'auto'
      }}>
        <div className="relative">
          {/* Event Banner Image */}
          <div className="relative h-48 md:h-64 w-full overflow-hidden">
            {event.imageUrl ? (
              <div className="h-full w-full relative">
                <div className="absolute inset-0 bg-black/30 z-10" />
                <Image
                  src={event.imageUrl}
                  alt={event.title}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="h-full w-full flex items-center justify-center bg-[#5f2995]/20">
                <Calendar className="h-16 w-16 text-[#5f2995]" />
              </div>
            )}
            <div className="absolute top-4 left-4 z-20">
              <span className="bg-[#5f2995] text-white px-3 py-1 rounded-full text-sm font-medium">
                {event.category}
              </span>
            </div>
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 z-20 bg-white/80 hover:bg-white text-gray-800 rounded-full p-1 shadow-md transition-colors"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Event Details */}
          <div className="p-6 md:p-8">
            <div className="flex items-center space-x-2 mb-1">
              <div className="px-2 py-1 bg-[#5f2995]/10 text-[#5f2995] rounded text-sm font-medium">
                {daysText}
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#5f2995] mb-4">{event.title}</h2>
            
            <div className="mb-6 space-y-3">
              <div className="flex items-center text-gray-700">
                <Calendar className="h-5 w-5 mr-3 text-[#8655ac]" />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center text-gray-700">
                <MapPin className="h-5 w-5 mr-3 text-[#8655ac]" />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center text-gray-700">
                <Clock className="h-5 w-5 mr-3 text-[#8655ac]" />
                <span>Doors open at 9:00 AM</span>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-2">Event Description</h3>
              <p className="text-gray-700 whitespace-pre-line">
                {event.description}
              </p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="text-lg font-semibold mb-2">Registration Information</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>Pre-registration required: Yes</li>
                <li>Sign up by: {new Date(event.date).getTime() - 7*24*60*60*1000 > now.getTime() ? 
                  new Date(new Date(event.date).getTime() - 7*24*60*60*1000)
                    .toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: 'numeric'}) 
                  : "As soon as possible"}</li>
                <li>Contact: studentevents@school.edu</li>
              </ul>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4 justify-end">
              <Button 
                onClick={onClose} 
                variant="outline"
                type="button"
              >
                Close
              </Button>
              <Link href={event.link} onClick={onClose}>
                <Button 
                  className="bg-[#5f2995] hover:bg-[#8655ac] text-white"
                >
                  <span>Go to Event Page</span>
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Box>
    </Modal>
  )
}