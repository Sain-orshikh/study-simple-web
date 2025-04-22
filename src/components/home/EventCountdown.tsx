"use client"

import React from "react"
import { useEffect, useState } from "react"
import Link from "next/link"
import { CalendarIcon, MapPinIcon } from "lucide-react"

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

export function EventCountdown({ events }: { events: Event[] }) {
  const [timeLeft, setTimeLeft] = useState("")
  const nextEvent = getNextEvent(events)

  useEffect(() => {
    if (!nextEvent) return
    function updateTimer() {
      const now = new Date()
      const diff = nextEvent.eventDate.getTime() - now.getTime()
      if (diff <= 0) {
        setTimeLeft("Happening now!")
        return
      }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
      const minutes = Math.floor((diff / (1000 * 60)) % 60)
      setTimeLeft(`${days}d ${hours}h ${minutes}m`)
    }
    updateTimer()
    const interval = setInterval(updateTimer, 60000)
    return () => clearInterval(interval)
  }, [nextEvent])

  if (!nextEvent) return (
    <section className="py-12 bg-white border-b text-center">
      <h2 className="text-2xl font-bold mb-4 text-[#5f2995]">Upcoming Event</h2>
      <p className="text-gray-600">No upcoming events.</p>
    </section>
  )

  return (
    <section className="py-12 bg-white border-b">
      <div className="container mx-auto px-4 max-w-5xl text-center">
        <h2 className="text-2xl font-bold mb-6 text-[#5f2995]">Next School Event</h2>
        <div className="bg-[#b98cd1]/10 rounded-lg shadow-lg overflow-hidden border border-[#b98cd1]/20">
          <div className="bg-[#5f2995] text-white py-3 px-4 text-lg font-semibold">
            Mark Your Calendar!
          </div>
          <div className="p-6 flex flex-col md:flex-row">
            {/* Event Details */}
            <div className="md:w-1/2 text-left flex flex-col justify-between pb-6 md:pb-0 md:pr-6 md:border-r border-[#b98cd1]/30">
              <div>
                <div className="flex items-center mb-3">
                  <div className="h-12 w-12 rounded-full bg-[#b98cd1]/20 flex items-center justify-center mr-4">
                    {nextEvent.icon ? React.cloneElement(nextEvent.icon, { className: "h-6 w-6 text-[#5f2995]" }) : 
                      <CalendarIcon className="h-6 w-6 text-[#5f2995]" />
                    }
                  </div>
                  <h3 className="text-2xl font-bold text-[#5f2995]">{nextEvent.title}</h3>
                </div>
                <p className="text-md text-gray-700 mb-4">{nextEvent.description}</p>
                <div className="space-y-2">
                  <div className="flex items-center text-[#8655ac]">
                    <CalendarIcon className="h-5 w-5 mr-2" />
                    <span>{nextEvent.eventDate.toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</span>
                  </div>
                  <div className="flex items-center text-[#8655ac]">
                    <MapPinIcon className="h-5 w-5 mr-2" />
                    <span>{nextEvent.location || "School Campus"}</span>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <Link href={nextEvent.link}>
                  <button className="w-full md:w-auto rounded-md bg-[#5f2995] py-2 px-4 text-white text-sm font-medium hover:bg-[#8655ac] transition-colors focus:outline-none focus:ring-2 focus:ring-[#b98cd1]/50">
                    View Event Details
                  </button>
                </Link>
              </div>
            </div>
            
            {/* Countdown Timer */}
            <div className="md:w-1/2 flex flex-col items-center justify-center md:pl-6">
              <div className="text-center">
                <div className="text-[#5f2995] font-semibold mb-2">Time Remaining</div>
                <div className="flex justify-center space-x-4 mb-4">
                  {timeLeft.split(' ').map((part, index) => {
                    if (!part.includes('d') && !part.includes('h') && !part.includes('m')) return null;
                    
                    const value = part.replace(/[dhm]/g, '');
                    const unit = part.replace(/[0-9]/g, '');
                    
                    let unitText = 'Minutes';
                    if (unit === 'd') unitText = 'Days';
                    if (unit === 'h') unitText = 'Hours';
                    
                    return (
                      <div key={index} className="bg-white rounded-lg shadow px-4 py-3 w-20">
                        <div className="text-3xl font-bold text-[#8655ac]">{value}</div>
                        <div className="text-xs text-gray-500">{unitText}</div>
                      </div>
                    );
                  })}
                </div>
                <div className="text-sm text-gray-600 italic">Don't miss out - add to your calendar!</div>
              </div>
              <div className="mt-6 flex space-x-2">
                <button className="flex items-center space-x-1 px-3 py-1 bg-[#b98cd1]/20 hover:bg-[#b98cd1]/30 text-[#5f2995] rounded text-sm">
                  <CalendarIcon className="h-4 w-4" />
                  <span>Google Calendar</span>
                </button>
                <button className="flex items-center space-x-1 px-3 py-1 bg-[#b98cd1]/20 hover:bg-[#b98cd1]/30 text-[#5f2995] rounded text-sm">
                  <CalendarIcon className="h-4 w-4" />
                  <span>iCal</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}