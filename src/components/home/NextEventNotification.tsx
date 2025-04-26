"use client"

import React, { useState, useEffect } from "react"
import { X, Calendar, ArrowRight, Bell } from "lucide-react"
import Link from "next/link"

type Event = {
  title: string;
  description: string;
  icon: React.ReactElement<{ className?: string }>;
  link: string;
  date: string;
  dateString: string;
  eventDate?: Date;
  location?: string;
}

function getNextEvent(events: Event[]) {
  const now = new Date()
  return events
    .map(e => ({ ...e, eventDate: new Date(e.dateString) }))
    .filter(e => e.eventDate > now)
    .sort((a, b) => a.eventDate.getTime() - b.eventDate.getTime())[0]
}

export function NextEventNotification({ events }: { events: Event[] }) {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const nextEvent = getNextEvent(events)

  useEffect(() => {
    // Check if notification was already dismissed in this session
    const dismissed = sessionStorage.getItem('eventNotificationDismissed')
    if (dismissed === 'true' || !nextEvent) {
      setIsDismissed(true)
      return
    }

    // Show notification after a short delay
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 1500)

    return () => clearTimeout(timer)
  }, [nextEvent])

  const handleDismiss = () => {
    setIsVisible(false)
    // After animation completes, mark as dismissed
    setTimeout(() => {
      setIsDismissed(true)
      sessionStorage.setItem('eventNotificationDismissed', 'true')
    }, 300)
  }

  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

  if (isDismissed || !nextEvent) return null

  // Format date nicely
  const eventDate = nextEvent.eventDate
  const formattedDate = eventDate.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short', 
    day: 'numeric'
  })
  
  // Calculate days until event
  const now = new Date()
  const diffTime = Math.abs(eventDate.getTime() - now.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  return (
    <div 
      className={`fixed right-0 top-1/3 z-50 transform transition-all duration-500 ease-in-out ${
        isVisible ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="bg-gradient-to-b from-[#5f2995] to-[#8655ac] text-white rounded-l-md shadow-lg overflow-visible">
        <div className="relative">
          <button 
            onClick={handleDismiss}
            className="absolute right-2 top-2 text-white/80 hover:text-white transition-colors p-1 bg-black/20 rounded-full"
            aria-label="Dismiss notification"
          >
            <X className="h-4 w-4" />
          </button>
          
          <button
            onClick={handleToggleCollapse}
            className="absolute -left-4 top-1/2 -translate-y-1/2 bg-[#5f2995] text-white w-8 h-8 rounded-full flex items-center justify-center shadow-md hover:bg-[#8655ac] transition-colors"
            style={{ boxShadow: '0 0 8px rgba(0,0,0,0.3)' }}
            aria-label={isCollapsed ? "Expand notification" : "Collapse notification"}
          >
            <ArrowRight className={`h-4 w-4 transition-transform ${isCollapsed ? 'rotate-180' : ''}`} />
          </button>
          
          <div className={`py-4 pl-4 pr-8 transition-all duration-300 ${isCollapsed ? 'w-[80px]' : 'w-[300px]'}`} style={{ minWidth: isCollapsed ? '80px' : '300px' }}>
            {isCollapsed ? (
              <div className="flex flex-col items-center">
                <Bell className="h-6 w-6 text-white animate-pulse mb-2" />
                <div className="bg-white/20 rounded px-2 py-1 text-xs font-bold">
                  {diffDays === 0 ? "Today!" : `${diffDays}d`}
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center mb-3">
                  <Bell className="h-5 w-5 text-white mr-2" />
                  <h3 className="font-semibold text-sm">Next School Event</h3>
                </div>
                
                <div className="bg-white/10 rounded-md p-3 mb-3">
                  <div className="font-bold text-base mb-1">{nextEvent.title}</div>
                  <div className="text-xs text-white/80 mb-2">
                    {nextEvent.description.length > 80 
                      ? nextEvent.description.substring(0, 80) + '...' 
                      : nextEvent.description}
                  </div>
                  <div className="flex items-center text-white/90 text-xs mb-1">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>{formattedDate}</span>
                  </div>
                  <div className="text-yellow-200 text-xs font-medium">
                    {diffDays === 0 ? "Today!" : `${diffDays} day${diffDays !== 1 ? 's' : ''} away`}
                  </div>
                </div>
                
                <Link 
                  href="/events" 
                  className="bg-white/10 hover:bg-white/20 text-white text-sm px-3 py-2 rounded flex items-center justify-center transition-colors"
                >
                  <span>View Full Details</span>
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}